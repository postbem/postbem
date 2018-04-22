const Renderer = require('./Renderer');

const render = (input, options) => {
  return (new Renderer(input)).render();
};

module.exports = render;
