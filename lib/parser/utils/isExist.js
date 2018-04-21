const isExist = (target, prop) => {
  const props = [].concat(prop);

  return props.every(prop => (
    typeof target !== 'undefined' &&
    target !== null &&
    typeof target[prop] !== 'undefined'
  ));
};

module.exports = isExist;
