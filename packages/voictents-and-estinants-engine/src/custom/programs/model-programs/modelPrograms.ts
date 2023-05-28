import { digikikify } from '../../../type-script-adapter/digikikify';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  FileSystemObjectEnumeratorConfigurationVoque,
  VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import { associateTypeScriptFileToTypescriptConfiguration } from '../../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import {
  CORE_ENGINE_FUNCTION_2_CONFIGURATION,
  CORE_ENGINE_FUNCTION_CONFIGURATION,
  ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
  ENGINE_FUNCTION_CONFIGURATION_GEPP,
  EngineFunctionConfigurationVoque,
} from '../../programmable-units/engine-program/engineFunctionConfiguration';
import { getProgramBodyDeclarationsByIdentifier } from '../../programmable-units/type-script-file/programBodyDeclarationsByIdentifier';
import { parseTypeScriptFile } from '../../programmable-units/type-script-file/parseTypeScriptFile';
import { getTypeScriptFileImportList } from '../../programmable-units/type-script-file/getTypeScriptFileImportList';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { getDirectedGraph } from '../../programmable-units/getDirectedGraph';
import { addInteractivityToSvgDocument } from '../../programmable-units/graph-visualization/addInteractivityToSvgDocument';
import { renderGraphvizCodeToSvgDocument } from '../../programmable-units/graph-visualization/renderGraphvizCodeToSvgDocument';
import { encodeDirectedGraphAsGraphvizCode } from '../../programmable-units/graph-visualization/encodeDirectedGraphAsGraphvizCode';
import { getCommentedProgramBodyDeclarationList } from '../../programmable-units/type-script-file/getCommentedProgramBodyDeclarationList';
import { filterEngineProgramFile } from '../../programmable-units/type-script-file-relationships/filterEngineProgramFile';
import { getEngineProgramLocator } from '../../programmable-units/engine-program/getEngineProgramLocator';
import { getEngineEstinantLocatorCollection } from '../../programmable-units/engine-program/getEngineEstinantLocatorCollection';
import { getEngineEstinant } from '../../programmable-units/engine-program/getEngineEstinant';
import { getEngineProgram2 } from '../../programmable-units/engine-program/getEngineProgram2';
import { captureOutputFileDigestList } from '../../programmable-units/captureOutputFileDigestList';
import { signalError } from '../../programmable-units/error/signalError';
import { InMemoryVoictent } from '../../../core/engine/inMemoryVoictent';
import { ProgramFileCache } from '../../../utilities/programFileCache';
import { SANITY_SNAPSHOT_GEPP } from '../../programmable-units/sanitySnapshot';
import { ProgramErrorVoictent } from '../../programmable-units/error/programErrorVoictent';
import { OutputFileVoictent } from '../../programmable-units/output-file/outputFileVoictent';

const programFileCache = new ProgramFileCache({
  namespace: 'modelPrograms',
});

/**
 * Creates an interactive model for each engine program.
 */
digikikify({
  populatedVoictentTuple: [
    new InMemoryVoictent<FileSystemObjectEnumeratorConfigurationVoque>({
      gepp: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
      initialHubblepupTuple: [
        VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
      ],
    }),
    new InMemoryVoictent<EngineFunctionConfigurationVoque>({
      gepp: ENGINE_FUNCTION_CONFIGURATION_GEPP,
      initialHubblepupTuple: [
        CORE_ENGINE_FUNCTION_CONFIGURATION,
        CORE_ENGINE_FUNCTION_2_CONFIGURATION,
        ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
      ],
    }),
  ] as const,
  uninferableVoictentTuple: [
    new ProgramErrorVoictent({
      programFileCache,
    }),
    new OutputFileVoictent({
      programFileCache,
    }),
  ],
  estinantTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    associateTypeScriptFileToTypescriptConfiguration,
    parseTypeScriptFile,
    getCommentedProgramBodyDeclarationList,
    getProgramBodyDeclarationsByIdentifier,
    getTypeScriptFileImportList,

    filterEngineProgramFile,
    getEngineProgramLocator,

    getEngineEstinantLocatorCollection,
    getEngineEstinant,
    getEngineProgram2,

    getDirectedGraph,

    encodeDirectedGraphAsGraphvizCode,
    renderGraphvizCodeToSvgDocument,
    addInteractivityToSvgDocument,

    captureOutputFileDigestList,

    reportErrors,

    signalError,
  ] as const,
  programFileCache,
  serializeeVoictentGeppList: [SANITY_SNAPSHOT_GEPP],
});
