type CustomDefinition = {
  word: string;
  description?: string;
  existingDocumentation?: string;
  isAcronym?: true;
};

// note: each word should be in all lowercase
const customDefinitionSet: CustomDefinition[] = [
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
    isAcronym: true,
  },
  {
    word: 'ci',
    description: 'Continuous integration',
    isAcronym: true,
  },
  {
    word: 'accessor',
    existingDocumentation: 'https://en.wiktionary.org/wiki/accessor',
  },
  {
    word: 'runtime',
    existingDocumentation:
      'https://en.wikipedia.org/wiki/Runtime_(program_lifecycle_phase)',
  },
  {
    word: 'serializable',
    existingDocumentation: 'https://en.wikipedia.org/wiki/Serialization',
  },
  {
    word: 'serialization',
    existingDocumentation: 'https://en.wikipedia.org/wiki/Serialization',
  },
  {
    word: 'json',
    existingDocumentation: 'https://www.json.org',
  },
  {
    word: 'enum',
    existingDocumentation: 'https://en.wikipedia.org/wiki/Enumerated_type',
  },
];

/**
 * A set of words that need to be defined by hand. There is probably a list of
 * the third party names out in the world, but this will do for now.
 */
export const customWordSet: Set<string> = new Set(
  customDefinitionSet.map((definition) => definition.word),
);
