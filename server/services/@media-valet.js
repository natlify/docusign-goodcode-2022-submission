import { ResourceOwnerPassword } from "simple-oauth2";
import { supabase } from "./@supabase.js";

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
