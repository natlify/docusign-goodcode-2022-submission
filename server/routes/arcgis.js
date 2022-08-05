import express from "express";
import arcgis from "../controllers/arcgis.js";
import { loginRequired } from "../../common/middlewares.js";
const router = express.Router();

router.get("/survey123/camera/:cameraId", loginRequired, async (req, res) => {
  try {
    const response = await arcgis.fetchByCameraId(req);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export { router as arcGISRouter };
