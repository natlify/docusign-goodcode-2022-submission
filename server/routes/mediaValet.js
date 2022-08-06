import express from "express";
import mediaValet from "../controllers/mediaValet.js";
import {
  gainMediaValetAccessToken,
  loginRequired,
} from "../../common/middlewares.js";
const router = express.Router();

router.get(
  "/folder/:folderId",
  loginRequired,
  gainMediaValetAccessToken,
  async (req, res) => {
    try {
      const response = await mediaValet.fetchCategoryDetails(req);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
);

export { router as mediaValetRouter };
