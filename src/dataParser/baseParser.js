class BaseParser {
    constructor() {
        if (this.constructor == BaseParser) {
            throw new Error('Abstract class cannot be instantiated.');
        }
    }

    parseData(data) {
        throw new Error('Method parseData() must be implemented.');
    }
}

module.exports = BaseParser;