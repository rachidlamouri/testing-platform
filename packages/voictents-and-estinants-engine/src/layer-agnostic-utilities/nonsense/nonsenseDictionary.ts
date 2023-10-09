type NonsenseEntry = {
  word: string;
  suggestion: string;
  description?: string;
  isFinal?: true;
};

// TODO: copy definitions from existing files before renaming
export const nonsenseDictionary = new Map(
  (
    [
      {
        word: 'voque',
        suggestion: 'stream-metatype',
        isFinal: true,
      },
      {
        word: 'gepp',
        suggestion: 'collection-id',
        isFinal: true,
      },
      {
        word: 'odeshin',
        suggestion: 'identifiable-item',
        isFinal: true,
      },
      {
        word: 'grition',
        suggestion: 'subitem',
        isFinal: true,
      },
      // TODO: distinguish simple id from complex id
      {
        word: 'zorn',
        suggestion: 'complex-identifier',
        isFinal: true,
      },
      {
        word: 'estinant',
        suggestion: 'programmed-transform',
        isFinal: true,
      },
      {
        word: 'estinants',
        suggestion: 'programmed-transforms',
        isFinal: true,
      },
      {
        word: 'zornable',
        suggestion: 'identifiable',
        isFinal: true,
      },
      {
        word: 'voictent',
        suggestion: 'collection',
        isFinal: true,
      },
      {
        word: 'metavoictent',
        suggestion: 'metacollection',
        isFinal: true,
      },
      {
        word: 'voictents',
        suggestion: 'collections',
        isFinal: true,
      },
      {
        word: 'hubblepup',
        suggestion: 'item',
        isFinal: true,
      },
      {
        word: 'metahubblepup',
        suggestion: 'metaitem',
        isFinal: true,
      },
      {
        word: 'pelue',
        suggestion: 'egg',
        isFinal: true,
      },
      {
        word: 'pelie',
        suggestion: '',
        description:
          'If a pelue is an egg then a pelie is what comes out of the egg which is just the word that came before "pelie". ie: ProgramErrorPelie -> ProgramError',
        isFinal: true,
      },
      {
        word: 'framate',
        suggestion: 'get-right-key-tuple',
        isFinal: true,
      },
      {
        word: 'framation',
        suggestion: 'right-key-tuple-accessor',
        isFinal: true,
      },
      {
        word: 'croard',
        suggestion: 'get-key',
        isFinal: true,
      },
      {
        word: 'croarder',
        suggestion: 'key-accessor',
        isFinal: true,
      },
      {
        word: 'pinbe',
        suggestion: 'transform',
        isFinal: true,
      },
      {
        word: 'lanbe',
        suggestion: 'Stream',
        isFinal: true,
      },
      {
        word: 'digikikify',
        suggestion: 'runEngine',
        isFinal: true,
      },
      {
        word: 'digikikifier',
        suggestion: 'engine-runner',
        isFinal: true,
      },
      {
        word: 'vicken',
        suggestion: 'stream-connection-metatype',
        isFinal: true,
      },
      {
        word: 'appreffinge',
        suggestion: 'stream-configuration',
        isFinal: true,
      },
      {
        word: 'tropoignant',
        suggestion: 'core-transform',
        isFinal: true,
      },
      {
        word: 'tropoig',
        suggestion: 'transform',
        isFinal: true,
      },
      {
        word: 'wibiz',
        suggestion: 'collection-stream',
        isFinal: true,
      },
      {
        word: 'pinbetunf',
        suggestion: 'adapted-transform',
        isFinal: true,
      },
      {
        word: 'procody',
        suggestion: 'transform-input-key-group-set-cache-cache',
        isFinal: true,
      },
      {
        word: 'ajorken',
        suggestion: 'transform-input-key-group-set-cache',
        isFinal: true,
      },
      {
        word: 'cology',
        suggestion: 'transform-input-key-group',
        isFinal: true,
      },
      {
        word: 'mabz',
        suggestion: 'right-input-key-tuple-cache',
        isFinal: true,
      },
      {
        word: 'dreanor',
        suggestion: 'mutable-stream-connection-state',
        isFinal: true,
      },
      {
        word: 'platomity',
        suggestion: 'mutable-transform-state',
        isFinal: true,
      },
      {
        word: 'virok',
        suggestion: 'mutable-collection-state',
        isFinal: true,
      },
      {
        word: 'prected',
        suggestion: 'item-cache',
        isFinal: true,
      },
      {
        word: 'tabilly',
        suggestion: 'collection-cache',
        isFinal: true,
      },
      {
        word: 'quirm',
        suggestion: 'collectable-item',
        isFinal: true,
      },
      {
        word: 'subzorn',
        suggestion: 'subid',
        isFinal: true,
      },
      {
        word: 'strif',
        suggestion: 'feature-id',
        isFinal: true,
      },

      {
        word: 'messsage',
        suggestion: 'message',
        description: "I can't spell",
        isFinal: true,
      },
      {
        word: 'messsages',
        suggestion: 'message',
        description: "I can't spell",
        isFinal: true,
      },
      {
        word: 'metdata',
        suggestion: 'metadata',
        description: "I can't spell",
        isFinal: true,
      },
      {
        word: 'guranteed',
        suggestion: 'guaranteed',
        description: "I can't spell",
        isFinal: true,
      },
    ] satisfies NonsenseEntry[]
  ).map((entry) => [entry.word, entry]),
);
