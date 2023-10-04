type CustomDefinition = {
  word: string;
  description?: string;
  existingDocumentation?: string;
  isAcronym?: true;
};

// note: each word should be in all lowercase
const customDefinitionSet: CustomDefinition[] = [
  {
    word: 'metatype',
    existingDocumentation: 'https://en.wiktionary.org/wiki/metatype',
  },
  {
    word: 'svg',
    existingDocumentation: 'https://en.wikipedia.org/wiki/SVG',
    isAcronym: true,
  },
  {
    word: 'graphviz',
    existingDocumentation: 'https://graphviz.org/',
  },
  {
    word: 'html',
    existingDocumentation: 'https://en.wikipedia.org/wiki/HTML',
    isAcronym: true,
  },
  {
    word: 'jsdoc',
    existingDocumentation: 'https://jsdoc.app/',
  },
  {
    word: 'eslint',
    existingDocumentation: 'https://eslint.org/',
  },
  {
    word: 'yaml',
    existingDocumentation: 'https://yaml.org/',
  },
  {
    word: 'ci',
    description: 'Continuous integration',
    isAcronym: true,
  },
];

/**
 * A set of words that need to be defined by hand. There is probably a list of
 * the third party names out in the world, but this will do for now.
 */
export const customWordSet: Set<string> = new Set(
  customDefinitionSet.map((definition) => definition.word),
);
