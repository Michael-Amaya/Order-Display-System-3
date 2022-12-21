const {app, BrowserWindow} = require('electron');
const {fork} = require('child_process');
const fs = require('fs');
const XMLmParser = require('./dataParser/xmlParser.js');

// Globals
let server = null;
let parser = null;
let config = null;
let external = null;
let win = null;

let appStates = {
    Idle: 0,
    Order: 1,
    Total: 2
};

let currentState = appStates.Idle;

// Util functions
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

    config = require(`${homeDir}/config/config.json`);
    config.configDir = `${homeDir}/config`;
    external = require(`${homeDir}/config/external.json`);
};

const getDataParser = parserCode => {
    switch(parserCode) {
        case 'xml':
            return new XMLmParser();
        default:
            console.error('Unknown Parser from config');
    }

    return null;
}

// App logic functions

const executeJS = (win, func, ...params) => {
    const nParams = params.join(', ');
    const toExecute = `${func}(${nParams});`;
    win.webContents.executeJavaScript(toExecute);
};

const processMessage = message => {
    switch(message.type) {
        case 'messageReceived':
            appLogic(message.data);
            break;
        case 'exitError':
            app.exit();
            break;
        default:
            console.error('Unknown command sent from server');
    }
};

const appLogic = data => {
    let parsedData = parser.parseData(data);
    if (parsedData.POSOrder.OrderHeader.OrderState === 'Open') {
        // Open order, containing order data
        loadOrderScreen(parsedData);
    } else {
        // Totals Screen -- It will say 'Totaled' instead of 'Open'
        loadTotalsScreen(parsedData);
    }
}

const loadIdleScreen = () => {
    win.loadFile(`${config.configDir}/layout/html/layout-idle-nobs.html`);
    win.once('ready-to-show', () => {
        loadIdleSetting();
    });
}

const loadOrderScreen = parsedData => {
    win.loadFile(`${config.configDir}/layout/html/layout-order-nobs.html`);
    currentState = appStates.Order;

    // Populate order details, totals, and specific page settings
    win.once('ready-to-show', () => {
        loadOrderSettings();
        
        if (Array.isArray(parsedData.POSOrder.OrderDetail.Item)) {
            parsedData.POSOrder.OrderDetail.Item.forEach(each => {
                // Show the order
                const orderArguments = [win, 'addToOrder', `'${each.Quantity}'`, `'${each.Name}'`, `'${each.Price}'`];
                if (each.hasOwnProperty('Condiments') && each.Condiments !== '') {
                    if (Array.isArray(each.Condiments.Description)) {
                        each.Condiments.Description.forEach(condiment => {
                            orderArguments.push(`'${condiment}'`);
                        });
                    } else {
                        orderArguments.push(`'${each.Condiments.Description}'`);
                    }
                }
                executeJS.apply(null, orderArguments);
            });
        } else {
            const onlyItem = parsedData.POSOrder.OrderDetail.Item;
            const orderArguments = [win, 'addToOrder', `'${onlyItem.Quantity}'`, `'${onlyItem.Name}'`, `'${onlyItem.Price}'`]
            if (onlyItem.hasOwnProperty('Condiments') && onlyItem.Condiments !== '') {
                if (Array.isArray(onlyItem.Condiments.Description)) {
                    onlyItem.Condiments.Description.forEach(condiment => {
                        orderArguments.push(`'${condiment}'`);
                    });
                } else {
                    orderArguments.push(`'${onlyItem.Condiments.Description}'`);
                }
            }
            executeJS.apply(null, orderArguments);
        }

        // Adjust totals setSubTotal setTax setTotal
        executeJS(win, 'setSubTotal', `'${parsedData.POSOrder.OrderHeader.Subtotal}'`);
        executeJS(win, 'setTax', `'${parsedData.POSOrder.OrderHeader.Tax}'`);
        executeJS(win, 'setTotal', `'${parsedData.POSOrder.OrderHeader.Total}'`);
    });
}

const loadTotalsScreen = parsedData => {
    win.loadFile(`${config.configDir}/layout/html/layout-total-nobs.html`);
    currentState = appStates.Total;
    win.once('ready-to-show', () => {
        loadTotalSettings();
        executeJS(win, 'setSubTotal', `'${parsedData.POSOrder.OrderHeader.Subtotal}'`);
        executeJS(win, 'setTax', `'${parsedData.POSOrder.OrderHeader.Tax}'`);
        executeJS(win, 'setTotal', `'${parsedData.POSOrder.OrderHeader.Total}'`);
        setTimeout(loadIdleScreen, config.totalsDelayTime * 1000); // In seconds
    });
}

const loadIdleSetting = () => {
    executeJS(win, 'setSlideTime', `${config.slideshowDelayTime}`);
    external.slideshowImages.forEach(each => {
        executeJS(win, 'addImage', `'${each}'`);
    });
};

const loadOrderSettings = () => {
    // Load settings from configs and external config
    executeJS(win, 'updateOrderFontSize', `'${config.orderFontSize}'`);
    executeJS(win, 'updateTotalsFontSize', `'${config.totalsFontSize}'`);
    executeJS(win, 'updateDescriptionFontSize', `'${config.descriptionFontSize}'`);
};

const loadTotalSettings = () => {
    // There are no settings currently..
}

// Global events

// App starting point
app.whenReady().then(() => {
    // Set globals
    getConfig();
    win = createWindow();
    parser = getDataParser(config.dataFormat);

    // Start server
    server = fork('./src/serverStart.js');
    server.send({type: 'start', config: config});

    loadIdleScreen();

    // Set up server listener to get orders
    server.on('message', message => {
        processMessage(message);
    });
});

app.on('window-all-closed', () => {
    // Stop the server if window is closed, before quitting the app
    if (server) {
        server.send({type: 'stopServer'});
    }

    app.quit();
});