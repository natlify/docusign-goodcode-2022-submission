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
    console.log(error.message);
  }

  let envelopeId = results.envelopeId;
  console.log(`Envelope was created. EnvelopeId ${envelopeId}`);

  return envelopeId;
};

let envlp = new eSignSdk.EnvelopeDefinition();
envlp.templateId = "e98c5414-6272-447d-9ee1-96d5b7f2764a";
envlp.brandId = "4aba865e-f5a5-4145-a8ba-18fc475759d6";
let signer1 = eSignSdk.TemplateRole.constructFromObject({
  email: "arjith496@gmail.com",
  name: "Arjith Natarajan",
  roleName: "Verifier",
});

let optionalReviewer1 = new eSignSdk.TemplateRole();
optionalReviewer1.email = "jayantha.natarajan@gmail.com";
optionalReviewer1.name = "Jayantha Natarajan";
optionalReviewer1.roleName = "Reviewer L1";

envlp.templateRoles = [signer1, optionalReviewer1];
envlp.status = "sent";

try {
  sendEnvelope(envlp, {
    basePath,
    accountId: "77c8b115-51ee-4f06-9979-ca9e73968e8e",
    accessToken:
      "eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwCA3NnDtHfaSAgAgESeJb132kgCAN-fB5PDP4NMhSZ-j2X_LNQVAAEAAAAYAAEAAAAFAAAADQAkAAAAMjNlMDk5ZTYtZDM5ZS00MDk5LThiNzctZTVjZTY5NDBkZGZiIgAkAAAAMjNlMDk5ZTYtZDM5ZS00MDk5LThiNzctZTVjZTY5NDBkZGZiEgABAAAABgAAAGp3dF9iciMAJAAAADIzZTA5OWU2LWQzOWUtNDA5OS04Yjc3LWU1Y2U2OTQwZGRmYg.LxyWvPgd34YOq_eFGHadllZfF2NzrIiEp3XmJC7gMfx8t6XDrDyHEp6eqvi9LVjZSUKbAPiAm45ClkJTqR0q1OuXuXFFeA6aBU08U5aoLYswUoOpwl9uSmxVHUEESUKWdPuH6UsZuGz_Rn1ARlsVCSQyfhKfrnNDSYKED2y7fHNJLIUkK3rXaDqLKJuguBwUTUIIDjpALzSfSwB3kQGD46LE8FCTEqyVbPz8j38i18OIOaHMzcayDF5gtoOlDvaBU66W7NJKDv1QESMni5P6JuCEQyp5_sghF-mqyZ0YnxIKcxby6Ov7BQMAJ9xEwRc4A-n8vSUDRo8yyPnKjURL1g",
  });
} catch (error) {
  console.log(error.message);
}
