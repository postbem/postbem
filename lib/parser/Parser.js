const traverse = require('./utils/traverse');
const BEMTree = require('./BEMTree');
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
    return traverse(this._createBEMTree(this.input), this._createBEMNode);
  }

  _createBEMTree (object) {
    return new BEMTree({ content: [].concat(object) });
  }

  _createBEMNode (object, parent) {
    if (!(object instanceof BEMTree) && typeof object === 'object') {
      return new BEMNode(object, { parent });
    } else {
      return object;
    }
  }
}

module.exports = Parser;
