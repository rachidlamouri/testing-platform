type NonsenseEntry = {
  word: string;
  suggestion: string;
  description?: string;
  definition?: string;
};

/**
 * A list of nonsense words and their replacements for posterity. The project
 * used to be built on these words, but they shouldn't show up anywhere but here
 * anymore. If for some reason you need to look at older commits, then you can
 * use this for reference.
 *
 * @todo copy definitions from existing files before renaming
 */
export const nonsenseDictionary = new Map(
  (
    [
      {
        word: 'voque',
        suggestion: 'stream-metatype',
      },
      {
        word: 'gepp',
        suggestion: 'collection-id',
      },
      {
        word: 'odeshin',
        suggestion: 'identifiable-item',
      },
      {
        word: 'grition',
        suggestion: 'subitem',
      },
      {
        word: 'zorn',
        suggestion: 'id',
      },
      {
        word: 'deprecatedzorn',
        suggestion: 'deprecated-id',
      },
      {
        word: 'simplezorn',
        suggestion: 'simple-id',
      },
      {
        word: 'complexzorn',
        suggestion: 'complex-id',
      },
      {
        word: 'estinant',
        suggestion: 'programmed-transform',
      },
      {
        word: 'estinants',
        suggestion: 'programmed-transforms',
      },
      {
        word: 'zornable',
        suggestion: 'identifiable',
      },
      {
        word: 'voictent',
        suggestion: 'collection',
      },
      {
        word: 'metavoictent',
        suggestion: 'metacollection',
      },
      {
        word: 'voictents',
        suggestion: 'collections',
      },
      {
        word: 'hubblepup',
        suggestion: 'item',
      },
      {
        word: 'metahubblepup',
        suggestion: 'metaitem',
      },
      {
        word: 'pelue',
        suggestion: 'egg',
      },
      {
        word: 'pelie',
        suggestion: '',
        description:
          'If a pelue is an egg then a pelie is what comes out of the egg which is just the word that came before "pelie". ie: ProgramErrorPelie -> ProgramError',
      },
      {
        word: 'framate',
        suggestion: 'get-right-key-tuple',
      },
      {
        word: 'framation',
        suggestion: 'right-key-tuple-accessor',
      },
      {
        word: 'croard',
        suggestion: 'get-key',
      },
      {
        word: 'croarder',
        suggestion: 'key-accessor',
      },
      {
        word: 'pinbe',
        suggestion: 'transform',
      },
      {
        word: 'lanbe',
        suggestion: 'Stream',
      },
      {
        word: 'digikikify',
        suggestion: 'runEngine',
      },
      {
        word: 'digikikifier',
        suggestion: 'engine-runner',
      },
      {
        word: 'vicken',
        suggestion: 'stream-connection-metatype',
      },
      {
        word: 'appreffinge',
        suggestion: 'stream-configuration',
      },
      {
        word: 'tropoignant',
        suggestion: 'core-transform',
      },
      {
        word: 'tropoig',
        suggestion: 'transform',
      },
      {
        word: 'wibiz',
        suggestion: 'collection-stream',
      },
      {
        word: 'pinbetunf',
        suggestion: 'adapted-transform',
      },
      {
        word: 'procody',
        suggestion: 'transform-input-key-group-set-cache-cache',
      },
      {
        word: 'ajorken',
        suggestion: 'transform-input-key-group-set-cache',
      },
      {
        word: 'cology',
        suggestion: 'transform-input-key-group',
      },
      {
        word: 'mabz',
        suggestion: 'right-input-key-tuple-cache',
      },
      {
        word: 'dreanor',
        suggestion: 'mutable-stream-connection-state',
      },
      {
        word: 'platomity',
        suggestion: 'mutable-transform-state',
      },
      {
        word: 'virok',
        suggestion: 'mutable-collection-state',
      },
      {
        word: 'prected',
        suggestion: 'item-cache',
      },
      {
        word: 'tabilly',
        suggestion: 'collection-cache',
      },
      {
        word: 'quirm',
        suggestion: 'collectable-item',
      },
      {
        word: 'subzorn',
        suggestion: 'subid',
      },
      {
        word: 'strif',
        suggestion: 'feature-id',
      },

      {
        word: 'messsage',
        suggestion: 'message',
        description: "I can't spell",
      },
      {
        word: 'messsages',
        suggestion: 'message',
        description: "I can't spell",
      },
      {
        word: 'metdata',
        suggestion: 'metadata',
        description: "I can't spell",
      },
      {
        word: 'guranteed',
        suggestion: 'guaranteed',
        description: "I can't spell",
      },
    ] satisfies NonsenseEntry[]
  ).map((entry) => [entry.word, entry]),
);
