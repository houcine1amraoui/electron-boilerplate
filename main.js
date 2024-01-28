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
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWin.loadFile("./index.html");
};

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "node_modules", ".bin", "electron"),
});

const fetchDevice = async (deviceId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/devices/?id=${deviceId}`
    );
    return response.data;
  } catch (error) {}
};

const fetchMainServicesList = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/services/mains/list"
    );
    return response.data;
  } catch (error) {}
};

const fetchSubServicesList = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/services/subs/list"
    );
    return response.data;
  } catch (error) {}
};

app.whenReady().then(() => {
  ipcMain.handle("baseBoard", () => si.baseboard());
  ipcMain.handle("cpu", () => si.cpu());
  ipcMain.handle("memory", () => si.mem());
  ipcMain.handle("fetchDevice", (_, deviceId) => fetchDevice(deviceId));
  ipcMain.handle("fetchMainServicesList", () => fetchMainServicesList());
  ipcMain.handle("fetchSubServicesList", () => fetchSubServicesList());
  createWindows();
});
