const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut  = electron.globalShortcut ;
const Notification  = electron.Notification;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;


const nativeImage = require('electron').nativeImage;
let image = nativeImage.createFromPath(__dirname + '/electron-icon.png'); 
 // where public folder on the root dir

image.setTemplateImage(true);

function createWindow() {


  const globalSummon = globalShortcut.register('Super+Alt+s', () => {
    mainWindow.webContents.send('message', 'Awwwh yeeee')
    mainWindow.show();
  });
  if (!globalSummon) { console.log('Registration opening failed.'); }

  mainWindow = new BrowserWindow({
    icon: image,
    width: 520, 
    height: 720, 
    // frame: false //could be cool to have custom ui?
  });
  
  mainWindow.webContents.once('dom-ready', () => {
    for (let index = 1; index <= 3; index++) {
      let toggleTimer = globalShortcut.register(`Alt+f${index}`, () => {
        mainWindow.webContents.send('toggle-timer', index)
      });
      if (!toggleTimer) { console.log('Registration toggle-timer failed.'); }
    }
  })



  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);


  
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});