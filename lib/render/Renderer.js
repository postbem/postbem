const traverse = require('./utils/traverse');
const clean = require('./utils/clean');

class Renderer {
  constructor (input) {
    this.input = input;
  }

  render () {
    return traverse(this.input, this._toObject);
  }

  _toObject (node, parent) {
    node = clean(node);

    if (typeof node.toObject !== 'undefined') {
      return node.toObject();
    } else {
      return node;
    }
  }
}

module.exports = Renderer;
