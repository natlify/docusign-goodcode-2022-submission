import { supabase } from "../server/services/@supabase.js";
import {
  generateAccessToken,
  mediaValetOauthClient,
} from "../server/services/@media-valet.js";

export const loginRequired = async (req, res, next) => {
  try {
    // const userInfo = await pool.query(
    //   `SELECT user_id FROM users WHERE session=$1;`,
    //   [req.cookies["team-lp-project-5"]],
    // );
    // if (userInfo.rowCount === 1) {
    //   req.session = {
    //     logged: true,
    //     userId: userInfo.rows[0].user_id,
    //   };
    // } else {
    //   return res
    //     .status(401)
    //     .json({ message: "You should be logged in to access this data" });
    // }
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const checkIfUserIsTaskOwner = async () => {
  // try {
  //   const taskExist = await pool.query(
  //     `SELECT task_id FROM tasks WHERE task_id=$1;`,
  //     [req.params.taskId],
  //   );
  //   if (taskExist.rowCount) {
  //     const checkIfUserIsOwner = await pool.query(
  //       `SELECT task_id FROM tasks WHERE user_id=$1 AND task_id=$2;`,
  //       [req.session.userId, req.params.taskId],
  //     );
  //     if (checkIfUserIsOwner.rowCount) {
  //       next();
  //     } else {
  //       return res
  //         .status(403)
  //         .json({ message: "You are not allowed to do this" });
  //     }
  //   } else {
  //     return res.status(400).json({ message: "Task doesn't exist" });
  //   }
  // } catch (error) {
  //   return res.status(400).json({ error: error.message });
  // }
};

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
