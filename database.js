const db = require("./custom_modules/electron-db/index.js");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const location = path.join(__dirname, "");

const createTodoTable = () => {
  db.createTable("todos", location, (succ, msg) => {
    if (succ) console.log(msg);
    else console.error("An error has occurred: " + msg);
  });
};

const getById = (_id) => {
  return new Promise((resolve, reject) => {
    db.search("todos", location, "id", _id, (succ, data) => {
      if (succ) {
        resolve(data);
      } else {
        reject(data);
        return;
      }
    });
  });
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    db.getAll("todos", location, (succ, data) => {
      if (succ) {
        resolve(data);
      } else {
        reject(data);
        return;
      }
    });
  });
};

const create = (description) => {
  let obj = {
    id: uuidv4(),
    description: description,
    completed: false,
    createdOn: new Date().toJSON(),
  };

  if (db.valid("todos", location)) {
    return new Promise((resolve, reject) => {
      db.insertTableContent("todos", location, obj, (succ, msg) => {
        if (succ) {
          resolve(obj);
          return;
        } else {
          reject(msg);
        }
      });
    });
  } else {
    console.error("Not valid!");
  }
};

const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    if (db.valid("todos", location)) {
      db.deleteRow("todos", location, id, (succ, msg) => {
        if (succ) {
          resolve(id);
          return;
        } else {
          reject(msg);
        }
      });
    } else {
      reject("Database file is invalid.");
    }
  });
};

const clearTodos = () => {
  getAll().then((data) => {
    if (data) {
      data.forEach((element) => {
        db.deleteRow("todos", location, { id: element.id }, (succ, msg) => {
          if (succ) console.log(msg);
        });
      });
    }
  });
};

exports.createTodoTable = createTodoTable;
exports.create = create;
exports.getAll = getAll;
exports.getById = getById;
exports.deleteById = deleteById;
exports.clearTodos = clearTodos;
