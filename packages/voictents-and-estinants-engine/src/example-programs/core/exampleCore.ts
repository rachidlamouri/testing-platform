import { digikikify } from '../../core/engine/digikikify';
import { Estinant } from '../../core/engine-shell/estinant/estinant';
import { Gepp } from '../../core/engine-shell/voictent/gepp';
import { Hubblepup } from '../../core/engine-shell/quirm/hubblepup';
import { Quirm } from '../../core/engine-shell/quirm/quirm';
import { buildDefaultHandler } from '../../custom/debugger/quirmDebugger';

const exampleGeppInitialInput: Gepp = 'gepp-initial-input';

const exampleGeppSerialized: Gepp = 'gepp-serialized';
const exampleGeppJoined: Gepp = 'gepp-joined';
const exampleWibixGepp: Gepp = 'gepp-accumulated';

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
    const firstEntry: [unknown, unknown] = Object.entries(
      input as object,
    )[0] ?? [undefined, undefined];

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
        return Object.values(inputB as object)[0];
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

const exampleWibixEstinant: Estinant = {
  leftAppreffinge: {
    gepp: exampleGeppInitialInput,
    isWibiz: true,
  },
  rightAppreffingeTuple: [],
  tropoig: (leftInput) => {
    return [
      {
        gepp: exampleWibixGepp,
        hubblepup: leftInput,
      },
    ];
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
    exampleWibixEstinant,
  ],
  onHubblepupAddedToVoictents: buildDefaultHandler('exampleCore'),
});

// TODO: figure out how to not have to do this
export type ExampleCore = symbol;
