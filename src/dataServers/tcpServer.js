const net = require('net');
const BaseServer = require('./baseServer.js');

class TCPServer extends BaseServer {
    constructor(config) {
        super(config);
        this.config = config;
        this.server = net.createServer(socket => {
            socket.on('data', data => {
                const translatedData = Buffer.from(data).toString().trim();
                process.send({type: 'messageReceived', data: translatedData});
            });
        });
        
        
        this.server.once('error', err => {
            console.error('There was an error: ' + err);
            if (this.server.listening) {
                this.server.close();
            }
        
            process.send({type: 'exitError'});
        });
    }

    startServer() {
        this.server.listen(this.config.serverPort);
    }

    stopServer() {
        if (this.server.listening) {
            this.server.close();
        }
    }
}

module.exports = TCPServer;