const TCPServer = require('./dataServers/tcpServer.js');

let server = null;

process.on('message', message => {
    if (message.type === 'start') {
        switch(message.config.serverType) {
            case 'tcp':
                server = new TCPServer(message.config);
                server.startServer();
                break;
            default:
                console.error('Invalid server type!');
        }
        // Support more server connections here
    } else if (message.type === 'stopServer') {
        server.stopServer();
    }
});