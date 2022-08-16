import { queryFeatures } from "@esri/arcgis-rest-feature-service";
import {
  ApiKeyManager,
  ApplicationCredentialsManager,
} from "@esri/arcgis-rest-request";


const apiKey = process.env.ARCGIS_API_KEY

ApiKeyManager.fromKey(apiKey)

const SessionAuth = ApplicationCredentialsManager.fromCredentials({
  clientId: process.env.ARCGIS_CLIENT_ID,
  clientSecret: process.env.ARCGIS_CLIENT_SECRET,
  expiration: 1200,
})


export const querySurvey123ByCamera = async (camId) => {
  const data = await queryFeatures({
    url: "https://services.arcgis.com/ZjVc77HgpHbYSSCI/arcgis/rest/services/survey123_2649229083e74020ac0cba6d55ad9c59_stakeholder/FeatureServer/0",
    where: `camera_id = '${camId}'`,
    resultRecordCount: 1,
    authentication: SessionAuth,
  });
  return data.features[0];
};
