import { digikikify } from '../../../type-script-adapter/digikikify';
import { debugHubblepup } from '../../debugger/debugHubblepup';
import {
  DATUM_TEST_CASE_INPUT_GEPP,
  DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
} from '../../programmable-units/datum-test-case-input/datumTestCaseInput';
import { datumTestCaseInputToTypeScriptDatumTypeName } from './datumTestCaseInputToTypeScriptDatumTypeName';
import { datumTestCaseInputToCustomDatumTypeName } from './datumTestCaseInputToCustomDatumTypeName';
import { datumTestCaseInputToSerializedDatum } from './datumTestCaseInputToSerializedDatum';
import { SERIALIZED_DATUM_GEPP } from './serializedDatum';
import { fileUtilities } from '../../../utilities/debugger/fileUtilities';
import { escapePathSeparator } from '../../debugger/debugOdeshin';

digikikify({
  initialVoictentsByGepp: {
    [DATUM_TEST_CASE_INPUT_GEPP]: DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
  },
  estinantTuple: [
    datumTestCaseInputToTypeScriptDatumTypeName,
    datumTestCaseInputToCustomDatumTypeName,
    datumTestCaseInputToSerializedDatum,
  ],
  onHubblepupAddedToVoictents: (plifal) => {
    if (plifal.gepp === SERIALIZED_DATUM_GEPP) {
      fileUtilities.writeCacheFile({
        directoryName: plifal.gepp,
        fileName: escapePathSeparator(plifal.hubblepup.zorn),
        text: plifal.hubblepup.grition,
        fileExtensionSuffix: 'yml',
      });
      return;
    }

    debugHubblepup(plifal);
  },
});
