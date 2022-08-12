import express from "express";
import esign from "../controllers/esign.js";
import { loginRequired } from "../../common/middlewares.js";
const router = express.Router();

router.post("/triggerFlow", loginRequired, async (req, res) => {
  try {
    const response = await esign.createEnvelopeForSigning(req);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


router.post("/test", loginRequired, async (req, res) => {
  try {
    const response = await esign.testESign(req)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

export { router as eSignRouter };
