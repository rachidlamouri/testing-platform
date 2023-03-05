import { buildOnama } from '../../type-script-adapter/estinant/onama';
import { Voictent } from '../../type-script-adapter/voictent';
import { serialize } from '../../utilities/serialize';
import { Grition } from '../adapter/grition';
import { OdeshinFromGrition } from '../adapter/odeshin';
import {
  SerializeTestCaseInputVoictent,
  SERIALIZE_TEST_CASE_INPUT_GEPP,
} from './serializeTestCaseInput';

export type SerializeTestCaseResult = string;

export type SerializeTestCaseResultGrition = Grition<SerializeTestCaseResult>;

export type SerializeTestCaseResultHubblepup =
  OdeshinFromGrition<SerializeTestCaseResultGrition>;

export const SERIALIZE_TEST_CASE_RESULT_GEPP = 'serialize-test-case-result';

export type SerializeTestCaseResultGepp =
  typeof SERIALIZE_TEST_CASE_RESULT_GEPP;

export type SerializeTestCaseResultVoictent = Voictent<
  SerializeTestCaseResultGepp,
  SerializeTestCaseResultHubblepup
>;

export const serializeTestCaseResultEstinant = buildOnama<
  SerializeTestCaseInputVoictent,
  SerializeTestCaseResultVoictent
>({
  inputGepp: SERIALIZE_TEST_CASE_INPUT_GEPP,
  outputGepp: SERIALIZE_TEST_CASE_RESULT_GEPP,
  pinbe: (input) => {
    const output: SerializeTestCaseResultHubblepup = {
      identifier: input.identifier,
      grition: serialize(input.grition),
    };

    return output;
  },
});
