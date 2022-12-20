const {app, BrowserWindow} = require('electron');
const {fork} = require('child_process');
const fs = require('fs');

let server = null;

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    });
    // ^ add: fullscreen: true at the end for final testing

    win.loadFile('app/index.html');
    win.webContents.openDevTools();
    return win;
};

const getConfig = () => {
    const homeDir = app.getPath('userData');
    if (!fs.existsSync(`${homeDir}/config`)) {
        console.error('Configuration was not found! Exiting..');
        app.exit();
    }

    let config = require(`${homeDir}/config/config.json`);
    config.configDir = `${homeDir}/config`;
    console.log(config);
    return config;
};

const executeJS = (win, func, ...params) => {
    const nParams = params.join(', ');
    const toExecute = `${func}(${nParams});`;
    win.webContents.executeJavaScript(toExecute);
};

const processMessage = message => {
    switch(message.type) {
        case 'messageReceived':
            executeJS(win, 'al', `"${message.data}"`);
            break;
        case 'exitError':
            app.exit();
            break;
        default:
            console.error('Unknown command sent from server');
    }
};

app.whenReady().then(() => {
    const config = getConfig();
    win = createWindow();
    server = fork('./src/serverStart.js');
    server.send({type: 'start', config: config});

    // Load idle screen
    win.loadFile(`${config.configDir}/layout/html/layout-idle-nobs.html`);

    server.on('message', message => {
        processMessage(message);
    });
});

app.on('window-all-closed', () => {
    // Don't care if on MacOS. If the windows are closed, quit!
    if (server) {
        server.send({type: 'stopServer'});
    }

    app.quit();
});