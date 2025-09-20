const { app, BrowserWindow, Menu, dialog } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    mainWindow.loadFile(path.join(__dirname, "src", "index.html"));

    const template = [
        {
            label: "Arquivo",
            submenu: [
                {
                    label: "Abrir Mídia",
                    click: async () => {
                        const result = await dialog.showOpenDialog(mainWindow, {
                            filters: [
                                { name: "Vídeos", extensions: ["mp4", "avi", "mkv"] },
                            ],
                            properties: ["openFile"],
                        });
                        console.log(result.filePaths);
                    },
                },
            ],
        },
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
