
import { app, BrowserWindow, Menu, dialog } from 'electron';
import _ from 'lodash';

// Create main window with React UI
const createWindow = (url, options) => {
  options = _.assign(
    {
      width: 1280,
      height: 900,
      backgroundColor: '#363951'
    },
    options
  );
  const win = new BrowserWindow(options);

  win.loadURL(url);

  win.on('closed', () => {
    win.destroy();
  });

  return win;
};

app.on('ready', () => {

  createWindow(global.config.uiUrl);
  // createWindow('http://localhost:5000/ui/');
});
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit();
});

app.on('will-quit', () => {
  l.notice('Shutting down...');
});
