import { digikikify } from '../core/engine/digikikify';
import { InMemoryOdeshinVoictent } from '../core/engine/inMemoryOdeshinVoictent';
import {
  DATUM_TEST_CASE_INPUT_GEPP,
  DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
  DatumTestCaseInputVoque,
} from '../custom/programmable-units/datum-test-case-input/datumTestCaseInput';
import { buildAddMetadataForSerialization } from './buildAddMetadataForSerialization';
import { JsonSerializableVoque } from './jsonSerializableVoictent';
import { SerializableVoictent } from './serializableVoictent';

type SerializedConfiguration = JsonSerializableVoque<'serialized'>;

digikikify({
  inputVoictentList: [
    new InMemoryOdeshinVoictent({
      gepp: DATUM_TEST_CASE_INPUT_GEPP,
      initialHubblepupTuple: DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
    }),
    new SerializableVoictent<SerializedConfiguration>({
      nameSpace: 'test-serialize',
      gepp: 'serialized',
      initialHubblepupTuple: [],
    }),
  ],
  initialQuirmTuple: [],
  estinantTuple: [
    buildAddMetadataForSerialization<
      DatumTestCaseInputVoque,
      SerializedConfiguration
    >({
      inputGepp: DATUM_TEST_CASE_INPUT_GEPP,
      outputGepp: 'serialized',
    }),
  ],
  onHubblepupAddedToVoictents: () => {},
});
