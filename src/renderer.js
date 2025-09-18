const video = document.getElementById("player");

window.electronAPI.abrirArquivo((_event, filePath) => {
  video.src = filePath;
  video.play();
});
