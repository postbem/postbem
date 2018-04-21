const traverse = require('./utils/traverse');
const BEMNode = require('./BEMNode');

class Parser {
  constructor (input) {
    if (typeof input === 'string') {
      this.input = JSON.parse(input);
    } else if (typeof input === 'object') {
      this.input = input;
    } else {
      throw new Error('[postbem]: The input must be either a string or an object.');
    }
  }

  parse () {
    return traverse(this.input, this._createBEMNode);
  }

  _createBEMNode (object, parent) {
    if (typeof object === 'object') {
      return new BEMNode(object, { parent });
    } else {
      return object;
    }
  }
}

module.exports = Parser;
