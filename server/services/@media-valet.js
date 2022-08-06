import { ResourceOwnerPassword } from "simple-oauth2";
import { supabase } from "./@supabase.js";
import axios from "axios";

const config = {
  client: {
    id: "7f495f1f-21dc-4f9b-9071-4b56e5375e9f",
    secret: "86hVfmmct24ydSqAmBhdArCMw3fSz92kPL814ZWoeYw=",
  },
  auth: {
    tokenHost: "https://login.mediavalet.com",
    tokenPath: "/connect/token",
  },
};
export const mediaValetOauthClient = new ResourceOwnerPassword(config);
const BASE_URL = "https://api.mediavalet.com";
// const BOYS_FOLDER_ID = "5f202f3b-3d54-436b-a05e-1597b0127f72";
const SUBSCRIPTION_KEY = "03e0a3d8270a432d9ede6e2cfca073dd";

const restApiInstance = axios.create({
  baseURL: BASE_URL,
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
  },
});

export const generateAccessToken = async () => {
  const tokenParams = {
    username: "creedcode2022@gmail.com",
    password: "CreedCode123#",
    scope: "api",
  };

  try {
    const response = await mediaValetOauthClient.getToken(tokenParams);
    const raw_data_dump = JSON.stringify(response);
    const {
      token: { access_token },
    } = response;
    await supabase.from("oauth_security").upsert([
      {
        username: "zapene_service_role",
        platform: "MEDIA_VALET",
        raw_data_dump,
        access_token,
      },
    ]);
    console.log("Refreshing Access Token");
    return access_token;
  } catch (error) {
    throw new Error("Access Token Error", error.message);
  }
};

export const fetchCategory = ({ token, folderID }) =>
  restApiInstance({
    url: `${BASE_URL}/folders/${folderID}`,
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
