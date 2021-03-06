const electron = require('electron');
const { Tray, app, Menu } = electron;

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.mainWindow = mainWindow;

    this.setToolTip('Tasky');
    this.on('click', this.onClick);
    this.on('right-click', this.onRightClick);
  }

  onClick = (e, bounds) => {
    const { x, y } = bounds; // click event bounds
    const { height, width } = this.mainWindow.getBounds(); // WIndow height and width

    this.mainWindow.getBounds();
    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      const yPosition =
          process.platform === 'win32'
            ? y - height
            : process.platform === 'linux'
            ? y + 30
            : y,
        xPosition =
          process.platform === 'linux' ? x + width * 5.4 : x - width / 2;

      this.mainWindow.setBounds({
        x: xPosition,
        y: yPosition,
        height,
        width
      });
      this.mainWindow.show();
    }
  };

  onRightClick = () => {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => app.quit()
      }
    ]);

    this.popUpContextMenu(menuConfig);
  };
}

module.exports = TimerTray;
