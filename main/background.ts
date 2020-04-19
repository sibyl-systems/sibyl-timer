import { app, BrowserWindow } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import path from 'path'
import os from 'os'

const isProd = process.env.NODE_ENV === 'production'

const { ipcMain, powerMonitor } = require('electron')

if (isProd) {
    serve({ directory: 'app' })
} else {
    app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
    await app.whenReady()

    await BrowserWindow.addDevToolsExtension(
        path.join(os.homedir(), 'AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0')
    )

    const mainWindow = createWindow('main', {
        width: 1000,
        height: 600
    })

    ipcMain.once('app-mounted', function(event, args) {
        powerMonitor.once('suspend', () => {
            event.sender.send('system-suspended', args)
        })
        powerMonitor.once('shutdown', () => {
            event.sender.send('system-shutdown', args)
        })
        powerMonitor.once('resume', () => {
            event.sender.send('system-resume', args)
        })
    })

    if (isProd) {
        await mainWindow.loadURL('app://./home.html')
    } else {
        const port = process.argv[2]
        await mainWindow.loadURL(`http://localhost:${port}/home`)
        mainWindow.webContents.openDevTools()
    }
})()

app.on('window-all-closed', () => {
    app.quit()
})
