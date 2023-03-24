import { digikikify } from '../../type-script-adapter/digikikify';
import {
  FILE_MENTURSECTION_CONFIGURATION_GEPP,
  VOICTENTS_AND_ESTINANTS_FILE_MENTURSECTION_CONFIGURATION,
} from '../programmable-units/file/fileMentursectionConfiguration';
import { categorizeFiles } from '../programmable-units/file/fileMattomer';
import { enumerateFileSystemObjects } from '../programmable-units/file/fileMentursection';
import { associateTypeScriptFileToTypescriptConfiguration } from '../programmable-units/type-script-file/typeScriptFileConfiguration';
import { parseTypeScriptFile } from '../programmable-units/type-script-file/parsedTypeScriptFile';
import { getTypeScriptFileExportList } from '../programmable-units/type-script-file/typeScriptFileExportList';

import { getTypeScriptFileImportList } from '../programmable-units/type-script-file/typeScriptFileImportList';
import {
  ENGINE_FUNCTION_CONFIGURATION,
  ENGINE_FUNCTION_CONFIGURATION_GEPP,
} from '../programmable-units/engine-program/engineFunctionConfiguration';
import { getEngineProgramParts } from '../programmable-units/engine-program/engineProgramPartsCortmum';
import { getProgramBodyDeclarationsByIdentifier } from '../programmable-units/type-script-file/programBodyDeclarationsByIdentifier';
import { getEstinantCallExpressionParts } from '../programmable-units/engine-program/estinant-call-expression-parameter/estinantCallExpressionParameterCortmum';
import { getEstinantOutputList } from '../programmable-units/engine-program/estinant-input-output/estinantOutputList';
import { getEstinantInputList } from '../programmable-units/engine-program/estinant-input-output/estinantInputList';
import { constructEstinantTreeNode } from '../programmable-units/engine-program/tree/estinantTreeNode';
import { constructEngineProgramTree } from '../programmable-units/engine-program/tree/engineProgramTreeNode';
import { constructEngineProgramTreeOutputFile } from '../programmable-units/engine-program/engineProgramRendererWortinator';
import { buildQuirmDebugger } from '../debugger/quirmDebugger';

digikikify({
  initialVoictentsByGepp: {
    [FILE_MENTURSECTION_CONFIGURATION_GEPP]: [
      VOICTENTS_AND_ESTINANTS_FILE_MENTURSECTION_CONFIGURATION,
    ],
    [ENGINE_FUNCTION_CONFIGURATION_GEPP]: [ENGINE_FUNCTION_CONFIGURATION],
  },
  estinantTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    associateTypeScriptFileToTypescriptConfiguration,
    parseTypeScriptFile,
    getProgramBodyDeclarationsByIdentifier,
    getTypeScriptFileExportList,
    getTypeScriptFileImportList,

    getEngineProgramParts,
    getEstinantCallExpressionParts,
    getEstinantInputList,
    getEstinantOutputList,
    constructEstinantTreeNode,
    constructEngineProgramTree,
    constructEngineProgramTreeOutputFile,
  ],
  quirmDebugger: buildQuirmDebugger('modelPrograms'),
});
