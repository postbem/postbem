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
    const tree = parser(bemtree);
    const result1 = tree.content[0].content[0].block;
    const result2 = tree.content[0].content[0].content[1].content;

    expect(result1).to.be.equal('App');
    expect(result2).to.be.equal('It\'s work!');
  });

  it('should normalize nodes', () => {
    const tree = parser(bemtree);
    let result1;
    let result2;

    tree.match({ block: 'App', elem: 'Header' }, (node) => {
      result1 = node.block;
    });
    tree.match({ tag: 'br' }, (node) => {
      result2 = node.single;
    });

    expect(result1).to.be.equal('App');
    expect(result2).to.be.equal(true);
  });

  it('should simple match tree', () => {
    const tree = parser(bemtree);
    let result1;
    let result2;

    tree.match({ block: 'App', elem: 'Header' }, (node) => {
      result1 = node.block;
      result2 = node.content;
    });

    expect(result1).to.be.equal('App');
    expect(result2).to.be.equal('Parser');
  });
});
