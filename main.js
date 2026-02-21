const { app, BrowserWindow, ipcMain } = require('electron/main')
const { updateElectronApp } = require('update-electron-app')
const path = require('node:path')

// 自动检查并应用 GitHub Releases 中的新版本
updateElectronApp()

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('index.html')
}
app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow()
})
