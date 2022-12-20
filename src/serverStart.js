const TCPServer = require('./dataServers/tcpServer.js');

let server = null;

process.on('message', message => {
    if (message.type === 'start') {
        if (message.config.serverType === 'tcp') {
            server = new TCPServer(message.config);
            server.startServer();
        }
        // Support more server connections here
    } else if (message.type === 'stopServer') {
        server.stopServer();
    }
});