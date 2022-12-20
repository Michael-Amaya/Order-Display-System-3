class BaseServer {
    constructor(config) {
        if (this.constructor == BaseServer) {
            throw new Error('Abstract class cannot be instantiated.');
        }
    }

    startServer() {
        throw new Error('Method startServer() must be implemented.');
    }

    stopServer() {
        throw new Error('Method stopServer() must be implemented.');
    }
}

module.exports = BaseServer;