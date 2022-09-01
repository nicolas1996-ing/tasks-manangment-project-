require("colors");
const { showMenu, paused } = require("./helpers/messages");
const {
  inquirerMenu,
  pauseInq,
  readInput,
  listTaskDelete,
  messageConfirmation,
  listTaskMarkedAsFinish,
} = require("./helpers/inquirer");
const { Task } = require("./models/task");
const { Tasks } = require("./models/tasks");
const { saveDb, readDb } = require("./database/saveFile");

console.clear();

const main = async () => {
  // opcion 1.
  let opt = "";

  // do {
  //   option = await showMenu();
  //   console.log(option);
  //   if(option !== '0') await paused();
  // } while (option !== "0");

  const tasks = new Tasks();
  const currentData = readDb();

  // persistencia de información
  if (currentData) {
    tasks.loadingTaskFromArray(currentData);
  }

  // opcion 2.
  do {
    opt = await inquirerMenu();
    console.log("\n");

    switch (opt) {
      case "1":
        // create tasks ...
        const description = await readInput("type description task: ");
        tasks.createTask(description);
        break;
      case "2":
        // show tasks ...
        tasks.listCompleted();
        break;
      case "3":
        tasks.listByCondition(true);
        break;
      case "4":
        tasks.listByCondition(false);
        break;
      case "5":
        const ids = await listTaskMarkedAsFinish(tasks.listArr);
        tasks.markTasksAsCompleted(ids);
        break;
      case "6":
        const id = await listTaskDelete(tasks.listArr);
        if (id === "0") break;
        const confirmation = await messageConfirmation(
          "¿Are you sure you want to remove this task?"
        );
        if (confirmation) {
          delete tasks._list[id];
          console.log("task has been removed succesful".red);
        }
        break;
    }

    // persistir información
    saveDb(tasks.listArr);

    if (opt !== "0") await pauseInq();
  } while (opt !== "0");
};

main();
