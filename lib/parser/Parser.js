const traverse = require('./utils/traverse');
const clean = require('./utils/clean');
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
    return new BEMTree(object);
  }

  _createBEMNode (node, parent) {
    if (!(node instanceof BEMTree) && typeof node === 'object') {
      return new BEMNode(clean(node), { parent });
    } else {
      return node;
    }
  }
}

module.exports = Parser;
