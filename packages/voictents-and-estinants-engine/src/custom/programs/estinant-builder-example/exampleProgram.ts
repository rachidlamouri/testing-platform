import { digikikify } from '../../../type-script-adapter/digikikify';
import { buildBasicQuirmDebugger } from '../../debugger/quirmDebugger';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { InputAVoictent, INPUT_A_GEPP } from './inputA';
import { OutputVoictent, OUTPUT_GEPP } from './output';
import { InputBVoictent, INPUT_B_GEPP } from './inputB';
import { InputCVoictent, INPUT_C_GEPP } from './inputC';
import { InputDVoictent, INPUT_D_GEPP } from './inputD';

/**
 * Tests consuming a collection as a whole
 */
const inputVoictentToOutputHubblepup = buildEstinant({
  name: 'inputVoictentToOutputHubblepup',
})
  .fromVoictent<InputAVoictent>({
    gepp: INPUT_A_GEPP,
  })
  .toHubblepup<OutputVoictent>({
    gepp: OUTPUT_GEPP,
  })
  .onPinbe((inputTuple) => {
    return {
      zorn: '01/inputVoictentToOutputHubblepup',
      grition: inputTuple.map((input) => input.number).join(', '),
    };
  })
  .assemble();

/**
 * Tests consuming each item of a collection
 */
const inputHubblepupToOutputHubblepup = buildEstinant({
  name: 'inputHubblepupToOutputHubblepup',
})
  .fromHubblepup<InputAVoictent>({
    gepp: INPUT_A_GEPP,
  })
  .toHubblepup<OutputVoictent>({
    gepp: OUTPUT_GEPP,
  })
  .onPinbe((input) => {
    return {
      zorn: `02/inputHubblepupToOutputHubblepup/${input.number}`,
      grition: input.number,
    };
  })
  .assemble();

/**
 * Tests consuming an inner datum
 */
const inputGritionToOutputHubblepup = buildEstinant({
  name: 'inputGritionToOutputHubblepup',
})
  .fromGrition<InputBVoictent>({
    gepp: INPUT_B_GEPP,
  })
  .toHubblepup<OutputVoictent>({
    gepp: OUTPUT_GEPP,
  })
  .onPinbe((input) => {
    return {
      zorn: `03/inputGritionToOutputHubblepup/${input}`,
      grition: input,
    };
  })
  .assemble();

/**
 * Tests consuming a left input and right input tuple
 */
const inputHubblepupAndInputHubblepupTupleToOutputHubblepup = buildEstinant({
  name: 'inputHubblepupAndInputHubblepupTupleToOutputHubblepup',
})
  .fromHubblepup<InputAVoictent>({
    gepp: INPUT_A_GEPP,
  })
  .andFromHubblepupTuple<InputBVoictent, [string, string]>({
    gepp: INPUT_B_GEPP,
    framate: (leftInput) => [`b-${leftInput.number}`, `b-${leftInput.number}`],
    croard: (rightInput) => rightInput.zorn,
  })
  .toHubblepup<OutputVoictent>({
    gepp: OUTPUT_GEPP,
  })
  .onPinbe((leftInput, [rightInput1, rightInput2]) => {
    return {
      zorn: `04/inputHubblepupAndInputHubblepupTupleToOutputHubblepup/${leftInput.number}`,
      grition: [
        leftInput.number,
        rightInput1.grition,
        rightInput2.grition,
      ].join(', '),
    };
  })
  .assemble();

/**
 * Tests consuming a left input and multiple right input tuples
 */
const inputHubblepupAndInputHubblepupTupleAndInputHubblepupTupleToOutputHubblepup =
  buildEstinant({
    name: 'inputHubblepupAndInputHubblepupTupleAndInputHubblepupTupleToOutputHubblepup',
  })
    .fromHubblepup<InputAVoictent>({
      gepp: INPUT_A_GEPP,
    })
    .andFromHubblepupTuple<InputBVoictent, [string, string]>({
      gepp: INPUT_B_GEPP,
      framate: (leftInput) => [
        `b-${leftInput.number}`,
        `b-${leftInput.number}`,
      ],
      croard: (rightInput) => rightInput.zorn,
    })
    .andFromHubblepupTuple<InputCVoictent, [string, string, string]>({
      gepp: INPUT_C_GEPP,
      framate: (leftInput) => [
        `c-${leftInput.number}`,
        `c-${leftInput.number}`,
        `c-${leftInput.number}`,
      ],
      croard: (rightInput) => rightInput.zorn,
    })
    .toHubblepup<OutputVoictent>({
      gepp: OUTPUT_GEPP,
    })
    .onPinbe(
      (
        leftInput,
        [rightInputB1, rightInputB2],
        [rightInputC1, rightInputC2, rightInputC3],
      ) => {
        return {
          zorn: `05/inputHubblepupAndInputHubblepupTupleAndInputHubblepupTupleToOutputHubblepup/${leftInput.number}`,
          grition: [
            leftInput.number,
            rightInputB1.grition,
            rightInputB2.grition,
            rightInputC1.grition,
            rightInputC2.grition,
            rightInputC3.grition,
          ].join(', '),
        };
      },
    )
    .assemble();

/**
 * Tests consuming an inner datum and outputing an inner datum
 */
const inputGritionToOutputGrition = buildEstinant({
  name: 'inputGritionToOutputGrition',
})
  .fromGrition<InputBVoictent>({
    gepp: INPUT_B_GEPP,
  })
  .toGrition<OutputVoictent>({
    gepp: OUTPUT_GEPP,
    getZorn: (leftInput) => `06/inputGritionToOutputGrition/${leftInput.zorn}`,
  })
  .onPinbe((input) => {
    return input;
  })
  .assemble();

/**
 * Tests consuming each item from a left collection and a right collection as a whole
 */
const inputHubblepupAndInputVoictentToOutputHubblepup = buildEstinant({
  name: 'inputHubblepupAndInputVoictentToOutputHubblepup',
})
  .fromHubblepup<InputAVoictent>({
    gepp: INPUT_A_GEPP,
  })
  .andFromVoictent<InputDVoictent>({
    gepp: INPUT_D_GEPP,
  })
  .toHubblepup<OutputVoictent>({
    gepp: OUTPUT_GEPP,
  })
  .onPinbe((leftInput, rightInputTuple) => {
    return {
      zorn: `07/inputHubblepupAndInputVoictentToOutputHubblepup/${leftInput.number}`,
      grition: [leftInput, ...rightInputTuple]
        .map((input) => input.number)
        .join(', '),
    };
  })
  .assemble();

/**
 * Example program for various uses of the estinant builder.
 */
digikikify({
  initialHubblepupTupleByGepp: {
    [INPUT_A_GEPP]: [{ number: '1' }, { number: '2' }],
    [INPUT_B_GEPP]: [
      { zorn: 'b-1', grition: 'bx' },
      { zorn: 'b-2', grition: 'by' },
    ],
    [INPUT_C_GEPP]: [
      { zorn: 'c-1', grition: 'cx' },
      { zorn: 'c-2', grition: 'cy' },
    ],
    [INPUT_D_GEPP]: [{ number: '3' }, { number: '4' }],
  },
  estinantTuple: [
    inputVoictentToOutputHubblepup,
    inputHubblepupToOutputHubblepup,
    inputGritionToOutputHubblepup,
    inputHubblepupAndInputHubblepupTupleToOutputHubblepup,
    inputHubblepupAndInputHubblepupTupleAndInputHubblepupTupleToOutputHubblepup,
    inputGritionToOutputGrition,
    inputHubblepupAndInputVoictentToOutputHubblepup,
  ],
  quirmDebugger: buildBasicQuirmDebugger('exampleProgram'),
});
