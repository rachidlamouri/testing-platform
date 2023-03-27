import { digikikify } from '../../type-script-adapter/digikikify';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { categorizeFiles } from '../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../programmable-units/file/enumerateFileSystemObjects';
import { associateTypeScriptFileToTypescriptConfiguration } from '../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import {
  ENGINE_FUNCTION_CONFIGURATION,
  ENGINE_FUNCTION_CONFIGURATION_GEPP,
} from '../programmable-units/engine-program/engineFunctionConfiguration';
import { getEngineProgramParts } from '../programmable-units/engine-program/getEngineProgramParts';
import { getProgramBodyDeclarationsByIdentifier } from '../programmable-units/type-script-file/programBodyDeclarationsByIdentifier';
import { getEstinantCallExpressionParts } from '../programmable-units/engine-program/estinant-call-expression-parameter/getEstinantCallExpressionParts';
import { constructEngineProgramTreeOutputFile } from '../programmable-units/engine-program/constructEngineProgramTreeOutputFile';
import { buildQuirmDebugger } from '../debugger/quirmDebugger';
import { parseTypeScriptFile } from '../programmable-units/type-script-file/parseTypeScriptFile';
import { getTypeScriptFileImportList } from '../programmable-units/type-script-file/getTypeScriptFileImportList';
import { getTypeScriptFileExportList } from '../programmable-units/type-script-file/getTypeScriptFileExportList';
import { getEstinantInputList } from '../programmable-units/engine-program/estinant-input-output/getEstinantInputList';
import { getEstinantOutputList } from '../programmable-units/engine-program/estinant-input-output/getEstinantOutputList';
import { constructEngineProgramTree } from '../programmable-units/engine-program/tree/constructEngineProgramTree';
import { constructEstinantTreeNode } from '../programmable-units/engine-program/tree/constructEstinantTreeNode';

digikikify({
  initialVoictentsByGepp: {
    [FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP]: [
      VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
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
