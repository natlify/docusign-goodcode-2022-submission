import path from "path";
import { fileURLToPath } from "url";
import esign from "docusign-esign";
import { readFileSync } from "fs";
import dayjs from "dayjs";
const { ApiClient } = esign;
const oAuth = ApiClient.OAuth

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

// Constants
const rsaKey = readFileSync(path.resolve(__dirname, "../private.key"))
const jwtLifeSec = 60 * 60 // Request lifetime of JWT token is 60 minutes
const scopes = "signature"

const oAuthBasePath = oAuth.BasePath.DEMO

/**
 * Creates and sends a JWT token using the integration key, user ID, scopes and RSA key.
 * Then stores the returned access token and expiration date.
 */
const getToken = async (req) => {
  // Get API client and set the base paths
  const eSignApi = new ApiClient()
  eSignApi.setOAuthBasePath(oAuthBasePath)

  // Request a JWT token
  let results

  results = await eSignApi.requestJWTUserToken(
    process.env.INTEGRATION_KEY,
    process.env.USER_ID,
    scopes,
    rsaKey,
    jwtLifeSec,
  )

  // Save the access token and the expiration timestamp
  const expiresAt = dayjs().add(results.body.expires_in, "s")
  req.session.docuSignAccessToken = results.body.access_token
  req.session.tokenExpirationTimestamp = expiresAt
}

/**
 * Checks to see that the current access token is still valid, and if not,
 * updates the token.
 * Must be called before every DocuSign API call.
 */
export const checkToken = async (req) => {
  try {
    const noToken =
        !req.session.docuSignAccessToken ||
        !req.session.tokenExpirationTimestamp,
      currentTime = dayjs(),
      bufferTime = 1; // One minute buffer time

    // Check to see if we have a token or if the token is expired
    let needToken =
      noToken ||
      dayjs(req.session.tokenExpirationTimestamp)
        .subtract(bufferTime, "m")
        .isBefore(currentTime);

    // Update the token if needed
    if (needToken) {
      await getToken(req)
    }
  } catch (error) {
    if (
      error.response.body.error &&
      error.response.body.error === "consent_required"
    ) {
      throw new Error("Consent required");
    } else {
      throw error;
    }
  }
};

/**
 * Gets the account ID, account name, and base path of the user using the access token.
 */
const getUserInfo = async (req) => {
  // Get API client
  const eSignApi = new ApiClient(),
    targetAccountId = process.env.targetAccountId,
    baseUriSuffix = "/restapi";
  eSignApi.setOAuthBasePath(oAuthBasePath);

  // Get user info using access token
  const results = await eSignApi.getUserInfo(req.session.docuSignAccessToken);

  let accountInfo;
  if (!targetAccountId) {
    // Find the default account
    accountInfo = results.accounts.find(
      (account) => account.isDefault === "true",
    );
  } else {
    // Find the matching account
    accountInfo = results.accounts.find(
      (account) => account.accountId == targetAccountId,
    );
  }
  if (typeof accountInfo === "undefined") {
    throw new Error(`Target account ${targetAccountId} not found!`);
  }

  // Save user information in session.
  req.session.docuSignAccountId = accountInfo.accountId;
  req.session.docuSignBasePath = accountInfo.baseUri + baseUriSuffix;
};

/**
 * First checks if there is already a valid access token, updates it if it's expired,
 * then gets some user info. If the user has never provided consent, then they are
 * redirected to a login screen.
 */
export const login = async (req, res, next) => {
  try {
    /**
     * As long as the user has attempted to login before, they have either successfully
     * logged in or was redirected to the consent URL and then redirected back to the
     * app. Only set the user to logged out if an unknown error occurred during the
     * login process.
     */
    req.session.isDocuSignLoggedIn = true
    await checkToken(req)
    await getUserInfo(req)
    res.status(200).send("Successfully logged in.")
  } catch (error) {
    // User has not provided consent yet, send the redirect URL to user.
    if (error.message === "Consent required") {
      let consent_scopes = scopes + "%20impersonation",
        consent_url =
          `${process.env.DS_OAUTH_SERVER}/oauth/auth?response_type=code&` +
          `scope=${consent_scopes}&client_id=${process.env.INTEGRATION_KEY}&` +
          `redirect_uri=${process.env.REDIRECT_URI_HOME}`;

      res.status(210).send(consent_url);
    } else {
      req.session.isDocuSignLoggedIn = false;
      next(error);
    }
  }
};

/**
 * Logs the user out by destroying the session.
 */
export const logout = (req, res) => {
  req.session = null
  res.status(200).send("Success: you have logged out");
};

/**
 * Sends back "true" if the user is logged in, false otherwise.
 */
export const isLoggedIn = (req, res) => {
  let isLoggedIn;
  if (req.session.isDocuSignLoggedIn === undefined) {
    isLoggedIn = false;
  } else {
    isLoggedIn = req.session.isDocuSignLoggedIn;
  }

  res.status(200).send(isLoggedIn);
};
