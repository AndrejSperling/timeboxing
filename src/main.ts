import { app, nativeImage, BrowserWindow, ipcMain, screen, Tray } from "electron";
import * as path from "path";

const assetsDirectory = path.join(__dirname, "../assets");

let tray: Tray;
let mainWindow: Electron.BrowserWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true },
    frame: false,
    height: 600,
    movable: false,
    resizable: false,
    show: true,
    skipTaskbar: true,
    width: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createTray();
  createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

const createTray = () => {

  const iconPath = path.join(assetsDirectory, "icTrayWhiteTemplate.ico");

  tray = new Tray(iconPath);
  tray.on("right-click", toggleWindow);
  tray.on("double-click", toggleWindow);
  tray.on("click", (event) => {
    toggleWindow();

    // Show devtools when command clicked
    if (mainWindow.isVisible() && process.defaultApp && event.metaKey) {
      mainWindow.webContents.openDevTools({mode: "detach"});
    }
  });
};

const getWindowPosition = () => {

  const offset = 10;

  const windowBounds = mainWindow.getBounds();
  const trayBounds = tray.getBounds();

  const screenW = screen.getPrimaryDisplay().bounds.width;
  const x = Math.round(screenW - windowBounds.width - offset);
  const y = Math.round(trayBounds.y - windowBounds.height - offset);

  return {x, y};

};

const toggleWindow = () => {
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    showWindow();
  }
};

const showWindow = () => {
  const position = getWindowPosition();
  mainWindow.setPosition(position.x, position.y, false);
  mainWindow.show();
  mainWindow.focus();
};

ipcMain.on("show-window", () => {
  showWindow();
});

ipcMain.on("weather-updated", (event: any, weather: any) => {
  // Show "feels like" temperature in tray
  tray.setTitle("06:25");

  // Show summary and last refresh time as hover tooltip
  const time = new Date(weather.currently.time).toLocaleTimeString();
  tray.setToolTip("TOOLTIP");

  // Update icon for different weather types

});
