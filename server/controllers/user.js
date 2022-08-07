import pool from "../db/setup.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

export default class UserController {
  static register = async (req, res) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    await pool.query(
      `INSERT INTO users (username, first_name, second_name, password, email) VALUES ($1, $2, $3, $4, $5);`,
      [
        req.body.username,
        req.body.firstName,
        req.body.lastName,
        hashedPassword,
        req.body.email,
      ],
    );
    const user = await pool.query(`SELECT * FROM users WHERE email=$1;`, [
      req.body.email,
    ]);
    const userSessionIdExist = user.rows[0].session;
    if (userSessionIdExist) {
      res.cookie("zapene-app-goodcode-2022", userSessionIdExist);
    } else {
      const sessionToken = crypto.randomBytes(64).toString("base64");
      await pool.query(`UPDATE users SET session=$1 WHERE email=$2;`, [
        sessionToken,
        req.body.email,
      ]);
      res.cookie("zapene-app-goodcode-2022", sessionToken);
    }
    return { message: "User created", userId: user.rows[0].user_id };
  };

  static login = async (req, res) => {
    const user = await pool.query(`SELECT * FROM users WHERE email=$1;`, [
      req.body.email,
    ]);
    if (!user.rowCount) {
      throw new Error("User with this email does not exist.");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.rows[0].password,
    );
    if (!validPassword) {
      throw new Error("Invalid password.");
    }
    const userSessionIdExist = user.rows[0].session;
    if (userSessionIdExist) {
      res.cookie("zapene-app-goodcode-2022", userSessionIdExist);
    } else {
      const sessionToken = crypto.randomBytes(64).toString("base64");
      await pool.query(`UPDATE users SET session=$1 WHERE email=$2;`, [
        sessionToken,
        req.body.email,
      ]);
      res.cookie("zapene-app-goodcode-2022", sessionToken);
    }
    return { message: "Logged in successfully.", userId: user.rows[0].user_id };
  };

  static getUserTasksForDay = async (req) => {
    const tasks = await pool.query(
      `SELECT * FROM tasks WHERE user_id=$1 AND due_date=$2;`,
      [req.session.userId, req.params.dueDate],
    );
    if (tasks.rowCount) {
      const labels = await pool.query(
        `SELECT labels.title
        FROM  labels, tasks, tasks_labels_relation
        WHERE tasks.task_id = $1 AND tasks.task_id = tasks_labels_relation.task_id AND tasks_labels_relation.label_id = labels.label_id;`,
        [tasks.rows[0].task_id],
      );
      tasks.rows[0].labels = labels.rows;

      return {
        tasks: tasks.rows.map(({ task_id, due_date, ...rest }) => ({
          taskId: task_id,
          dueDate: due_date,
          ...rest,
        })),
      };
    } else {
      return { message: "No tasks found for this user" };
    }
  };

  static getUserTasksUntilDay = async (req) => {
    const tasks = await pool.query(
      `SELECT * FROM tasks WHERE user_id=$1 AND due_date<$2 AND status=$3;`,
      [req.session.userId, req.params.dueDate, false],
    );
    if (tasks.rowCount) {
      const labels = await pool.query(
        `SELECT labels.title
        FROM  labels, tasks, tasks_labels_relation
        WHERE tasks.task_id = $1 AND tasks.task_id = tasks_labels_relation.task_id AND tasks_labels_relation.label_id = labels.label_id;`,
        [tasks.rows[0].task_id],
      );
      tasks.rows[0].labels = labels.rows;
      return {
        tasks: tasks.rows.map(({ task_id, due_date, ...rest }) => ({
          taskId: task_id,
          dueDate: due_date,
          ...rest,
        })),
      };
    } else {
      return { message: "No tasks found for this user" };
    }
  };

  static logout = async (req) => {
    await pool.query(`UPDATE users SET session='' WHERE user_id=$1;`, [
      req.session.userId,
    ]);
    return { message: "Logged out successfully." };
  };

  static getUserInfo = async (req) => {
    const userInfo = await pool.query(
      `SELECT username, email, first_name, second_name FROM users WHERE user_id=$1;`,
      [req.session.userId],
    );
    if (userInfo.rowCount) {
      return { userInfo: userInfo.rows[0] };
    } else {
      return { message: "No user found" };
    }
  };

  static getUserLabels = async (req) => {
    const labelsInfo = await pool.query(
      `SELECT title FROM labels WHERE user_id=$1;`,
      [req.session.userId],
    );
    if (labelsInfo.rowCount) {
      return { labels: labelsInfo.rows };
    } else {
      return { message: "No labels found" };
    }
  };
}
