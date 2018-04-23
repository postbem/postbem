const compare = (expected, target) => {
  if (expected instanceof RegExp && typeof target === 'string') {
    return expected.test(target);
  } else if (typeof expected !== typeof target || expected === null) {
    return expected === target;
  } else if (expected instanceof Array) {
    return expected.every(exp =>
      target.some(node => compare(exp, node))
    );
  } else if (expected instanceof Object) {
    return Object.keys(expected).every(key =>
      compare(expected[key], target[key])
    );
  } else {
    return expected === target;
  }
};

module.exports = compare;
