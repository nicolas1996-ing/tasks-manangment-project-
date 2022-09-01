const colors = require("colors");
const { Task } = require("./task");

class Tasks {
  _list = {};

  constructor() {
    this._list = {};
  }

  get listArr() {
    let listArr = [];
    const keysList = Object.keys(this._list); // llaves del objeto

    keysList.forEach((key) => {
      listArr.push(this._list[key]);
    });

    return listArr;
  }

  createTask(description = "") {
    const task = new Task(description);
    this._list[task.id] = task;
  }

  loadingTaskFromArray(tasks) {
    tasks.forEach((task) => (this._list[task.id] = task));
  }

  listCompleted() {
    this.printTaskWithColor(this.listArr);
  }

  listByCondition(completed = true) {
    const tasks = this.listArr.filter((task) =>
      completed ? task.completed : !task.completed
    );

    this.printTaskWithColor(tasks);
  }

  deleteTask(id) {
    // this._list : objeto de objetos de tasks
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  markTasksAsCompleted = (taskIds = []) => {
    taskIds.forEach((id) => {
      const task = this._list[id];
      if (!task.completed) {
        task.completed = new Date().toISOString();
      }
    });

    this.listArr.forEach((task) => {
      if (!taskIds.includes(task.id)) {
        this._list[task.id].completed = null;
      }
    });
  };

  printTaskWithColor = (tasks) => {
    tasks.forEach((task, i) => {
      console.log(
        `${colors.yellow(i + 1)}${".".yellow} ${task.description} :: ${
          task.completed !== null
            ? `${"completed".green} :: date => ${colors.yellow(task.completed)}`
            : "pending".red
        }`
      );
    });
    console.log("\n");
  };
}

module.exports = {
  Tasks,
};
