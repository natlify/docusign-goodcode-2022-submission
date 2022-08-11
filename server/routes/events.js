import express from "express";
import { gainMediaValetAccessToken } from "../../common/middlewares.js";
import webhooks from "../controllers/webhooks.js";
const router = express.Router();

router.post("", gainMediaValetAccessToken, async (req, res) => {
  try {
    const response = await webhooks.handleDocusignConnectEvents(req);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export { router as eventsRouter };
