import express from "express";
import LabelController from "../controllers/label.js";
import { loginRequired } from "../../common/middlewares.js";
const router = express.Router();

router.post("/", loginRequired, async (req, res) => {
  try {
    const response = await LabelController.createLabel(req);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post("/relation", loginRequired, async (req, res) => {
  try {
    const response = await LabelController.createTaskLabelRelation(req);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete("/delete/:labelId", loginRequired, async (req, res) => {
  try {
    const response = await LabelController.deleteLabel(req);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export { router as labelRouter };
