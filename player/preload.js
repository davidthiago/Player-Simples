const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ipcRenderer", {
  invoke: (canal, args) => ipcRenderer.invoke(canal, args),
});
