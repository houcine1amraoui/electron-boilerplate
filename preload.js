const { contextBridge, ipcRenderer } = require("electron");

const api = {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  baseBoard: () => ipcRenderer.invoke("baseBoard"),
};

contextBridge.exposeInMainWorld("api", api);
