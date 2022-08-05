import pool from "../db/setup.js";

export default class labelController {
  static createLabel = async (req) => {
    await pool.query(`INSERT INTO labels (title, user_id) VALUES ($1, $2);`, [
      req.body.title,
      req.session.userId,
    ]);
    return { message: "Label created" };
  };

  static createTaskLabelRelation = async (req) => {
    for (const label of req.body.labelId) {
      await pool.query(
        `INSERT INTO tasks_labels_relation (task_id, label_id) VALUES ($1, $2);`,
        [req.body.taskId, label],
      );
    }
    return {
      message: `Task with ID: ${req.body.taskId} is now labeled by label with ID: ${req.body.labelId}`,
    };
  };

  static deleteLabel = async (req) => {
    const outcome = await pool.query(
      `DELETE FROM labels WHERE label_id=$1 AND user_id=$2;`,
      [req.params.labelId, req.session.userId],
    );
    if (outcome.rowCount === 1) {
      await pool.query(`DELETE FROM tasks_labels_relation WHERE label_id=$1;`, [
        req.params.labelId,
      ]);
      return { message: "Label Deleted" };
    } else {
      return { message: "No label with that ID" };
    }
  };
}
