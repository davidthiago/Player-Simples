const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  abrirArquivo: (callback) => ipcRenderer.on("abrir-arquivo", callback)
});
