const { describe, it } = require('mocha');
const { expect } = require('chai');

const parser = require('../../lib/parser');

describe('parser', () => {
  const bemtree = {
    block: 'Page',
    content: [
      {
        block: 'App',
        content: [
          { elem: 'Header', content: 'Parser' },
          { elem: 'Main', content: 'It\'s work!' },
          'text1',
          { tag: 'br' },
          'text2',
          { elem: 'Footer' }
        ]
      }
    ]
  };

  it('should work', () => {
    const bemTree = parser(bemtree);
    const result1 = bemTree.content[0].content[0].block;
    const result2 = bemTree.content[0].content[0].content[1].content;

    expect(result1).to.be.equal('App');
    expect(result2).to.be.equal('It\'s work!');
  });

  it('should normalize nodes', () => {
    const bemTree = parser(bemtree);
    let result1;
    let result2;

    bemTree.match({ elem: 'Header' }, (node) => {
      result1 = node.block;
    });
    bemTree.match({ tag: 'br' }, (node) => {
      result2 = node.single;
    });

    expect(result1).to.be.equal('App');
    expect(result2).to.be.equal(true);
  });

  it('should simple match tree', () => {
    const bemTree = parser(bemtree);
    let result1;
    let result2;

    bemTree.match({ block: 'App', elem: 'Header' }, (node) => {
      result1 = node.block;
      result2 = node.content;
    });

    expect(result1).to.be.equal('App');
    expect(result2).to.be.equal('Parser');
  });
});
