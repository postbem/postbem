const traverse = require('./utils/traverse');

class Renderer {
  constructor (input, options = {}) {
    this.input = input;

    const defaultOptions = {
      outputClass: Object
    };

    this.options = Object.assign(defaultOptions, options);
  }

  render () {
    const tree = traverse(this.input, this.renderNode.bind(this));
    const result = tree.content.length === 1 ? tree.content[0] : tree.content;

    return result;
  }

  renderNode (node) {
    node = this.normalize(node);

    if (node !== null && typeof node === 'object') {
      if (typeof node.render === 'function') {
        const output = node.render();

        if (output instanceof this.options.outputClass) {
          return output;
        }
      }

      return Object.assign({}, node);
    } else {
      return node;
    }
  }

  normalize (node) {
    if (typeof node === 'object' && node !== null) {
      if (!node.content) {
        delete node.content;
      }

      delete node.parent;
    }

    if (node === undefined) {
      return null;
    }

    return node;
  };
}

module.exports = Renderer;
