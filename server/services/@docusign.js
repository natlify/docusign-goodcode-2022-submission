import eSignSdk from "docusign-esign";

const basePath = eSignSdk.ApiClient.RestApi.BasePath.DEMO;

const sendEnvelope = async (envelopeDefinition, args) => {
  // Create API client to call
  let eSignApi = new eSignSdk.ApiClient();
  eSignApi.setBasePath(args.basePath);
  eSignApi.addDefaultHeader("Authorization", "Bearer " + args.accessToken);
  let envelopesApi = new eSignSdk.EnvelopesApi(eSignApi);
  let results = null;

  // Call Envelopes::create API method
  // Exceptions will be caught by the calling function
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

let envlp = new eSignSdk.EnvelopeDefinition();
envlp.templateId = "e98c5414-6272-447d-9ee1-96d5b7f2764a";
envlp.brandId = "4aba865e-f5a5-4145-a8ba-18fc475759d6";
let signer1 = eSignSdk.TemplateRole.constructFromObject({
  email: "hbthck@gmail.com",
  name: "Arjith Natarajan",
  roleName: "Verifier",
});

let optionalReviewer1 = new eSignSdk.TemplateRole();
optionalReviewer1.email = "jayantha.natarajan@gmail.com";
optionalReviewer1.name = "Jayantha Natarajan";
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

try {
  sendEnvelope(envlp, {
    basePath,
    accountId: "77c8b115-51ee-4f06-9979-ca9e73968e8e",
    accessToken:
      "eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwAAdh3NwXfaSAgAAN7hLsp32kgCAN-fB5PDP4NMhSZ-j2X_LNQVAAEAAAAYAAEAAAAFAAAADQAkAAAAMjNlMDk5ZTYtZDM5ZS00MDk5LThiNzctZTVjZTY5NDBkZGZiIgAkAAAAMjNlMDk5ZTYtZDM5ZS00MDk5LThiNzctZTVjZTY5NDBkZGZiEgABAAAABgAAAGp3dF9iciMAJAAAADIzZTA5OWU2LWQzOWUtNDA5OS04Yjc3LWU1Y2U2OTQwZGRmYg.slwJTilfoIRncssUZihvtmv3KqUCXA3cTq3CTPS7lVIRQjH2E2EBXtEYrvyGVQfKyAbm5tQqJz_ZrNb6c5GRryqwRDMiPfUnYQC36MGIp0Q4W4zHrBrUKteHr5xIPFfxYqLMcBwThygdGjPuFqfffC77ZcIXTyY2DESwVn-6JuB3fNbJ-eqcmC1aOx4TnlUR4mzW5HwtYC1ZVbfQnxPEPGKlXAxF3lMW0x6-0sujx9ClGL6p9BHz2ydUZyjdvoDQ6sKkgOsGvzKWDw4v73xPPlumx6MILXj8sSeCAY64ax4k4RHRAKiItv5o5zke-tjf_1xmcHqEK1SdbMLtZF_taA",
  });
} catch (error) {
  console.log(error.message);
}
