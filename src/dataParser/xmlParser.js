const BaseParser = require('./baseParser.js');
const {XMLParser} = require('fast-xml-parser')

class XMLmParser extends BaseParser {
    constructor() {
        super();
        this.parser = new XMLParser();
    }

    parseData(data) {
        return this.parser.parse(data);
    }
}

module.exports = XMLmParser;