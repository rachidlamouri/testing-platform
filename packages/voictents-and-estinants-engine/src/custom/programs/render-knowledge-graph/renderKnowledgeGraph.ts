import { InMemoryVoictent } from '../../../core/engine/inMemoryVoictent';
import { digikikify } from '../../../type-script-adapter/digikikify';
import { ProgramFileCache } from '../../../utilities/programFileCache';
import {
  EngineFunctionConfigurationVoque,
  ENGINE_FUNCTION_CONFIGURATION_GEPP,
  CORE_ENGINE_FUNCTION_CONFIGURATION,
  CORE_ENGINE_FUNCTION_2_CONFIGURATION,
  ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
} from '../../programmable-units/engine-program/engineFunctionConfiguration';
import { getEngineProgramLocator3 } from '../../programmable-units/engine-program/getEngineProgramLocator3';
import { PROGRAM_ERROR_GEPP } from '../../programmable-units/error/programError';
import { ProgramErrorVoictent } from '../../programmable-units/error/programErrorVoictent';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  FileSystemObjectEnumeratorConfigurationVoque,
  VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { filterEngineProgramFile } from '../../programmable-units/type-script-file-relationships/filterEngineProgramFile';
import { associateTypeScriptFileToTypescriptConfiguration } from '../../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import { getCommentedProgramBodyDeclarationList } from '../../programmable-units/type-script-file/getCommentedProgramBodyDeclarationList';
import { getTypeScriptFileImportList } from '../../programmable-units/type-script-file/getTypeScriptFileImportList';
import { parseTypeScriptFile } from '../../programmable-units/type-script-file/parseTypeScriptFile';
import { getAdaptedProgramBoundary } from './boundary/getAdaptedProgramBoundary';
import {
  BOUNDARY_GEPP,
  BoundaryVoque,
  STATIC_BOUNDARY_LIST,
} from './boundary/boundary';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { signalError } from '../../programmable-units/error/signalError';
import { assertBoundaryDirectoryExists } from './boundary/assertBoundaryDirectoryExists';
import { encodeDirectedGraphAsGraphvizCode } from '../../programmable-units/graph-visualization/encodeDirectedGraphAsGraphvizCode';
import { renderGraphvizCodeToSvgDocument } from '../../programmable-units/graph-visualization/renderGraphvizCodeToSvgDocument';
import { OutputFileVoictent } from '../../programmable-units/output-file/outputFileVoictent';
import { constructKnowledgeGraph } from './constructKnowledgeGraph';
import { getDirectedGraphFromGraphElementGroup } from '../model-programs/getDirectedGraphFromGraphElementGroup';
import { groupGraphElements } from '../model-programs/groupGraphElements';
import { getBoundaryFactAndGraphElements } from './boundary/getBoundaryFactAndGraphElements';
import { stubMetadata } from './boundary/stubMetadata';
import { assertNoBoundaryOverlap } from './boundary/assertNoBoundaryOverlap';
import { InMemoryOdeshin2Voictent } from '../../../core/engine/inMemoryOdeshinVoictent2';

const programFileCache = new ProgramFileCache({
  namespace: 'render-knowledge-graph',
});

/**
 * Renders an interactive HTML page showing the relationship
 * between parts of the project (files, directories, boundaries of concern, ..etc)
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
    new InMemoryOdeshin2Voictent<BoundaryVoque>({
      gepp: BOUNDARY_GEPP,
      initialHubblepupTuple: STATIC_BOUNDARY_LIST,
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
  errorGepp: PROGRAM_ERROR_GEPP,
  estinantTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    associateTypeScriptFileToTypescriptConfiguration,
    parseTypeScriptFile,
    getTypeScriptFileImportList,
    getCommentedProgramBodyDeclarationList,

    filterEngineProgramFile,
    getEngineProgramLocator3,

    getAdaptedProgramBoundary,
    getBoundaryFactAndGraphElements,

    assertBoundaryDirectoryExists,
    assertNoBoundaryOverlap,

    groupGraphElements,
    getDirectedGraphFromGraphElementGroup,
    encodeDirectedGraphAsGraphvizCode,
    renderGraphvizCodeToSvgDocument,

    // TODO: remove this
    stubMetadata,

    constructKnowledgeGraph,

    reportErrors,
    signalError,
  ] as const,
  programFileCache,
  serializeeVoictentGeppList: [
    // keep this as a multi-line list for easier debugging
  ],
});
