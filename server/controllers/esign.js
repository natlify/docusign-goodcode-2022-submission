import * as docusign from "../services/@docusign.js";
import { checkToken } from "./docusignJWTAuth.js";
import eSign from "docusign-esign";
import _ from "lodash"

const docuSignBasePath = eSign.ApiClient.RestApi.BasePath.DEMO
export default class eSignController {
  static createEnvelopeForSigning = async (req) => {
    await checkToken(req)
    const { body } = req

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

      args.envelopeId = envelopeIdInDraft

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

    return results
  }

  static testESign = async (req) => {
    await checkToken(req)
    const { body } = req

    const args = {
      accessToken: req.session.docuSignAccessToken,
      basePath: docuSignBasePath,
      accountId: process.env.DS_API_ACCOUNT_ID,
      envelopeId: "e2f5eddc-b89d-4c7a-a26c-f340ca55a6cf",
    }

    try {
      let eSignApi = new eSign.ApiClient()
      eSignApi.setBasePath(args.basePath)
      eSignApi.addDefaultHeader("Authorization", "Bearer " + args.accessToken)
      let envelopesApi = new eSign.EnvelopesApi(eSignApi)
      const results = await envelopesApi.getDocumentTabs(
        args.accountId,
        args.envelopeId,
        "2",
      )
      const textTabObj = _.keyBy(results.textTabs, "tabLabel")
      const numTabObj = _.keyBy(results.numberTabs, "tabLabel")
      const dropdownTabObj = _.keyBy(results.listTabs, "tabLabel")

      const updateAttemptResult = await envelopesApi.updateTabs(
        args.accountId,
        args.envelopeId,
        textTabObj["z-keywords-text"].recipientId,
        {
          tabs: {
            numberTabs: [
              {
                ...numTabObj["z-camheight-text"],
                value: 200,
              },
            ],
            textTabs: [
              {
                ...textTabObj["z-keywords-text"],
                value: "Foo, Bar",
              },
              {
                ...textTabObj["z-cognitive-data"],
                value: "Foo, Bar",
              },
              {
                ...textTabObj["z-alt-text"],
                value: "Foo, Bar",
              },
            ],
            listTabs: [
              {
                ...dropdownTabObj["z-camera-dropdown"],
                listSelectedValue: "Browning",
              },
              {
                ...dropdownTabObj["z-camattached-dropdown"],
                listSelectedValue: "Post",
              },
            ],
          },
        },
      )

      const updatedResults = await envelopesApi.getFormData(
        args.accountId,
        args.envelopeId,
      )
      return updatedResults
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}
