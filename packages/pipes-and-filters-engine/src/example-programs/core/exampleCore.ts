import { digikikify } from '../../core/digikikify';
import { Estinant } from '../../core/estinant';
import { Gepp } from '../../core/gepp';
import { Hubblepup } from '../../core/hubblepup';
import { Quirm } from '../../core/quirm';
import { debugHubblepup } from './debugHubblepup';

const exampleGeppInitialInput: Gepp = 'gepp-initial-input';

const exampleGeppSerialized: Gepp = 'gepp-serialized';
const exampleGeppJoined: Gepp = 'gepp-joined';

const hubblepupA1: Hubblepup = { a: 1 };
const hubblepupA2: Hubblepup = { a: 2 };
const hubblepupB1: Hubblepup = { b: 1 };
const hubblepupB2: Hubblepup = { b: 2 };

const initialCollection = [hubblepupA1, hubblepupA2, hubblepupB1, hubblepupB2];

const exampleOnamaEstinant: Estinant = {
  leftAppreffinge: { gepp: exampleGeppInitialInput },
  rightAppreffingeTuple: [],
  tropoig: function serialize(input) {
    const output: Quirm = {
      gepp: exampleGeppSerialized,
      hubblepup: {
        serialized: JSON.stringify(input),
      },
    };

    return [output];
  },
};

const exampleMentursectionEstinant: Estinant = {
  leftAppreffinge: { gepp: exampleGeppInitialInput },
  rightAppreffingeTuple: [],
  tropoig: function categorizeByValue(input) {
    const firstEntry: [unknown, unknown] = Object.entries(input)[0] ?? [
      undefined,
      undefined,
    ];

    const [key, value] = firstEntry;

    const keyOutput: Quirm = {
      gepp: `key-category-${JSON.stringify(key)}`,
      hubblepup: input,
    };

    const valueOutput: Quirm = {
      gepp: `value-category-${JSON.stringify(value)}`,
      hubblepup: input,
    };

    return [keyOutput, valueOutput];
  },
};

const exampleCortmumEstinant: Estinant = {
  leftAppreffinge: { gepp: 'key-category-"a"' },
  rightAppreffingeTuple: [
    {
      gepp: 'key-category-"b"',
      croard: (inputB): unknown => {
        return Object.values(inputB)[0];
      },
      framate: (): number[] => {
        return [2, 1];
      },
    },
  ],
  tropoig: function join(inputA, inputBTuple) {
    const outputQuirm: Quirm = {
      gepp: exampleGeppJoined,
      hubblepup: {
        inputA,
        inputBTuple,
      },
    };

    return [outputQuirm];
  },
};

const exampleWortinatorEstinant: Estinant = {
  leftAppreffinge: { gepp: exampleGeppInitialInput },
  rightAppreffingeTuple: [],
  tropoig: function wortWortWort(input) {
    // eslint-disable-next-line no-console
    console.log(`Wort Wort Wort: ${JSON.stringify(input)}`);

    return [];
  },
};

digikikify({
  initialQuirmTuple: [
    ...initialCollection.map((hubblepup): Quirm => {
      return {
        gepp: exampleGeppInitialInput,
        hubblepup,
      };
    }),
  ],
  estinantTuple: [
    exampleWortinatorEstinant,
    exampleOnamaEstinant,
    exampleMentursectionEstinant,
    exampleCortmumEstinant,
  ],
  onHubblepupAddedToVoictents: debugHubblepup,
});

// TODO: figure out how to not have to do this
export type ExampleCore = symbol;
