const traverse = require('./utils/traverse');
const compare = require('./utils/compare');

class BEMTree {
  constructor (object, props) {
    this._object = object;

    Object.assign(this, this.normalize(props, object));
  }

  normalize (props, object) {
    const normalizedProps = {
      content: [].concat(object)
    };

    return Object.assign({}, props, normalizedProps);
  }

  match (expression, cb) {
    const exps = [].concat(expression);
    const matcher = (node) => {
      if (exps.some(exp => compare(exp, node))) {
        return cb(node);
      } else {
        return node;
      }
    };

    return traverse(this, matcher);
  }

  walk (cb) {
    return traverse(this, cb);
  }

  toObject () {
    return this._object;
  }
}

module.exports = BEMTree;
