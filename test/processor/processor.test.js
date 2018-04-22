const { describe, it } = require('mocha');
const { expect } = require('chai');

const Processor = require('../../lib/processor/Processor');
const plugin = require('../utils/plugin');

describe('processor', () => {
  const bemtree = {
    block: 'Page',
    content: [
      {
        block: 'App',
        content: [
          { elem: 'Header', content: 'Parser' },
          { elem: 'Main', content: 'It\'s work!' },
          { elem: 'Footer' }
        ]
      }
    ]
  };

  it('should work', () => {
    const processor = new Processor([plugin]);
    const expected1 = bemtree.content[0].content[0].content.toUpperCase();
    const expected2 = bemtree.content[0].content[1].content.toUpperCase();

    return processor.process(bemtree)
      .then(result => result.content)
      .then(tree => {
        const result1 = tree.content[0].content[0].content;
        const result2 = tree.content[0].content[1].content;

        expect(result1).to.be.equal(expected1);
        expect(result2).to.be.equal(expected2);
      });
  });
});
