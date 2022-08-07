import express from "express";
import UserController from "../controllers/user.js";
import { validator } from "../validators/validators.js";
import { loginSchema } from "../../client/src/utils/loginSchema.mjs";
import { registrationSchema } from "../../client/src/utils/registrationSchema.mjs";
import { loginRequired } from "../../common/middlewares.js";

const router = express.Router();

router.post("/register", validator(registrationSchema), async (req, res) => {
  try {
    const response = await UserController.register(req, res);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post("/login", validator(loginSchema), async (req, res) => {
  try {
    const response = await UserController.login(req, res);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/tasks/:dueDate", loginRequired, async (req, res) => {
  try {
    const response = await UserController.getUserTasksForDay(req);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/tasks/until/:dueDate", loginRequired, async (req, res) => {
  try {
    const response = await UserController.getUserTasksUntilDay(req);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post("/logout", loginRequired, async (req, res) => {
  try {
    const response = await UserController.logout(req);
    res.clearCookie("zapene-app-goodcode-2022");
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/userInfo", loginRequired, async (req, res) => {
  try {
    const response = await UserController.getUserInfo(req);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/labels", loginRequired, async (req, res) => {
  try {
    const response = await UserController.getUserLabels(req);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export { router as userRouter };
