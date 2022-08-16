export const ROLE_NAMES = {
  VERIFIER: "Verifier",
  APPROVER: "Approver",
}


export const getBaseURL = () => {
  const production = "https://zapene-app.herokuapp.com/api/docusign-connect";
  const development =
    "https://webhook.site/ee27b6ea-5a40-4d3c-9dd3-96884612f3d3";
  const url = process.env.NODE_ENV === production ? production : development;
  return url;
};