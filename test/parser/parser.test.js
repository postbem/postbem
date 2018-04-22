const { describe, it } = require('mocha');
const { expect } = require('chai');

const Parser = require('../../lib/parser');

describe('parser', () => {
  const bemjson = {
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
    const parser = new Parser(bemjson);
    const tree = parser.parse();
    const result1 = tree.content[0].content[0].block;
    const result2 = tree.content[0].content[0].content[1].content;

    expect(result1).to.be.equal('App');
    expect(result2).to.be.equal('It\'s work!');
  });

  it('should normalize nodes', () => {
    const parser = new Parser(bemjson);
    const tree = parser.parse();
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
    const parser = new Parser(bemjson);
    const tree = parser.parse();
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
