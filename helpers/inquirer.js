const inquirer = require("inquirer");
const colors = require("colors");
require("colors");

const questions = [
  {
    type: "list", // define by inquirer
    name: "opcion", // return
    message: "¿What do you like to do?\n",
    choices: [
      {
        value: "1",
        name: `${"1.".green}  Create task`,
      },
      {
        value: "2",
        name: `${"2.".green}  Show tasks`,
      },
      {
        value: "3",
        name: `${"3.".green}  Show tasks completed`,
      },
      {
        value: "4",
        name: `${"4.".green}  show tasks pending`,
      },
      {
        value: "5",
        name: `${"5.".green}  mark as complete some tasks`,
      },
      {
        value: "6",
        name: `${"6.".green}  Delete task`,
      },
      {
        value: "0",
        name: `${"0.".green}  Exit`,
      },
    ],
  },
];

const listTaskDeleteOptions = (tasks = []) => {
  let choices = [];
  tasks.forEach((task, i) => {
    choices.push({
      value: task.id,
      name: `${colors.green(i + 1 + ".")}${task.description}`,
    });
  });

  const tasksList = {
    type: "list", // define by inquirer
    name: "taskId", // return
    message: "Select task to delete ... \n",
    choices: [{ value: "0", name: `${colors.green("0.")} cancel` }, ...choices],
  };

  return tasksList;
};

const listTaskToMarkedAsCompleted = (tasks = []) => {
  let choices = [];
  tasks.forEach((task, i) => {
    choices.push({
      value: task.id,
      name: `${colors.green(i + 1 + ".")}${task.description}`,
      checked: task.completed === null ? false : true,
    });
  });

  const tasksList = {
    type: "checkbox", // define by inquirer
    name: "ids", // return
    message: "Select tasks to delete ... \n",
    choices,
  };

  return tasksList;
};

const listTaskMarkedAsFinish = async (tasks = []) => {
  menuDecription();
  const { ids } = await inquirer.prompt(listTaskToMarkedAsCompleted(tasks));
  return ids;
};

const listTaskDelete = async (tasks = []) => {
  menuDecription();
  const { taskId } = await inquirer.prompt(listTaskDeleteOptions(tasks));
  return taskId;
};

const inquirerMenu = async () => {
  menuDecription();
  const { opcion } = await inquirer.prompt(questions);
  return opcion; // retorna el value asociado al choice
};

const pauseInq = async () => {
  await inquirer.prompt([
    {
      type: "input",
      name: "enter",
      message: `Push ${"ENTER".green} to continued `,
    },
  ]);
};

const messageConfirmation = async (message) => {
  const question = {
    type: "confirm",
    name: "confirmation",
    message,
  };

  const { confirmation } = await inquirer.prompt(question);
  return confirmation;
};

const readInput = async (message) => {
  const question = {
    type: "input",
    name: "desc",
    message,
    validate(value) {
      // validación para evitar inputs nulos
      if (value.length === 0) return "Please type a value valid";
      return true;
    },
  };

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const menuDecription = () => {
  console.clear();
  console.log("===============================".green);
  console.log("       select an option".white);
  console.log("=============================== \n".green);
};

module.exports = {
  inquirerMenu,
  pauseInq,
  readInput,
  listTaskDelete,
  messageConfirmation,
  listTaskMarkedAsFinish,
};
