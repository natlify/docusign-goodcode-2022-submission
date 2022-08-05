import { queryFeatures } from "@esri/arcgis-rest-feature-service";
import {
  ApiKeyManager,
  ApplicationCredentialsManager,
} from "@esri/arcgis-rest-request";

export const ARCGIS_API_KEY =
  "AAPK87049e50c59c4c9195f5b9db8e5e8cecyGfMdB9MxqiP-3Mjv2IElSEOY45untdicWI4dZ7XTvtDOVKf5EGz5Cq-J4-S_aSI";

const apiKey = ARCGIS_API_KEY;

ApiKeyManager.fromKey(apiKey);

const SessionAuth = ApplicationCredentialsManager.fromCredentials({
  clientId: "jyqJyNUDwTmdReYd",
  clientSecret: "0f1778872fbb465f89dce96a04c4d132",
  expiration: 20160,
});
SessionAuth.getToken("https://www.arcgis.com/sharing/rest/oauth2/token");

export const querySurvey123ByCamera = async (camId) => {
  try {
    const data = await queryFeatures({
      url: "https://services.arcgis.com/ZjVc77HgpHbYSSCI/arcgis/rest/services/survey123_2649229083e74020ac0cba6d55ad9c59_stakeholder/FeatureServer/0",
      where: `camera_id = '${camId}'`,
      resultRecordCount: 1,
      authentication: SessionAuth,
    });
    return data.features[0];
  } catch (error) {
    console.log(error.message);
  }
};
