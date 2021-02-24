const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require("fs")


var win = null

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile("./index.html") } 

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.handle('startup', (event, args) => {
    console.log("Hello from linuckboard team!")
    var tracks = fs.readdirSync("./tracks")
    win.webContents.send("load", tracks)
})

ipcMain.handle("play", (event, args) => {
  console.log(args)
})