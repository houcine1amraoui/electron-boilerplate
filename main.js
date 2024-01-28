const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const si = require("systeminformation");
const createWindows = () => {
  const mainWin = new BrowserWindow({
    width: 500,
    height: 350,
    autoHideMenuBar: false,
    frame: true,
    webPreferences: {
      //   nodeIntegration: false,
      //   contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWin.loadFile("./index.html");
};

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "node_modules", ".bin", "electron"),
});

app.whenReady().then(() => {
  ipcMain.handle("baseBoard", () => si.baseboard());
  createWindows();
});
