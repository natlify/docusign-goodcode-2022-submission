import eSignSdk from "docusign-esign";
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

const generateSigning = async () => {
  let envlp = new eSignSdk.EnvelopeDefinition();
  envlp.templateId = "e98c5414-6272-447d-9ee1-96d5b7f2764a";
  envlp.brandId = "4aba865e-f5a5-4145-a8ba-18fc475759d6";
  let signer1 = eSignSdk.TemplateRole.constructFromObject({
    email: "hbthck@gmail.com",
    name: "Arjith Natarajan",
    roleName: "Verifier",
  });

  let optionalReviewer1 = new eSignSdk.TemplateRole();
  optionalReviewer1.email = "ferran.9908@gmail.com";
  optionalReviewer1.name = "Ferran Sulaiman";
  optionalReviewer1.roleName = "Reviewer L1";

  envlp.customFields = {
    textCustomFields: [
      {
        name: "CameraImageId",
        show: "true",
        fieldId: "10735428877",
        value: "CAM_122323",
      },
      {
        name: "Area",
        show: "true",
        fieldId: "10735428879",
        value: "Tanzania",
      },
    ],
    listCustomFields: [
      {
        name: "IsSensitive",
        show: "true",
        fieldId: "10735428878",
        value: "Yes",
      },
    ],
  };

  envlp.templateRoles = [signer1, optionalReviewer1];
  envlp.status = "created";

  const accessToken =
    "eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwCA80pk63faSAgAgFsPxvN32kgCAN-fB5PDP4NMhSZ-j2X_LNQVAAEAAAAYAAEAAAAFAAAADQAkAAAAMjNlMDk5ZTYtZDM5ZS00MDk5LThiNzctZTVjZTY5NDBkZGZiIgAkAAAAMjNlMDk5ZTYtZDM5ZS00MDk5LThiNzctZTVjZTY5NDBkZGZiEgABAAAABgAAAGp3dF9iciMAJAAAADIzZTA5OWU2LWQzOWUtNDA5OS04Yjc3LWU1Y2U2OTQwZGRmYg.LUYqH5eQ760mxii_r-8rxp9_49C-G_cql6JU1RPmaG7r7aujygLF69J4xN-N_Onlj5az8cXtXHuQyATCziPIjQ4WMmVRJHLPT7_jsG3CbppOBdvFxIH7uZLPoTDMycCRMnij_oviwhsaf7xaXqRfnQcvTqxaE_67RtfM98qS1MzRr8BoHnPzspTupzzSopE16EsA1k84JdATfJ0A8QykwecbdxAZViW2kovFoZI4gOgX05xns9pZ7wKcKuyIJWMSAaT9UbG-coPgTjNCcPK7dcooeLUyyeeoXAtf8NFF-VBski5s3O74yfni7bAWMhiopgDOU2hbuTTfiSEZqYSdSw";

  try {
    const draftEnvelopeId = await createEnvelopeDraft(envlp, {
      ESignBasePath,
      accountId: "77c8b115-51ee-4f06-9979-ca9e73968e8e",
      accessToken,
    });

    let doc1 = new eSignSdk.Document(),
      doc1b64 = Buffer.from(await getRenderedHtml()).toString("base64");
    doc1.documentBase64 = doc1b64;
    doc1.name = "Verification Document"; // can be different from actual file name
    doc1.fileExtension = "html"; // Source data format. Signed docs are always pdf.
    doc1.documentId = "2"; // a label used to reference the doc

    let eSignApi = new eSignSdk.ApiClient();
    eSignApi.setBasePath(ESignBasePath);
    eSignApi.addDefaultHeader("Authorization", "Bearer " + accessToken);
    let envelopesApi = new eSignSdk.EnvelopesApi(eSignApi);
    let updateResult = await envelopesApi.updateDocuments(
      "77c8b115-51ee-4f06-9979-ca9e73968e8e",
      draftEnvelopeId,
      { envelopeDefinition: { documents: [doc1] } },
    );
    console.log(updateResult);

    await addDocumentToEnvelopeDraft(doc1);

    let applyResult = await envelopesApi.applyTemplateToDocument(
      "77c8b115-51ee-4f06-9979-ca9e73968e8e",
      draftEnvelopeId,
      doc1.documentId,
      {
        documentTemplateList: {
          documentTemplates: [
            {
              templateId: "e98c5414-6272-447d-9ee1-96d5b7f2764a",
              documentId: "2",
              documentStartPage: "1",
              documentEndPage: "2",
            },
          ],
        },
      },
    );
    console.log(applyResult);
  } catch (error) {
    console.log(error);
  }
};
