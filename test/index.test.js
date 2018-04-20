const { describe, it } = require('mocha');
const { expect } = require('chai');

const postbem = require('../lib');

describe('postbem', () => {
  it('should work', () => {
    const expected = 'It\'s work!';
    const result = postbem();

    expect(result).to.be.equal(expected);
  });
});
