import { ResourceOwnerPassword } from "simple-oauth2";
import { supabase } from "./@supabase.js";
import axios from "axios";

const config = {
  client: {
    id: process.env.MV_CLIENT_ID,
    secret: process.env.MV_CLIENT_SECRET,
  },
  auth: {
    tokenHost: "https://login.mediavalet.com",
    tokenPath: "/connect/token",
  },
}
export const mediaValetOauthClient = new ResourceOwnerPassword(config)
const BASE_URL = "https://api.mediavalet.com"

const restApiInstance = axios.create({
  baseURL: BASE_URL,
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
  },
})

export const generateAccessToken = async () => {
  const tokenParams = {
    username: "creedcode2022@gmail.com",
    password: "CreedCode123#",
    scope: "api offline_access",
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
    url: `/folders/${folderID}`,
    headers: {
      Authorization: `bearer ${token}`,
    },
  });

export const fetchAllImagesFromCategory = ({ token, folderID }) =>
  restApiInstance({
    url: `/categories/${folderID}/assets?includeSoftDeleted=true`,
    headers: {
      Authorization: `bearer ${token}`,
    },
  });

export const updateAltText = ({ token, assetId, altText }) =>
  restApiInstance({
    url: `/assets/${assetId}`,
    method: "patch",
    headers: {
      Authorization: `bearer ${token}`,
    },
    data: [
      {
        op: "replace",
        path: "/altText",
        value: altText,
      },
    ],
  });

export const addKeyWords = ({ token, assetId, keyWordList }) =>
  restApiInstance({
    url: `/assets/${assetId}/keywords`,
    method: "post",
    headers: {
      Authorization: `bearer ${token}`,
    },
    data: keyWordList,
  });

export const removeKeyWord = ({ token, assetId, keyWord }) =>
  restApiInstance({
    url: `/assets/${assetId}/keywords/${keyWord}`,
    method: "delete",
    headers: {
      Authorization: `bearer ${token}`,
    },
  });

export const updateAttributes = ({ token, assetId, lat, long }) =>
  restApiInstance({
    url: `/assets/${assetId}`,
    method: "patch",
    headers: {
      Authorization: `bearer ${token}`,
    },
    data: [
      {
        op: "add",
        path: "/attributes/c0c67677-b8eb-4522-844b-a4aeb9be7807",
        value: lat,
      },
      {
        op: "add",
        path: "/attributes/6ce37da1-e78f-426a-9505-671fe9161272",
        value: long,
      },
    ],
  });