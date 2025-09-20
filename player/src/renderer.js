const { ipcRenderer } = require("electron");

ipcRenderer.on("abrir-arquivo", (event, filePath) => {
  const video = document.getElementById("video");
  if (video) {
    video.src = filePath;
    video.play();
  } else {
    console.error("Elemento <video> não encontrado!");
  }
});
