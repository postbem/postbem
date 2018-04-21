const BEMTree = require('./BEMTree');
const isExist = require('./utils/isExist');

class BEMNode extends BEMTree {
  constructor (object, props) {
    const target = Object.assign({}, props, object);
    const defaultProps = {
      block: isExist(target, ['elem', 'parent']) ? target.parent.block : undefined,
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

    super(target, defaultProps);
  }
}

module.exports = BEMNode;
