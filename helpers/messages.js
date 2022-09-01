require("colors");

const showMenu = () => {
  return new Promise((res, rej) => {
    console.clear();
    console.log("===============================".green);
    console.log("select an option ...".green);
    console.log("=============================== \n".green);

    console.log(`${"1.".green}  Create task`);
    console.log(`${"2.".green}  Show tasks`);
    console.log(`${"3.".green}  Show tasks completed`);
    console.log(`${"4.".green}  show tasks pending`);
    console.log(`${"5.".green}  Complete task(s`);
    console.log(`${"6.".green}  Delete task`);
    console.log(`${"0.".green}  Exit`);


    // usuario ingrese datos por consola
    // config input by user
    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question("select an option: ", (option) => {
      readLine.close();
      res(option); // se resuelve la promesa con esto
    });
  });
};

const paused = () => {
  return new Promise((res, rej) => {
    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question(`\n Push ${"ENTER".green} to continued `, (option) => {
      readLine.close(); // esperar que una tecla sea presionada 
      res(); // resolver la promesa
    });
  });
};

module.exports = {
  showMenu,
  paused,
};
