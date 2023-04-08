import { digikikify } from '../../../type-script-adapter/digikikify';
import { buildQuirmDebugger } from '../../debugger/quirmDebugger';
import {
  ENGINE_FUNCTION_CONFIGURATION_GEPP,
  ENGINE_FUNCTION_CONFIGURATION,
} from '../../programmable-units/engine-program/engineFunctionConfiguration';
import { getEngineProgramParts } from '../../programmable-units/engine-program/getEngineProgramParts';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { constructSnapshotScript } from '../../programmable-units/snapshot-refresh/constructSnapshotScript';
import { filterEngineProgramList } from '../../programmable-units/snapshot-refresh/filterEngineProgramList';
import { associateTypeScriptFileToTypescriptConfiguration } from '../../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import { getTypeScriptFileImportList } from '../../programmable-units/type-script-file/getTypeScriptFileImportList';
import { parseTypeScriptFile } from '../../programmable-units/type-script-file/parseTypeScriptFile';

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
    getTypeScriptFileImportList,

    getEngineProgramParts,
    filterEngineProgramList,
    constructSnapshotScript,
  ],
  quirmDebugger: buildQuirmDebugger('getSnapshotRefreshScript'),
});
