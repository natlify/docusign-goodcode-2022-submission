import dayjs from "dayjs";
class TimeyApiClient {
  async register(newUser) {
    const { firstName, lastName, username, email, password } = newUser;
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + `/user/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password,
          }),
        },
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(credentials) {
    const { email, password } = credentials;
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + `/user/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  async logout() {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + `/user/logout`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.json();
  }

  async fetchTasks(date) {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + `/user/tasks/${formattedDate}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.json();
  }

  async fetchAllTasks() {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "/user/tasks",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.json();
  }

  async fetchLeftoverTasks(dueDate) {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + `/user/tasks/until/${dueDate}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.json();
  }

  async postTask(task) {
    const { title, description, priority, status, dueDate, labels } = task;
    const formattedDate = dayjs(dueDate).format("YYYY-MM-DD");
    const response = await fetch(process.env.REACT_APP_SERVER_URL + "/task", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        priority,
        status,
        dueDate: formattedDate,
        labels,
      }),
    });
    return response.json();
  }

  async updateTask(task) {
    const { taskId, title, description, priority, status, dueDate, labels } =
      task;
    const formattedDate = dayjs(dueDate).format("YYYY-MM-DD");
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + `/task/${taskId}/changeTaskInfo`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          priority,
          status,
          dueDate: formattedDate,
          labels,
        }),
      },
    );
    return response.json();
  }

  async fetchDeleteTask(task) {
    const { taskId } = task;
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + `/task/${taskId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.json();
  }

  async postLabel(title) {
    const response = await fetch(process.env.REACT_APP_SERVER_URL + "/label", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    return response.json();
  }

  async getUser() {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "/user/userInfo",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    return data.userInfo;
  }
}

export default TimeyApiClient;
