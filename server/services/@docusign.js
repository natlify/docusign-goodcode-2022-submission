import eSignSdk from "docusign-esign";
import { ROLE_NAMES } from "../utils/constants.js"
import { getRenderedHtml } from "./docGeneration.js"
import _ from "lodash"
const ESignBasePath = eSignSdk.ApiClient.RestApi.BasePath.DEMO

export const createEnvelopeDraft = async (envelopeDefinition, args) => {
  let eSignApi = new eSignSdk.ApiClient()
  eSignApi.setBasePath(ESignBasePath)
  eSignApi.addDefaultHeader("Authorization", "Bearer " + args.accessToken)
  let envelopesApi = new eSignSdk.EnvelopesApi(eSignApi)
  let results = null

  try {
    results = await envelopesApi.createEnvelope(args.accountId, {
      envelopeDefinition,
    })
  } catch (error) {
    console.log(error)
  }

  let envelopeId = results.envelopeId
  console.log(`Envelope was created. EnvelopeId ${envelopeId}`)

  return envelopeId
}

/**
 *
 * @param Document document
 * @param { accessToken, accountId, envelopeId} args
 *
 */
export const addDocumentToEnvelopeDraft = async (document, args) => {
  let eSignApi = new eSignSdk.ApiClient()
  eSignApi.setBasePath(ESignBasePath)
  eSignApi.addDefaultHeader("Authorization", "Bearer " + args.accessToken)
  let envelopesApi = new eSignSdk.EnvelopesApi(eSignApi)
  let updateResult = await envelopesApi.updateDocuments(
    args.accountId,
    args.envelopeId,
    { envelopeDefinition: { documents: [document] } },
  )
  return updateResult
}

export const constructCameraTrapVerificationEnvelope = (envelopeArgs) => {
  let envlp = new eSignSdk.EnvelopeDefinition()
  envlp.templateId = process.env.DS_SENTINELS_TEMPLATE
  envlp.brandId = envelopeArgs.brandId

  const { recipients, mediaValetData, survey123Data } = envelopeArgs

  let firstVerifier = new eSignSdk.TemplateRole()
  firstVerifier.email = recipients.signerEmail
  firstVerifier.name = recipients.signerFullName
  firstVerifier.roleName = ROLE_NAMES.VERIFIER

  /** Constructing Additional Reviewers in Case Of Sensitive Data */
  const additionalReviewers = recipients.reviewers.map(
    ({ name, email }, index) =>
      eSignSdk.TemplateRole.constructFromObject({
        email,
        name,
        roleName: `Reviewer L${index + 1}`, // Rolenames for reviewers follow the pattern L1, L2 etc.
      }),
  )

  let finalApprover = new eSignSdk.TemplateRole()
  finalApprover.email = recipients.approverEmail
  finalApprover.name = recipients.approverFullName
  finalApprover.roleName = ROLE_NAMES.VERIFIER

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
  }

  envlp.templateRoles = [firstVerifier, ...additionalReviewers, finalApprover]

  envlp.status = "created"

  return envlp
}

export const generateDocumentPopulatedWithData = async (data) => {
  const htmlDocumentData = await getRenderedHtml(data)
  let document = new eSignSdk.Document()
  document.documentBase64 = Buffer.from(htmlDocumentData).toString("base64")
  document.name = "Verification Document"
  document.fileExtension = "pdf"
  document.documentId = "2"
  return document
}

export const applyTemplateToDocument = async (
  { documentId, templateId },
  args,
) => {
  let eSignApi = new eSignSdk.ApiClient()
  eSignApi.setBasePath(ESignBasePath)
  eSignApi.addDefaultHeader("Authorization", "Bearer " + args.accessToken)
  let envelopesApi = new eSignSdk.EnvelopesApi(eSignApi)
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
  )
  return applyResult
}

export const sendEnvelope = async (args) => {
  let eSignApi = new eSignSdk.ApiClient()
  eSignApi.setBasePath(ESignBasePath)
  eSignApi.addDefaultHeader("Authorization", "Bearer " + args.accessToken)
  let envelopesApi = new eSignSdk.EnvelopesApi(eSignApi)
  const sentResult = await envelopesApi.update(
    args.accountId,
    args.envelopeId,
    {
      envelope: {
        status: "sent",
      },
    },
  )
  return sentResult
}

export const removeRecipient = async (args, recipientId) => {
  let eSignApi = new eSignSdk.ApiClient()
  eSignApi.setBasePath(ESignBasePath)
  eSignApi.addDefaultHeader("Authorization", "Bearer " + args.accessToken)
  let envelopesApi = new eSignSdk.EnvelopesApi(eSignApi)
  const removeResult = await envelopesApi.deleteRecipient(
    args.accountId,
    args.envelopeId,
    recipientId,
  )
  return removeResult
}

export const getEmbeddedRecipientViewUrl = async (envelopeId, args) => {
  let eSignApi = new eSignSdk.ApiClient()
  eSignApi.setBasePath(ESignBasePath)
  eSignApi.addDefaultHeader("Authorization", "Bearer " + args.accessToken)
  let envelopesApi = new eSignSdk.EnvelopesApi(eSignApi)

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
  })

  // Call the CreateRecipientView API
  // Exceptions will be caught by the calling function
  let recipientView = await envelopesApi.createRecipientView(
    args.accountId,
    envelopeId,
    {
      recipientViewRequest: viewRequest,
    },
  )

  return recipientView.url
}

export const updateTabsAndCustomFields = async (args) => {
  let eSignApi = new eSignSdk.ApiClient()
  eSignApi.setBasePath(args.basePath)
  eSignApi.addDefaultHeader("Authorization", "Bearer " + args.accessToken)
  let envelopesApi = new eSignSdk.EnvelopesApi(eSignApi)

  const {
    envelopeArgs: { mediaValetData, survey123Data },
  } = args

  /** SET Lat long as custom field Values */
  await envelopesApi.createCustomFields(args.accountId, args.envelopeId, {
    customFields: {
      textCustomFields: [
        {
          name: "latitude",
          show: true,
          value: survey123Data.geometry.x,
        },
        {
          name: "longitude",
          show: true,
          value: survey123Data.geometry.y,
        },
      ],
    },
  })

  const results = await envelopesApi.getDocumentTabs(
    args.accountId,
    args.envelopeId,
    "2",
  )
  const textTabObj = _.keyBy(results.textTabs, "tabLabel")
  const numTabObj = _.keyBy(results.numberTabs, "tabLabel")
  const dropdownTabObj = _.keyBy(results.listTabs, "tabLabel")

   await envelopesApi.updateTabs(
     args.accountId,
     args.envelopeId,
     textTabObj["z-keywords-text"].recipientId,
     {
       tabs: {
         numberTabs: [
           {
             ...numTabObj["z-camheight-text"],
             value: survey123Data.attributes.camera_height_cm,
           },
         ],
         textTabs: [
           {
             ...textTabObj["z-keywords-text"],
             value: mediaValetData.file.keywords,
           },
           {
             ...textTabObj["z-cognitive-data"],
             value: "Animals, Computer, Wildlife, Macaque, Outdoor", // TODO : Fetch from the media valet details data
           },
           {
             ...textTabObj["z-alt-text"],
             value: mediaValetData.altText,
           },
         ],
         listTabs: [
           {
             ...dropdownTabObj["z-camera-dropdown"],
             listSelectedValue: survey123Data.attributes.camera_make,
           },
           {
             ...dropdownTabObj["z-camattached-dropdown"],
             listSelectedValue: survey123Data.attributes.camera_attached_to,
           },
         ],
       },
     },
   )
}