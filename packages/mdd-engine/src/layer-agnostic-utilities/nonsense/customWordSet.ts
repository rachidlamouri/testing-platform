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
  {
    word: 'ast',
    existingDocumentation: 'https://en.wikipedia.org/wiki/Abstract_syntax_tree',
  },
  {
    word: 'tsestree',
  },
  {
    word: 'memoize',
    existingDocumentation: 'https://en.wikipedia.org/wiki/Memoization',
  },
  {
    word: 'params',
    description: 'parameters',
  },
  {
    word: 'init',
    description: 'initial or initialize',
  },
  {
    word: 'extensionless',
    description: 'without an extension (like a file name)',
  },
  {
    word: 'uuid',
    description: 'https://en.wikipedia.org/wiki/Universally_unique_identifier',
  },
  {
    word: 'requestee',
    existingDocumentation: 'https://en.wiktionary.org/wiki/requestee',
  },
  {
    word: 'namespace',
    existingDocumentation: 'https://en.wikipedia.org/wiki/Namespace',
  },
  {
    word: 'namespaced',
    existingDocumentation: 'https://en.wikipedia.org/wiki/Namespace',
  },
  {
    word: 'xml',
    existingDocumentation: 'https://en.wikipedia.org/wiki/XML',
  },
  {
    word: 'gitignore',
    existingDocumentation: 'https://git-scm.com/docs/gitignore',
  },
  {
    word: 'posix',
    existingDocumentation: 'https://en.wikipedia.org/wiki/POSIX',
  },
  {
    word: 'dirname',
    description: 'Directory name',
  },
  {
    word: 'basename',
    description: 'Directory name',
  },
  {
    word: 'dir',
    description: 'Directory',
  },
  {
    word: 'sep',
    description: 'Separator',
  },
  {
    word: 'debugability',
    description: 'Ability to be debugged',
  },
  {
    word: 'dereference',
    existingDocumentation: 'https://en.wiktionary.org/wiki/dereference',
  },
  {
    word: 'fs',
    description: 'File system',
  },
  {
    word: 'readdir',
    description: 'Read directory',
  },
  {
    word: 'stringify',
    description: 'To turn into a string',
  },
  {
    word: 'stringified',
    description: 'Having been turned into a string',
  },
  {
    word: 'fillcolor',
    description: 'A Graphviz attribute',
  },
  {
    word: 'penwidth',
    description: 'A Graphviz attribute',
  },
  {
    word: 'rankdir',
    description: 'A Graphviz attribute',
  },
  {
    word: 'nodesep',
    description: 'A Graphviz attribute',
  },
  {
    word: 'labelloc',
    description: 'A Graphviz attribute',
  },
  {
    word: 'fontsize',
    description: 'A Graphviz attribute',
  },
  {
    word: 'arrowsize',
    description: 'A Graphviz attribute',
  },
  {
    word: 'fontname',
    description: 'A Graphviz attribute',
  },
  {
    word: 'fixedsize',
    description: 'A Graphviz attribute',
  },
  {
    word: 'attr',
    description: 'A Graphviz attribute',
  },
  {
    word: 'args',
    description: 'Arguments',
  },
  {
    word: 'config',
    description: 'Configuration',
  },
  {
    word: 'loc',
    description: 'Location',
  },
  {
    word: 'todo',
    description: 'To do',
  },
  {
    word: 'tsconfig',
    description: 'TypeScript configuration',
  },
  {
    word: 'haphazardously',
    existingDocumentation: 'https://en.wiktionary.org/wiki/haphazardously',
  },
  {
    word: 'serializee',
    description: 'One that is being serialized',
  },
  {
    word: 'boolean',
    description: 'boolean',
  },
  {
    word: 'std',
    description: 'Standard, and yea I know. Blame Linus or something.',
  },
  {
    word: 'stderr',
    description: 'Standard error',
  },
  {
    word: 'stdout',
    description: 'Standard out',
  },
  {
    word: 'stdin',
    description: 'Standard in',
  },
  {
    word: 'stdio',
    description: 'Standard input and output',
  },
  {
    word: 'js',
    description: 'JavaScript',
  },
  {
    word: 'treeify',
    description: 'To turn into a tree',
  },
  {
    word: 'treeified',
    description: 'One that is now a tree',
  },
  {
    word: 'attribs',
    description: 'attributes',
  },
  {
    word: 'jsx',
    description: 'JavaScript Xml',
  },
  {
    word: 'mkdir',
    description: 'Make directory',
  },
  {
    word: 'argv',
    description: 'Argument variables',
  },
  {
    word: 'scaffoldee',
    description: 'One who gets scaffolded',
  },
  {
    word: 'serializer',
    description: 'One who serializes',
  },
  {
    word: 'hrtime',
    existingDocumentation:
      'https://nodejs.org/api/process.html#processhrtimebigint',
  },
  {
    word: 'bigint',
    existingDocumentation:
      'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt',
  },
  {
    word: 'mtime',
    existingDocumentation: 'https://nodejs.org/api/fs.html#statsmtime',
  },
  {
    word: 'regex',
    existingDocumentation:
      'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions',
  },
  {
    word: 'exp',
    existingDocumentation:
      'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions',
  },
  {
    word: 'deleter',
    existingDocumentation: 'https://en.wiktionary.org/wiki/deleter',
  },
  {
    word: 'min',
    description: 'minimum',
  },
  {
    word: 'utils',
    description: 'utilities',
  },
  {
    word: 'locs',
    description: 'locations',
  },
  {
    word: 'int',
    description: 'integer',
  },
  {
    word: 'rm',
    description: 'remove',
  },
  {
    word: 'seq',
    description: 'sequence',
  },
  {
    word: 'iterator',
    existingDocumentation: 'https://en.wikipedia.org/wiki/Iterator',
  },
  {
    word: 'env',
    description: 'environment',
  },
  {
    word: 'rpc',
    description: 'remote procedure call',
  },
  {
    word: 'whitespace',
    existingDocumentation: 'https://en.wikipedia.org/wiki/Whitespace_character',
  },
  {
    word: 'fc',
    description: 'A React function fomponent',
  },
  {
    word: 'ctx',
    description: 'Context',
  },
  {
    word: 'kg',
    description: 'Knowledge graph',
  },
  {
    word: 'src',
    description: 'Source',
  },
  {
    word: 'renamer',
    description: 'One who renames',
  },
  {
    word: 'locatee',
    description: "One whoms't is located",
  },

  {
    word: 'tomahto',
    description: 'tomahto tomahto',
  },
  {
    word: 'edgelord',
    description: '[flips hair]',
  },
  {
    word: 'blurple',
    description: 'A blueish purpleish blurple-like color',
  },
  {
    word: 'gymboree',
    existingDocumentation: 'https://www.gymboree.com/us/home',
  },
  {
    word: 'passthrough',
    existingDocumentation: 'https://en.wiktionary.org/wiki/passthrough',
  },
  {
    word: 'mdd',
    description: 'Model driven development',
  },
  {
    word: 'validator',
    description: 'One who validates',
  },
];

/**
 * A set of words that need to be defined by hand. There is probably a list of
 * the third party names out in the world, but this will do for now.
 */
export const customWordSet: Set<string> = new Set(
  customDefinitionSet.map((definition) => definition.word),
);
