const isExist = (target, prop) => {
  const props = [].concat(prop);

  return (
    typeof target !== 'undefined' &&
    target !== null &&
    props.every(prop => typeof target[prop] !== 'undefined')
  );
};

module.exports = isExist;
