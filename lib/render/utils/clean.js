const clean = (node) => {
  if (typeof node.content !== 'undefined') {
    if (node.content instanceof Array) {
      node.content = node.content.filter(node => (
        node !== null &&
        node !== undefined
      ));
    }

    if (!node.content || node.content.length === 0) {
      delete node.content;
    }
  }

  return node;
};

module.exports = clean;
