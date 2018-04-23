const Parser = require('./Parser');

const parser = (input, options) => {
  return (new Parser(input, options)).parse();
};

module.exports = parser;
