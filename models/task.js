const { v4: uuidv4 } = require("uuid"); // generador automatica de uuid

class Task {
  id = "";
  description = "";
  completed = null;

  constructor(description) {
    this.id = uuidv4();
    this.description = description;
  }
}

module.exports = {
  Task,
};
