const LazyResult = require('./LazyResult');

class Processor {
  constructor (plugins = []) {
    this.plugins = this.normalize(plugins);
  }

  use (plugin) {
    this.plugins = this.plugins.concat(this.normalize([plugin]));

    return this;
  }

  process (input, options = {}) {
    return new LazyResult(this, input, options);
  }

  normalize (plugins) {
    let normalized = [];

    for (let plugin of plugins) {
      if (plugin.postbem) plugin = plugin.postbem;

      if (typeof plugin === 'object' && Array.isArray(plugin.plugins)) {
        normalized = normalized.concat(plugin.plugins);
      } else if (typeof plugin === 'function') {
        normalized.push(plugin);
      } else {
        throw new Error(`[postbem] ${plugin} is not a PostBEM plugin.`);
      }
    }

    return normalized;
  }
}

module.exports = Processor;
