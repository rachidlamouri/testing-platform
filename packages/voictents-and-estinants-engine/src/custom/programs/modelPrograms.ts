import { digikikify } from '../../type-script-adapter/digikikify';
import {
  FILE_MENTURSECTION_CONFIGURATION_GEPP,
  VOICTENTS_AND_ESTINANTS_FILE_MENTURSECTION_CONFIGURATION,
} from '../programmable-units/file/fileMentursectionConfiguration';
import { fileMattomer } from '../programmable-units/file/fileMattomer';
import { fileMentursection } from '../programmable-units/file/fileMentursection';
import { typeScriptFileConfigurationOnama } from '../programmable-units/type-script-file/typeScriptFileConfiguration';
import { parsedTypeScriptFileMentursection } from '../programmable-units/type-script-file/parsedTypeScriptFile';
import { typeScriptFileExportListOnama } from '../programmable-units/type-script-file/typeScriptFileExportList';

import { typeScriptFileImportListOnama } from '../programmable-units/type-script-file/typeScriptFileImportList';
import {
  ENGINE_FUNCTION_CONFIGURATION,
  ENGINE_FUNCTION_CONFIGURATION_GEPP,
} from '../programmable-units/engine-program/engineFunctionConfiguration';
import { engineProgramPartsCortmum } from '../programmable-units/engine-program/engineProgramPartsCortmum';
import { programBodyDeclarationsByIdentifierOnama } from '../programmable-units/type-script-file/programBodyDeclarationsByIdentifier';
import { estinantCallExpressionParameterCortmum } from '../programmable-units/engine-program/estinant-call-expression-parameter/estinantCallExpressionParameterCortmum';
import { estinantOutputMentursection } from '../programmable-units/engine-program/estinant-input-output/estinantOutputList';
import { estinantInputMentursection } from '../programmable-units/engine-program/estinant-input-output/estinantInputList';
import { estinantTreeNodeWattlection } from '../programmable-units/engine-program/tree/estinantTreeNode';
import { engineProgramTreeNodeWattlection } from '../programmable-units/engine-program/tree/engineProgramTreeNode';
import { engineProgramTreeToOutputFile } from '../programmable-units/engine-program/engineProgramRendererWortinator';
import { buildQuirmDebugger } from '../debugger/quirmDebugger';

digikikify({
  initialVoictentsByGepp: {
    [FILE_MENTURSECTION_CONFIGURATION_GEPP]: [
      VOICTENTS_AND_ESTINANTS_FILE_MENTURSECTION_CONFIGURATION,
    ],
    [ENGINE_FUNCTION_CONFIGURATION_GEPP]: [ENGINE_FUNCTION_CONFIGURATION],
  },
  estinantTuple: [
    fileMentursection,
    fileMattomer,

    typeScriptFileConfigurationOnama,
    parsedTypeScriptFileMentursection,
    programBodyDeclarationsByIdentifierOnama,
    typeScriptFileExportListOnama,
    typeScriptFileImportListOnama,

    engineProgramPartsCortmum,
    estinantCallExpressionParameterCortmum,
    estinantInputMentursection,
    estinantOutputMentursection,
    estinantTreeNodeWattlection,
    engineProgramTreeNodeWattlection,
    engineProgramTreeToOutputFile,
  ],
  quirmDebugger: buildQuirmDebugger('modelPrograms'),
});
