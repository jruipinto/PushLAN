import { app, BrowserWindow, Menu, ipcMain } from "electron";
import * as path from "path";
import { netAdapters } from './utils/net-adapters';
import { autoUpdater } from "electron-updater";

/* **********************************
   Web-server (feathersjs) initialize
************************************/
import appFeathers from '../../web-server/src/app';
import logger from '../../web-server/src/logger';

// Create a feathersjs web-server when
// renderer emits 'start-serving' event
ipcMain.on('start-serving', (event, folderToShare) => {

  const feathers = appFeathers(path.join(folderToShare));
  const port = feathers.get('port');
  const host = feathers.get('host');

  const server = feathers.listen(port);
  process.on('unhandledRejection', (reason, p) =>
    logger.error('Unhandled Rejection at: Promise ', p, reason)
  );

  server.on('listening', () =>
    logger.info('Feathers application started on http://%s:%d', host, port)
  );

  // return the available netAdapters (ip addresses) to renderer
  event.returnValue = {
    webServerStarted: true,
    netAdpaters: netAdapters()
  };
});
/* **********************************************/



function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "icon/icon.png"),
    webPreferences: {
      enableRemoteModule: true,
      devTools: false,
      nodeIntegration: true,
      preload: './preload.js'
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '..', '..', 'renderer/', 'index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  autoUpdater.checkForUpdatesAndNotify();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

Menu.setApplicationMenu(null);