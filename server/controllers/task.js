import pool from "../db/setup.js";

export default class TaskController {
  static createTask = async (req) => {
    await pool.query(
      `INSERT INTO tasks (title, description, user_id, priority, status, due_date) VALUES ($1, $2, $3, $4, $5, $6);`,
      [
        req.body.title,
        req.body.description,
        req.session.userId,
        req.body.priority,
        req.body.status,
        req.body.dueDate,
      ],
    );
    return { message: "Task created" };
  };

  static changeTaskInfo = async (req) => {
    await pool.query(
      `UPDATE tasks SET priority=COALESCE($1,priority), status=COALESCE($2,status), title=COALESCE($3,title), 
      description=COALESCE($4,description), due_date=COALESCE($5,due_date) WHERE task_id=$6;`,
      [
        req.body.priority,
        req.body.status,
        req.body.title,
        req.body.description,
        req.body.dueDate,
        req.params.taskId,
      ],
    );
    return { message: "Task changed" };
  };

  static deleteTask = async (req) => {
    const outcome = await pool.query(`DELETE FROM tasks WHERE task_id=$1;`, [
      req.params.taskId,
    ]);
    if (outcome.rowCount === 1) {
      return { message: "Task Deleted" };
    } else {
      return { message: "No task with that ID" };
    }
  };

  static searchTask = async (req) => {
    const searchQuery = "%" + req.params.searchParam + "%";
    const searchInfo = await pool.query(
      `SELECT * FROM tasks WHERE description LIKE $2 OR title LIKE $2 AND user_id=$1;`,
      [req.session.userId, searchQuery],
    );
    if (searchInfo.rowCount) {
      return { tasks: searchInfo.rows };
    } else {
      return { message: "No task found" };
    }
  };
}
