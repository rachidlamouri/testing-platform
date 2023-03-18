import { digikikify } from '../../../type-script-adapter/digikikify';
import { buildBasicQuirmDebugger } from '../../debugger/quirmDebugger';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { InputAVoictent, INPUT_A_GEPP } from './inputA';
import { OutputVoictent, OUTPUT_GEPP } from './output';
import { InputBVoictent, INPUT_B_GEPP } from './inputB';
import { InputCVoictent, INPUT_C_GEPP } from './inputC';

const inputVoictentToOutputHubblepup = buildEstinant()
  .fromVoictent<InputAVoictent>(INPUT_A_GEPP)
  .toHubblepup<OutputVoictent>(OUTPUT_GEPP)
  .onPinbe((inputTuple) => {
    return {
      zorn: '01/inputVoictentToOutputHubblepup',
      grition: inputTuple.map((input) => input.number).join(', '),
    };
  })
  .assemble();

const inputHubblepupToOutputHubblepup = buildEstinant()
  .fromHubblepup<InputAVoictent>(INPUT_A_GEPP)
  .toHubblepup<OutputVoictent>(OUTPUT_GEPP)
  .onPinbe((input) => {
    return {
      zorn: `02/inputHubblepupToOutputHubblepup/${input.number}`,
      grition: input.number,
    };
  })
  .assemble();

const inputGritionToOutputHubblepup = buildEstinant()
  .fromGrition<InputBVoictent>(INPUT_B_GEPP)
  .toHubblepup<OutputVoictent>(OUTPUT_GEPP)
  .onPinbe((input) => {
    return {
      zorn: `03/inputGritionToOutputHubblepup/${input}`,
      grition: input,
    };
  })
  .assemble();

const inputHubblepupAndInputHubblepupTupleToOutputHubblepup = buildEstinant()
  .fromHubblepup<InputAVoictent>(INPUT_A_GEPP)
  .andFromHubblepup<InputBVoictent, [InputBVoictent, InputBVoictent], string>(
    INPUT_B_GEPP,
    (leftInput) => [`b-${leftInput.number}`, `b-${leftInput.number}`],
    (rightInput) => rightInput.zorn,
  )
  .toHubblepup<OutputVoictent>(OUTPUT_GEPP)
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

const inputHubblepupAndInputHubblepupTupleAndInputHubblepupTupleToOutputHubblepup =
  buildEstinant()
    .fromHubblepup<InputAVoictent>(INPUT_A_GEPP)
    .andFromHubblepup<InputBVoictent, [InputBVoictent, InputBVoictent], string>(
      INPUT_B_GEPP,
      (leftInput) => [`b-${leftInput.number}`, `b-${leftInput.number}`],
      (rightInput) => rightInput.zorn,
    )
    .andFromHubblepup<
      InputCVoictent,
      [InputCVoictent, InputCVoictent, InputCVoictent],
      string
    >(
      INPUT_C_GEPP,
      (leftInput) => [
        `c-${leftInput.number}`,
        `c-${leftInput.number}`,
        `c-${leftInput.number}`,
      ],
      (rightInput) => rightInput.zorn,
    )
    .toHubblepup<OutputVoictent>(OUTPUT_GEPP)
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

digikikify({
  initialVoictentsByGepp: {
    [INPUT_A_GEPP]: [{ number: '1' }, { number: '2' }],
    [INPUT_B_GEPP]: [
      { zorn: 'b-1', grition: 'bx' },
      { zorn: 'b-2', grition: 'by' },
    ],
    [INPUT_C_GEPP]: [
      { zorn: 'c-1', grition: 'cx' },
      { zorn: 'c-2', grition: 'cy' },
    ],
  },
  estinantTuple: [
    inputVoictentToOutputHubblepup,
    inputHubblepupToOutputHubblepup,
    inputGritionToOutputHubblepup,
    inputHubblepupAndInputHubblepupTupleToOutputHubblepup,
    inputHubblepupAndInputHubblepupTupleAndInputHubblepupTupleToOutputHubblepup,
  ],
  quirmDebugger: buildBasicQuirmDebugger('exampleProgram'),
});
