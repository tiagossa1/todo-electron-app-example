const {
  app,
  BrowserWindow,
  Menu,
} = require("electron");
const {
  createTodoTable,
  clearTodos,
} = require("./database");

// try {
//   require("electron-reloader")(module);
// } catch {}

function createWindow() {
  const mainWindow = new BrowserWindow({
    title: "Todo App - Made in Electron",
    show: false,
    webPreferences: {
      defaultEncoding: "UTF-8",
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

  mainWindow.loadFile("index.html");

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
}

const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Show Dev Tools",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        label: "Clear todos",
        click() {
          clearTodos();
        },
      },
      {
        label: "Quit",
        click() {
          app.quit();
        },
      },
    ],
  },
];

app.whenReady().then(() => {
  createTodoTable();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
