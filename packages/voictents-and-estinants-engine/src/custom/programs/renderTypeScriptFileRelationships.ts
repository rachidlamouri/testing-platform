import { Estinant } from '../../core/estinant';
import { digikikify } from '../../type-script-adapter/digikikify';
import { debugHubblepup } from '../debugger/debugHubblepup';
import { DIRECTORY_GEPP } from '../programmable-units/file/directory';
import { fileMattomer } from '../programmable-units/file/fileMattomer';
import { fileMentursection } from '../programmable-units/file/fileMentursection';
import {
  FILE_MENTURSECTION_CONFIGURATION_GEPP,
  VOICTENTS_AND_ESTINANTS_FILE_MENTURSECTION_CONFIGURATION,
} from '../programmable-units/file/fileMentursectionConfiguration';
import { relationshipRendererWortinator } from '../programmable-units/type-script-file-relationships/relationshipRendererWortinator';
import {
  typeScriptFileRelationshipWattlection,
  TYPE_SCRIPT_FILE_RELATIONSHIP_LIST_GEPP,
} from '../programmable-units/type-script-file-relationships/typeScriptFileRelationshipList';
import { parsedTypeScriptFileMentursection } from '../programmable-units/type-script-file/parsedTypeScriptFile';
import { typeScriptFileConfigurationOnama } from '../programmable-units/type-script-file/typeScriptFileConfiguration';
import { typeScriptFileImportListOnama } from '../programmable-units/type-script-file/typeScriptFileImportList';

digikikify({
  initialVoictentsByGepp: {
    [FILE_MENTURSECTION_CONFIGURATION_GEPP]: [
      VOICTENTS_AND_ESTINANTS_FILE_MENTURSECTION_CONFIGURATION,
    ],
  },
  estinantTuple: [
    fileMentursection,
    fileMattomer,

    typeScriptFileConfigurationOnama,
    parsedTypeScriptFileMentursection,
    typeScriptFileImportListOnama,

    typeScriptFileRelationshipWattlection,
    relationshipRendererWortinator,
  ],
  onHubblepupAddedToVoictents: debugHubblepup,
});
