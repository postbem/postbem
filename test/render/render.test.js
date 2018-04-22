const { describe, it } = require('mocha');
const { expect } = require('chai');

const render = require('../../lib/render');

describe('render', () => {
  const bemtree = {
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
  };

  it('should work', () => {
    const tree = render(bemtree);
    const result1 = tree.content[0].block;
    const result2 = tree.content[0].content[1].content;

    expect(result1).to.be.equal('App');
    expect(result2).to.be.equal('It\'s work!');
  });

  it('should clean', () => {
    const tree = render(bemtree);
    const expected2 = bemtree.content[0].content
      .filter(node => !!node).length;
    const result1 = tree.match;
    const result2 = tree.content[0].content.length;

    expect(result1).to.be.equal(undefined);
    expect(result2).to.be.equal(expected2);
  });
});
