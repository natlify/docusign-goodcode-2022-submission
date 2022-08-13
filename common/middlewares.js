import { supabase } from "../server/services/@supabase.js";
import {
  generateAccessToken,
  mediaValetOauthClient,
} from "../server/services/@media-valet.js";

export const loginRequired = async (req, res, next) => {
  try {
    const { user } = await supabase.auth.api.getUserByCookie(req)
    if (!user) {
      return res
        .status(401)
        .json({ message: "You should be logged in to access this data" })
    }
    next()
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

export const gainMediaValetAccessToken = async (req, res, next) => {
  let accessToken = "";
  const EXPIRATION_WINDOW_IN_SECONDS = 70;

  const { data } = await supabase
    .from("oauth_security")
    .select("access_token, raw_data_dump")
    .eq("username", "zapene_service_role")
    .single();

  if (!data) {
    accessToken = await generateAccessToken();
  } else {
    accessToken = mediaValetOauthClient.createToken(
      JSON.parse(data.raw_data_dump),
    );
    if (accessToken.expired(EXPIRATION_WINDOW_IN_SECONDS)) {
      try {
        accessToken = await generateAccessToken();
      } catch (error) {
        console.log("Error refreshing access token: ", error.message);
      }
    } else {
      accessToken = accessToken.token.access_token;
    }
  }
  req.body["bearer_token"] = accessToken;
  next();
};
