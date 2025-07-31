const { BrowserWindow, app, ipcMain } = require("electron")
const path = require("node:path")

const isDev = !app.isPackaged

const createWindow = async () => {
	const win = new BrowserWindow({
		width: 1440,
		height: 900,
		webPreferences: {
			preload: path.join(__dirname, "preload.cjs"),
			contextIsolation: true,
			nodeIntegration: false
		}
	})

	if (isDev) {
		await win.loadURL("http://localhost:5173")
	} else {
		win.loadFile(path.join(__dirname, "..", "dist", "index.html"))
	}
}

app.whenReady().then(() => {
	ipcMain.handle("ping", () => "pong")
	createWindow()

	// If all windows are closed on mac the app is still runing there fore we check when it is active to create a new window
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

// On windows and linux when all windows are closed the app should quit
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit()
})
