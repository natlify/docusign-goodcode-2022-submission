import express from "express";
import TaskController from "../controllers/task.js";
import {
  loginRequired,
  checkIfUserIsTaskOwner,
} from "../../common/middlewares.js";
const router = express.Router();

router.post("/", loginRequired, async (req, res) => {
  try {
    const response = await TaskController.createTask(req);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put(
  "/:taskId/changeTaskInfo",
  loginRequired,
  checkIfUserIsTaskOwner,
  async (req, res) => {
    try {
      const response = await TaskController.changeTaskInfo(req);
      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
);

router.delete(
  "/:taskId",
  loginRequired,
  checkIfUserIsTaskOwner,
  async (req, res) => {
    try {
      const response = await TaskController.deleteTask(req);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
);

router.get("/search/:searchParam", loginRequired, async (req, res) => {
  try {
    const response = await TaskController.searchTask(req);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export { router as taskRouter };
