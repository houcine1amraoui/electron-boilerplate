const { contextBridge, ipcRenderer } = require("electron");

const api = {
  si: () => ipcRenderer.invoke("si"),
  cpu: () => ipcRenderer.invoke("cpu"),
  memory: () => ipcRenderer.invoke("memory"),
  diskLayout: () => ipcRenderer.invoke("diskLayout"),
  osInfo: () => ipcRenderer.invoke("osInfo"),
  fetchDevice: (deviceId) => ipcRenderer.invoke("fetchDevice", deviceId),
  fetchMainServicesList: () => ipcRenderer.invoke("fetchMainServicesList"),
  fetchSubServicesList: () => ipcRenderer.invoke("fetchSubServicesList"),
  createDevice: (device) => ipcRenderer.invoke("createDevice", device),
};

contextBridge.exposeInMainWorld("api", api);
