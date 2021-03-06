const path = require('path'),
  electron = require('electron'),
  TimerTray = require('./app/timer_tray'),
  MainWindow = require('./app/main_window');
const { app, ipcMain } = electron;

let mainWindow, tray;

app.once('ready', () => {
  mainWindow = new MainWindow(
    {
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        backgroundThrottling: false
      },
      height: 500,
      width: 300,
      frame: false,
      resizable: false,
      show: false,
      skipTaskbar: true
    },
    `file://${__dirname}/src/index.html`
  );

  const iconName =
    process.platform === 'win32' || process.platform === 'linux'
      ? 'windows-icon.png'
      : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`); // joins paths depending on the operating system
  tray = new TimerTray(iconPath, mainWindow);
});

ipcMain.on('update-timer', (e, timeLeft) => {
  tray.setTitle(timeLeft);
});
