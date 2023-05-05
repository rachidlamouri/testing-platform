import { digikikify } from '../core/engine/digikikify';
import { DATUM_TEST_CASE_INPUT_ODESHIN_LIST } from '../custom/programmable-units/datum-test-case-input/datumTestCaseInput';
import {
  JsonSerializableVoictent,
  JsonSerializableVoque,
} from './jsonSerializableVoictent';

type SerializedConfiguration = JsonSerializableVoque<'serialized'>;

digikikify({
  inputVoictentList: [
    new JsonSerializableVoictent<SerializedConfiguration>({
      nameSpace: 'test-json-serialization',
      gepp: 'serialized',
      initialHubblepupTuple: DATUM_TEST_CASE_INPUT_ODESHIN_LIST.map<
        SerializedConfiguration['receivedHubblepup']
      >((datumTestCaseInput) => {
        return {
          gepp: '',
          // TODO: move this logic to a file utility
          serializableId: datumTestCaseInput.zorn.replaceAll('/', ' | '),
          datum: datumTestCaseInput.grition,
        };
      }),
    }),
  ],
  initialQuirmTuple: [],
  estinantTuple: [],
  onHubblepupAddedToVoictents: () => {},
});
