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
import { buildQuirmDebugger } from '../../debugger/quirmDebugger';
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
import {
  PROGRAM_ERROR_GEPP,
  ProgramErrorVoque,
} from '../../programmable-units/error/programError';
import { InMemoryInteractiveGraphConstituentVoictent } from '../../programmable-units/graph-visualization/inMemoryInteractiveGraphConstituentVoictent';
import {
  DIRECTED_GRAPH_GEPP,
  DirectedGraphVoque,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraph';
import {
  ASSOCIABLE_DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
  AssociableDirectedGraphMetadataByIdVoque,
} from '../../programmable-units/graph-visualization/associableDirectedGraphMetadataById';
import {
  ASSOCIABLE_GRAPHVIZ_CODE_GEPP,
  AssociableGraphvizCodeVoque,
} from '../../programmable-units/graph-visualization/associableGraphvizCode';
import {
  ASSOCIABLE_SVG_DOCUMENT_GEPP,
  AssociableSvgDocumentVoque,
} from '../../programmable-units/graph-visualization/associableSvgDocument';
import {
  OUTPUT_FILE_GEPP,
  OutputFileVoque,
} from '../../programmable-units/output-file/outputFile';

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
    new InMemoryVoictent<ProgramErrorVoque>({
      gepp: PROGRAM_ERROR_GEPP,
      initialHubblepupTuple: [],
    }),
    new InMemoryInteractiveGraphConstituentVoictent<DirectedGraphVoque>({
      gepp: DIRECTED_GRAPH_GEPP,
      initialHubblepupTuple: [],
    }),
    new InMemoryInteractiveGraphConstituentVoictent<AssociableDirectedGraphMetadataByIdVoque>(
      {
        gepp: ASSOCIABLE_DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
        initialHubblepupTuple: [],
      },
    ),
    new InMemoryInteractiveGraphConstituentVoictent<AssociableGraphvizCodeVoque>(
      {
        gepp: ASSOCIABLE_GRAPHVIZ_CODE_GEPP,
        initialHubblepupTuple: [],
      },
    ),
    new InMemoryInteractiveGraphConstituentVoictent<AssociableSvgDocumentVoque>(
      {
        gepp: ASSOCIABLE_SVG_DOCUMENT_GEPP,
        initialHubblepupTuple: [],
      },
    ),
    new InMemoryVoictent<OutputFileVoque>({
      gepp: OUTPUT_FILE_GEPP,
      initialHubblepupTuple: [],
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
  quirmDebugger: buildQuirmDebugger('modelPrograms'),
});
