const Renderer = require('./Renderer');

const render = (input, options) => {
  return (new Renderer(input, options)).render();
};

module.exports = render;
