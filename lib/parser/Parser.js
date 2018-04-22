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
    return traverse(new BEMTree(this.input), this.normalize.bind(this));
  }

  normalize (node, parent) {
    if (node !== null && typeof node === 'object') {
      if (!(node instanceof BEMTree)) {
        node = new BEMNode(node, { parent });
      }

      if (!node.content) {
        delete node.content;
      }
    }

    if (node === undefined) {
      return null;
    }

    return node;
  };
}

module.exports = Parser;
