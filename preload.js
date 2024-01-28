const { contextBridge, ipcRenderer } = require("electron");

const api = {
  baseBoard: () => ipcRenderer.invoke("baseBoard"),
  cpu: () => ipcRenderer.invoke("cpu"),
  memory: () => ipcRenderer.invoke("memory"),
  fetchDevice: (deviceId) => ipcRenderer.invoke("fetchDevice", deviceId),
  fetchMainServicesList: () => ipcRenderer.invoke("fetchMainServicesList"),
  fetchSubServicesList: () => ipcRenderer.invoke("fetchSubServicesList"),
};

contextBridge.exposeInMainWorld("api", api);
