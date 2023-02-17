import { app, BrowserWindow } from 'electron';
import windowWrapper from './windowWrapper';
import environment from "./environment";

import { enforceSingleInstance, restoreFirstInstance } from './features/singleInstance';
import setupTrayIcon from './features/trayIcon';
import keepWindowState from './features/windowState';
import closeToTray from './features/closeToTray';
import runAtLogin from './features/rutAtLogin'
import enableContextMenu from './features/contextMenu';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null = null;
let trayIcon = null;

if (enforceSingleInstance()) {
  app.whenReady()
    .then(() => {
      mainWindow = windowWrapper(environment.appUrl);
      trayIcon = setupTrayIcon(mainWindow);
      keepWindowState(mainWindow);
      runAtLogin(mainWindow);
      closeToTray(mainWindow);
      enableContextMenu();
    })
}

app.setAppUserModelId('com.electron.google-chat');

app.on('window-all-closed', () => {
  app.exit();
});

app.on('activate', () => {
  if (mainWindow) {
    mainWindow.show();
  }
});
