const plugin = (tree) => {
  const newTree = tree.walk(node => {
    ['content'].forEach(prop => {
      if (typeof node[prop] === 'string') {
        node[prop] = node[prop].toUpperCase();
      }
    });

    return node;
  });

  return newTree;
};

module.exports = plugin;
