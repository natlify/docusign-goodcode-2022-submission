import eSignSdk from "docusign-esign";
import { ROLE_NAMES } from "../utils/contants.js";
import { getRenderedHtml } from "./docGeneration.js";

const ESignBasePath = eSignSdk.ApiClient.RestApi.BasePath.DEMO;

export const createEnvelopeDraft = async (envelopeDefinition, args) => {
  let eSignApi = new eSignSdk.ApiClient();
  eSignApi.setBasePath(ESignBasePath);
  eSignApi.addDefaultHeader("Authorization", "Bearer " + args.accessToken);
  let envelopesApi = new eSignSdk.EnvelopesApi(eSignApi);
  let results = null;

  try {
    results = await envelopesApi.createEnvelope(args.accountId, {
      envelopeDefinition,
    });
  } catch (error) {
    console.log(error);
  }

  let envelopeId = results.envelopeId;
  console.log(`Envelope was created. EnvelopeId ${envelopeId}`);

  return envelopeId;
};

/**
 *
 * @param Document document
 * @param { accessToken, accountId, envelopeId} args
 *
 */
export const addDocumentToEnvelopeDraft = async (document, args) => {
  let eSignApi = new eSignSdk.ApiClient();
  eSignApi.setBasePath(ESignBasePath);
  eSignApi.addDefaultHeader("Authorization", "Bearer " + args.accessToken);
  let envelopesApi = new eSignSdk.EnvelopesApi(eSignApi);
  let updateResult = await envelopesApi.updateDocuments(
    args.accountId,
    args.envelopeId,
    { envelopeDefinition: { documents: [document] } },
  );
  return updateResult;
};

export const constructCameraTrapVerificationEnvelope = (envelopeArgs) => {
  let envlp = new eSignSdk.EnvelopeDefinition();
  envlp.templateId = process.env.DS_SENTINELS_TEMPLATE;
  envlp.brandId = envelopeArgs.brandId;

  const { recipients, mediaValetData, survey123Data } = envelopeArgs;

  let firstVerifier = new eSignSdk.TemplateRole();
  firstVerifier.email = recipients.signerEmail;
  firstVerifier.name = recipients.signerFullName;
  firstVerifier.roleName = ROLE_NAMES.VERIFIER;

  /** Constructing Additional Reviewers in Case Of Sensitive Data */
  const additionalReviewers = recipients.reviewers.map(
    ({ name, email }, index) =>
      eSignSdk.TemplateRole.constructFromObject({
        email,
        name,
        roleName: `Reviewer L${index + 1}`, // Rolenames for reviewers follow the pattern L1, L2 etc.
      }),
  );

  envlp.customFields = {
    textCustomFields: [
      {
        name: "CameraImageId",
        show: "true",
        fieldId: "10735428877",
        value: mediaValetData.id,
      },
      {
        name: "Area",
        show: "true",
        fieldId: "10735428879",
        value: survey123Data.attributes.name_of_the_area_deployed,
      },
    ],
    listCustomFields: [
      {
        name: "IsSensitive",
        show: "true",
        fieldId: "10735428878",
        value: envelopeArgs.isSensitive ? "Yes" : "No",
      },
    ],
  };

  envlp.templateRoles = [firstVerifier, ...additionalReviewers];

  envlp.status = "created";

  return envlp;
};

export const generateDocumentPopulatedWithData = async (data) => {
  const htmlDocumentData = await getRenderedHtml(data);
  let document = new eSignSdk.Document();
  document.documentBase64 = Buffer.from(htmlDocumentData).toString("base64");
  document.name = "Verification Document";
  document.fileExtension = "html";
  document.documentId = "2";
  return document;
};

export const applyTemplateToDocument = async (
  { documentId, templateId },
  args,
) => {
  let eSignApi = new eSignSdk.ApiClient();
  eSignApi.setBasePath(ESignBasePath);
  eSignApi.addDefaultHeader("Authorization", "Bearer " + args.accessToken);
  let envelopesApi = new eSignSdk.EnvelopesApi(eSignApi);
  let applyResult = await envelopesApi.applyTemplateToDocument(
    args.accountId,
    args.envelopeId,
    documentId,
    {
      documentTemplateList: {
        documentTemplates: [
          {
            templateId,
            documentId,
            documentStartPage: "1",
            documentEndPage: "2",
          },
        ],
      },
    },
  );
  return applyResult;
};

export const sendEnvelope = async (args) => {
  let eSignApi = new eSignSdk.ApiClient();
  eSignApi.setBasePath(ESignBasePath);
  eSignApi.addDefaultHeader("Authorization", "Bearer " + args.accessToken);
  let envelopesApi = new eSignSdk.EnvelopesApi(eSignApi);
  const sentResult = await envelopesApi.update(
    args.accountId,
    args.envelopeId,
    {
      envelope: {
        status: "sent",
        workflow: {
          workflowSteps: [
            {
              action: "pause_before",
              description: "pause_before routing order 2",
              itemId: 2,
              triggerOnItem: "routing_order",
            },
          ],
        },
      },
    },
  );
  return sentResult;
};

export const getEmbeddedRecipientViewUrl = async (envelopeId, args) => {
  let eSignApi = new eSignSdk.ApiClient();
  eSignApi.setBasePath(ESignBasePath);
  eSignApi.addDefaultHeader("Authorization", "Bearer " + args.accessToken);
  let envelopesApi = new eSignSdk.EnvelopesApi(eSignApi);

  // Create the recipient view request object
  const viewRequest = new eSignSdk.RecipientViewRequest.constructFromObject({
    authenticationMethod: "none",
    // clientUserId: args.envelopeArgs.signerClientId,
    recipientId: "1",
    returnUrl: args.envelopeArgs.redirectUrl,
    userName: args.envelopeArgs.recipients.signerFullName,
    email: args.envelopeArgs.recipients.signerEmail,
    pingFrequency: "500",
    pingUrl: args.envelopeArgs.healthCheckEndPoint,
  });

  // Call the CreateRecipientView API
  // Exceptions will be caught by the calling function
  let recipientView = await envelopesApi.createRecipientView(
    args.accountId,
    envelopeId,
    {
      recipientViewRequest: viewRequest,
    },
  );

  return recipientView.url;
};