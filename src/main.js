const { app, BrowserWindow, Menu, dialog } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  mainWindow.loadFile("index.html");

  const template = [
    {
      label: "Arquivo",
      submenu: [
        {
          label: "Abrir Mídia",
          click: async () => {
            const result = await dialog.showOpenDialog(mainWindow, {
              filters: [
                { name: "Mídia", extensions: ["mp4", "mp3", "webm", "ogg"] }
              ],
              properties: ["openFile"]
            });
            if (!result.canceled && result.filePaths.length > 0) {
              mainWindow.webContents.send("abrir-arquivo", result.filePaths[0]);
            }
          }
        },
        { role: "quit" }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
