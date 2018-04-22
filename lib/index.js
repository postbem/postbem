const Processor = require('./processor/Processor');

function postbem (...plugins) {
  if (plugins.length === 1 && plugins[0] instanceof Array) {
    plugins = plugins[0];
  }

  return new Processor(plugins);
}

module.exports = postbem;
