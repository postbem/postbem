const { describe, it } = require('mocha');
const { expect } = require('chai');

const render = require('../../lib/render');

describe('render', () => {
  const bemTree = {
    content: [{
      block: 'Page',
      content: [
        {
          block: 'App',
          content: [
            { elem: 'Header', content: 'Parser' },
            { elem: 'Main', content: 'It\'s work!' },
            null,
            undefined
          ]
        }
      ]
    }]
  };

  it('should work', () => {
    const tree = render(bemTree);
    const result1 = tree.content[0].block;
    const result2 = tree.content[0].content[1].content;

    expect(result1).to.be.equal('App');
    expect(result2).to.be.equal('It\'s work!');
  });

  it('should normalize', () => {
    const tree = render(bemTree);
    const result1 = tree.match;
    const result2 = tree.content[0].content[3];

    expect(result1).to.be.equal(undefined);
    expect(result2).to.be.equal(null);
  });
});
