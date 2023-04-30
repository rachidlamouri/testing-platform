import { digikikify } from '../core/engine/digikikify';
import { InMemoryOdeshinVoictent } from '../core/engine/inMemoryOdeshinVoictent';
import {
  DATUM_TEST_CASE_INPUT_GEPP,
  DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
} from '../custom/programmable-units/datum-test-case-input/datumTestCaseInput';
import { buildAddMetadataForSerialization } from './buildAddMetadataForSerialization';
import {
  JsonSerializableVoictent,
  JsonSerializableVoictentConfiguration,
} from './jsonSerializableVoictent';

type SConfiguration = JsonSerializableVoictentConfiguration<'serialized'>;

digikikify({
  inputVoictentList: [
    new InMemoryOdeshinVoictent({
      gepp: DATUM_TEST_CASE_INPUT_GEPP,
      initialHubblepupTuple: DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
    }),
    new JsonSerializableVoictent<SConfiguration>({
      nameSpace: 'test-json-serialization',
      gepp: 'serialized',
      initialHubblepupTuple: [],
    }),
  ],
  initialQuirmTuple: [],
  estinantTuple: [
    buildAddMetadataForSerialization({
      inputGepp: DATUM_TEST_CASE_INPUT_GEPP,
      outputGepp: 'serialized',
    }),
  ],
  onHubblepupAddedToVoictents: () => {},
});
