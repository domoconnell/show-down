const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
let controlWindow
let monitorWindow
let showWindow

function createWindows () {

  var MainDisplay = electron.screen.getPrimaryDisplay();
  controlWindow = new BrowserWindow({x:5, y:50, width: (MainDisplay.workAreaSize.width/3*2)-10, height: MainDisplay.workAreaSize.height-50})
  controlWindow.loadURL(`file://${__dirname}/index.html`)
//  controlWindow.webContents.openDevTools()
  controlWindow.on('closed', function () {
    controlWindow = null
  })

  monitorWindow = new BrowserWindow({x: (MainDisplay.workAreaSize.width/3*2)+20, y:50, width: (MainDisplay.workAreaSize.width/3)-30, height: MainDisplay.workAreaSize.height-50})
  monitorWindow.loadURL(`file://${__dirname}/index.html`)
 // monitorWindow.webContents.openDevTools()
  monitorWindow.on('closed', function () {
    monitorWindow = null
  })



  let displays = electron.screen.getAllDisplays()
  let externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })

  if (externalDisplay) {
    showWindow = new BrowserWindow({
      x: externalDisplay.bounds.x,
      y: externalDisplay.bounds.y,
      show: false
    })
    
    showWindow.loadURL('https://github.com');
    showWindow.once('ready-to-show', () => {
      showWindow.show()
      showWindow.setFullScreen(true);
    })
    controlWindow.on('closed', function () {
      controlWindow = null
    })
  }


}

app.on('ready', createWindows)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
