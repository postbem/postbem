const Parser = require('./Parser');

const parser = (input, options) => {
  return (new Parser(input)).parse();
};

module.exports = parser;
