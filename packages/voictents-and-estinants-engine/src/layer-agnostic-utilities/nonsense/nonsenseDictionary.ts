type NonsenseEntry = {
  word: string;
  suggestion: string;
  description?: string;
  definition?: string | string[];
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
        definition:
          'The type information needed to define a strongly typed stream connection, transform input, transform output, or collection without tightly coupling their instances.',
      },
      {
        word: 'gepp',
        suggestion: 'collection-id',
        definition: 'Enables identifying an instantiated collection.',
      },
      {
        word: 'odeshin',
        suggestion: 'identifiable-item',
        definition: 'An identifiable item',
      },
      {
        word: 'grition',
        suggestion: 'subitem',
        definition:
          'The thing that a Concrete Programmer wants to operate on, but it is part of an Odeshin, which also contains an identifier. Therefore, it is like a Hubblepup, but it is a property of a special type of Hubblepup',
      },
      {
        word: 'zorn',
        suggestion: 'id',
        definition:
          'A simple string identifier or a complex identifer composed of key/value pairs',
      },
      {
        word: 'deprecatedzorn',
        suggestion: 'deprecated-id',
        definition:
          'An identifier, but its type was unknown so it was literally anything. It was not useful for readable ids, so I switched to SimpleId and ComplexId',
      },
      {
        word: 'simplezorn',
        suggestion: 'simple-id',
        definition: 'A string',
      },
      {
        word: 'complexzorn',
        suggestion: 'complex-id',
        definition:
          'A set of key/value pairs where the value is a string or another complex identifier. It can be serialized and debugged as its set of nested key/value pairs.',
      },
      {
        word: 'subzorn',
        suggestion: 'subid',
        definition: 'A complex id within a complex id',
      },
      {
        word: 'estinant',
        suggestion: 'programmed-transform',
        definition:
          'A core transform plus its input and output stream configurations.',
      },
      {
        word: 'estinants',
        suggestion: 'programmed-transforms',
        definition: 'Plural of estinant',
      },
      {
        word: 'zornable',
        suggestion: 'identifiable',
        definition: 'See "zorn"',
      },
      {
        word: 'voictent',
        suggestion: 'collection',
        definition: 'A collection.',
      },
      {
        word: 'metavoictent',
        suggestion: 'metacollection',
        definition: 'Information about a voictent',
      },
      {
        word: 'voictents',
        suggestion: 'collections',
        definition: 'Plural of voictent',
      },
      {
        word: 'hubblepup',
        suggestion: 'item',
        definition:
          'The thing that a programmer operates on by streaming it between collections and transforms. It is of type "unknown" because it can be anything!',
      },
      {
        word: 'metahubblepup',
        suggestion: 'metaitem',
        definition: 'Information about a streamable item.',
      },
      {
        word: 'pelue',
        suggestion: 'egg',
        definition:
          'A suffix used on the name of an item to indicate that it can be used to derive the actual type of item, but is not itself, the item.',
      },
      {
        word: 'pelie',
        suggestion: '',
        definition:
          'If a pelue is an egg then a pelie is what comes out of the egg, which is just the word that came before "pelie". ie: ProgramErrorPelie -> ProgramError',
      },
      {
        word: 'framation',
        suggestion: 'right-key-tuple-accessor',
        definition:
          'A function that takes the leftmost input of a transform input group and outputs a key tuple for the associated right inputs of a particular stream connection. This allows the engine to look up the associated right inputs by key and coordinate triggering a transform when an input group has all items.',
      },
      {
        word: 'framate',
        suggestion: 'get-right-key-tuple',
        definition:
          'The verb form of "framation" mainly used for function names.',
      },
      {
        word: 'croarder',
        suggestion: 'right-key-accessor',
        definition:
          'A function that gets the key for a right input item. The engine does not assume the shape of any item, so this information has to be supplied by the programmer. This is used by the engine to associate items from different collections when a transform has multiple inputs.',
      },
      {
        word: 'croard',
        suggestion: 'get-right-key',
        definition:
          'The verb form of "croarder" mainly used for function names.',
      },
      {
        word: 'pinbetunf',
        suggestion: 'adapted-transform',
        definition:
          "A transform that is abstracted away from a core transform's input and output data structures. It's just a typed function.",
      },
      {
        word: 'pinbe',
        suggestion: 'transform',
        definition:
          'The verb form of "pinbetunf" mainly used for function names.',
      },
      {
        word: 'lanbe',
        suggestion: 'Stream',
        definition:
          'A data structure that facilitates streaming streamables, including streaming an entire collection at once. It encapsulates stream operations on a collection. This allows an external entity to read a collection without needing a direct reference to it.',
      },
      {
        word: 'digikikifier',
        suggestion: 'engine-runner',
        definition: [
          'A pipes and filters engine. It takes a set of collections and a set of programmed transforms. The engine continues to run as long as a programmed transform has data in its input streams.',
          "The adapted engine. It abstracts the core engine's concerns by providing an easier interface to work with. The types of its other inputs are derived from the type of the input collection tuple and the input programmed transform tuple.",
        ],
      },
      {
        word: 'digikikify',
        suggestion: 'runEngine',
        definition:
          'The verb form of "digikikifier" that is used to name the run function that is the engine',
      },
      {
        word: 'vicken',
        suggestion: 'stream-connection-metatype',
        definition:
          'An adapted stream metatype. It contains the type information needed to connect collections and transforms.',
      },
      {
        word: 'appreffinge',
        suggestion: 'stream-configuration',
        definition:
          'A left input, right input, or output group stream configuration. Contains the information needed to connect a transform to a collection.',
      },
      {
        word: 'tropoignant',
        suggestion: 'core-transform',
        definition:
          'A tranform with specific input and output datastructures that make it easy for the engine to stream data.',
      },
      {
        word: 'tropoig',
        suggestion: 'transform',
        definition:
          'The verb form of "tropoignant" mainly used for function names.',
      },
      {
        word: 'wibiz',
        suggestion: 'collection-stream',
        definition:
          'This always came in the form of "isWibiz": a flag on an input stream configuration that indicates if the stream was for the entire collection or simply one item a time.',
      },
      {
        word: 'procody',
        suggestion: 'transform-input-key-group-set-cache-cache',
        definition:
          "A cache of transform input key group caches where the key at this level is the collection id. Item keys should be unique within a collection, but don't have to be universally unique, which necessitates this parent map.",
      },
      {
        word: 'ajorken',
        suggestion: 'transform-input-key-group-set-cache',
        definition:
          'A set of transform input key groups keyed by item key (can be a left or right item key). This lets the engine find any transform input key group that might be ready for processing whenever an element of that input groups changes. A left item will only ever be part of one input group, but a right item can be part of multiple input groups.',
      },
      {
        word: 'cology',
        suggestion: 'transform-input-key-group',
        definition:
          'A left input and its stream connection plus every right input id tuple and their respective stream connections (one connection per tuple). This helps the engine find all of the right inputs associated with the left input. The engine does not assume the shape of an item, so the id of the left input is unknown, and therefore the group must store the left input itself.',
      },
      {
        word: 'mabz',
        suggestion: 'right-input-key-tuple-cache',
        definition:
          'A cache of right input id tuples keyed by a reference to their respective stream connections. This helps the engine lookup the inputs on the right side by id.',
      },
      {
        word: 'dreanor',
        suggestion: 'mutable-stream-connection-state',
        definition:
          'The information needed to identify a collection, to stream its contents, and to track when a collection is ready to be streamed.',
      },
      {
        word: 'platomity',
        suggestion: 'mutable-transform-state',
        definition:
          'A programmed transform wrapper that is used to connect collections to transforms.',
      },
      {
        word: 'virok',
        suggestion: 'mutable-collection-state',
        definition:
          'A collection wrapper that is used to determine when a collection is ready to stream itself as a whole.',
      },
      {
        word: 'prected',
        suggestion: 'item-cache',
        definition:
          'A cache of items keyed by id. This allows the engine to know if every id in a transform input key group has a corresponding item.',
      },
      {
        word: 'tabilly',
        suggestion: 'collection-cache',
        definition: 'A cache of collections by collection id.',
      },
      {
        word: 'quirm',
        suggestion: 'collectable-item',
        definition:
          'A datastructure within the core engine that was used to transport an item to its collection. It was just an item and its corresponding collection id.',
      },
      {
        word: 'strif',
        suggestion: 'feature-id',
        definition:
          'A uuid enumerating a feature along with a shorter readable hash that can be used locally',
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
