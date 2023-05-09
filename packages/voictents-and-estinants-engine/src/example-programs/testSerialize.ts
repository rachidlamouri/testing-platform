import { digikikify2 } from '../core/engine/digikikify';
import { DATUM_TEST_CASE_INPUT_ODESHIN_LIST } from '../custom/programmable-units/datum-test-case-input/datumTestCaseInput';
import { JsonSerializableVoque } from './jsonSerializableVoictent';
import { SerializableVoictent } from './serializableVoictent';

type SerializedConfiguration = JsonSerializableVoque<'serialized'>;

digikikify2({
  inputVoictentList: [
    // eslint-disable-next-line no-new
    new SerializableVoictent<SerializedConfiguration>({
      nameSpace: 'test-serialize',
      gepp: 'serialized',
      initialHubblepupTuple: DATUM_TEST_CASE_INPUT_ODESHIN_LIST.map<
        SerializedConfiguration['receivedHubblepup']
      >((datumTestCaseInput) => {
        return {
          // TODO: make this gepp empty
          gepp: 'datum-test-case-input',
          // TODO: move this logic to a file utility
          serializableId: datumTestCaseInput.zorn.replaceAll('/', ' | '),
          // TODO: make this just the grition
          datum: datumTestCaseInput,
        };
      }),
    }),
  ],
  estinantTuple: [],
});
