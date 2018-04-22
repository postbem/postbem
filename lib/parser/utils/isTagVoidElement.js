const isTagVoidElement = (tag) => {
  // https://html.spec.whatwg.org/multipage/syntax.html#void-elements
  // https://developer.mozilla.org/en-US/docs/Glossary/Empty_element
  const tagVoidElementList = [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
  ];

  return tagVoidElementList.indexOf(tag) !== -1;
};

module.exports = isTagVoidElement;
