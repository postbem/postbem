const isPromise = (object) => {
  return (
    typeof object === 'object' &&
    typeof object.then === 'function'
  );
};

module.exports = isPromise;
