import * as docusign from "../services/@docusign.js";
import { checkToken } from "./docusignJWTAuth.js";
import eSign from "docusign-esign";

const docuSignBasePath = eSign.ApiClient.RestApi.BasePath.DEMO;
export default class eSignController {
  static createEnvelopeForSigning = async (req) => {
    await checkToken(req);
    const { body } = req;

    const envelopeArgs = {
      ...body,
      redirectUrl: "http://localhost:3000/app/successful-verification",
      healthCheckEndPoint: "http://localhost:3000",
    }

    envelopeArgs.brandId = process.env.DS_BRAND_ID

    const args = {
      accessToken: req.session.docuSignAccessToken,
      basePath: docuSignBasePath,
      accountId: process.env.DS_API_ACCOUNT_ID,
      envelopeArgs,
    }

    let results = null
    try {
      /** STEP 1 create the envelope definition that sets up the workflows */
      const envelopeDefinition =
        docusign.constructCameraTrapVerificationEnvelope(args.envelopeArgs)

      /** STEP 2 create the envelope in Draft Stage */
      const envelopeIdInDraft = await docusign.createEnvelopeDraft(
        envelopeDefinition,
        args,
      )

      /** STEP 3 construct the Document with survery123 & mediaValet Data */
      const CTIMDV_Document = await docusign.generateDocumentPopulatedWithData(
        args.envelopeArgs,
      )
      /** STEP 4 amend the draft envelope and add new document + apply our template */
      await docusign.addDocumentToEnvelopeDraft(CTIMDV_Document, args)

      // await docusign.applyTemplateToDocument(
      //   {
      //     documentId: CTIMDV_Document.documentId,
      //     templateId: process.env.DS_SENTINELS_TEMPLATE,
      //   },
      //   args,
      // )

      args.envelopeId = envelopeIdInDraft
      let totalNumberOfReviewers = 4
      let toRemove =
        totalNumberOfReviewers - args.envelopeArgs.recipients.reviewers.length
      while (toRemove > 1) {
        await docusign.removeRecipient(args, totalNumberOfReviewers--)
        toRemove--
      }

      /** STEP 5 Send the Envelope */
      const data = await docusign.sendEnvelope(args)
      console.log(data)

      /** STEP 6 Generate URL for embedded signing */
      const embeddedSigningURL = await docusign.getEmbeddedRecipientViewUrl(
        envelopeIdInDraft,
        args,
      )

      results = {
        envelopeId: args.envelopeId,
        redirectUrl: embeddedSigningURL,
      }
    } catch (error) {
      console.log(error)
      throw new Error(error.message)
    }

    return results;
  };
}
