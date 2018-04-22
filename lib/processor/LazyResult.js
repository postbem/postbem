const isPromise = require('./utils/isPromise');
const parser = require('../parser');
const render = require('../render');

class LazyResult {
  constructor (processor, input, options) {
    this.processor = processor;
    this.messages = [];
    this.options = options;
    this.parser = parser;
    this.render = render;

    if (options.parser) this.parser = options.parser;
    if (options.render) this.render = options.render;

    if (options.skipParse) {
      this.tree = input;
    } else {
      try {
        this.tree = this.parser(input, options);
      } catch (error) {
        this.error = error;
      }
    }

    if (options.sync) {
      return this.sync();
    } else {
      return this.async();
    }
  }

  sync () {
    for (let plugin of this.processor.plugins) {
      if (this.error) throw this.error;

      const result = this.run(plugin);

      if (isPromise(result)) {
        throw new Error('[postbem] Use process(input).then(cb) to work with async plugins');
      } else {
        this.tree = result;
      }
    }

    return this;
  }

  async () {
    return new Promise((resolve, reject) => {
      this.promise = Promise.resolve(this.tree);

      for (let plugin of this.processor.plugins) {
        if (this.error) return reject(this.error);

        this.promise = this.promise.then(tree => {
          this.tree = tree;

          return this.run(plugin);
        });
      }

      this.promise.then(tree => {
        this.tree = tree;

        resolve(this);
      });
    });
  }

  run (plugin) {
    try {
      return plugin(this.tree);
    } catch (error) {
      this.error = error;
    }
  }

  get content () {
    return this.render(this.tree, this.options);
  }
}

module.exports = LazyResult;
