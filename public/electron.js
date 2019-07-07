const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const globalShortcut = electron.globalShortcut
const Notification = electron.Notification

const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')

const os = require('os')

const Menu = require('electron').Menu

let mainWindow

const isWin = process.platform === 'win32'

const nativeImage = require('electron').nativeImage
let image = nativeImage.createFromPath(__dirname + '/electron-icon.png')
// where public folder on the root dir


function createMenu() {
    const application = {
        label: "Application",
        submenu: [
            {
                label: "About Application",
                selector: "orderFrontStandardAboutPanel:"
            },
            {
                type: "separator"
            },
            {
                label: "Quit",
                accelerator: "Command+Q",
                click: () => {
                    app.quit()
                }
            }
        ]
    }

    const edit = {
        label: "Edit",
        submenu: [
            {
                label: "Undo",
                accelerator: "CmdOrCtrl+Z",
                selector: "undo:"
            },
            {
                label: "Redo",
                accelerator: "Shift+CmdOrCtrl+Z",
                selector: "redo:"
            },
            {
                type: "separator"
            },
            {
                label: "Cut",
                accelerator: "CmdOrCtrl+X",
                selector: "cut:"
            },
            {
                label: "Copy",
                accelerator: "CmdOrCtrl+C",
                selector: "copy:"
            },
            {
                label: "Paste",
                accelerator: "CmdOrCtrl+V",
                selector: "paste:"
            },
            {
                label: "Select All",
                accelerator: "CmdOrCtrl+A",
                selector: "selectAll:"
            }
        ]
    }

    const template = [
        application,
        edit
    ]

    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

image.setTemplateImage(true)

function createWindow() {
    const globalSummon = globalShortcut.register('Super+Alt+s', () => {
        mainWindow.webContents.send('message', 'Awwwh yeeee')
        mainWindow.show()
    })
    if (!globalSummon) {
        console.info('Registration opening failed.')
    }

    if (isDev && isWin) {
        const devtools = globalShortcut.register('Ctrl+Shift+i', () => {
            mainWindow.openDevTools()
        })
        if (!devtools) {
            console.info('Dev tools not registered :(.')
        }
    }

    mainWindow = new BrowserWindow({
        icon: image,
        show: false
        // frame: false //could be cool to have custom ui?
    })

    mainWindow.maximize()
    mainWindow.show()

    // mainWindow.webContents.once('dom-ready', () => {
    //     for (let index = 1; index <= 3; index++) {
    //         let toggleTimer = globalShortcut.register(`Alt+${index}`, () => {
    //             mainWindow.webContents.send('toggle-timer', index)
    //         })
    //         if (!toggleTimer) {
    //             console.info('Registration toggle-timer failed.')
    //         }
    //     }
    // })

    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
    mainWindow.on('closed', () => (mainWindow = null))
    createMenu()
}

app.on('ready', async () => {
    if (isDev && isWin) {
        await BrowserWindow.addDevToolsExtension(
            path.join(
                os.homedir(),
                'AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.6.0_0'
            )
        )
        await BrowserWindow.addDevToolsExtension(
            path.join(
                os.homedir(),
                'AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0'
            )
        )
    }
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
