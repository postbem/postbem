const BEMTree = require('./BEMTree');
const isExist = require('./utils/isExist');
const isTagVoidElement = require('./utils/isTagVoidElement');

class BEMNode extends BEMTree {
  constructor (object, props) {
    super();

    Object.assign(this, this.normalize(props, object));
  }

  normalize (...args) {
    const target = Object.assign({}, ...args);
    const defaultProps = {
      block: undefined,
      // elem: undefined,
      // def: undefined,
      tag: 'div',
      single: false,
      // attrs: undefined,
      // render: undefined,
      // content: undefined,
      // mix: undefined,
      // mods: undefined,
      // elemMods: undefined,
      // js: undefined,
      // bem: undefined,
      // cls: undefined,
      // parent: undefined,
      options: {}
    };
    const normalizeProps = {
      block: isExist(target, ['elem', 'parent']) ? target.parent.block : undefined,
      single: isTagVoidElement(target.tag)
    };

    return Object.assign(defaultProps, normalizeProps, target);
  }
}

module.exports = BEMNode;
