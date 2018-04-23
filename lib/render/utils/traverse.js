const traverse = (target, cb, parentNode) => {
  if (target instanceof Array) {
    target = target.map(node => traverse(node, cb, parentNode));
  } else {
    const newTarget = cb(target, parentNode);

    target = typeof newTarget !== 'undefined' ? newTarget : target;

    if (
      target !== null &&
      typeof target === 'object' &&
      typeof target.content !== 'undefined'
    ) {
      target.content = traverse(target.content, cb, target);
    }
  }

  return target;
};

module.exports = traverse;
