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
import { DigikikifierStrategy } from '../../../core/engine/digikikify';
import { getEngineVoque } from '../../programmable-units/engine-program/getEngineVoque';
import { getDirectedGraphFromGraphElementGroup } from './getDirectedGraphFromGraphElementGroup';
import { getInputEdges } from './getInputEdges';
import { getTopLevelEngineProgramGraphElements } from './getTopLevelEngineProgramGraphElements';
import { getOutputEdge } from './getOutputEdge';
import { GRAPH_ELEMENT_GROUP_GEPP } from './graphElementGroup';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { groupGraphElements } from './groupGraphElements';
import { DIRECTED_GRAPH_GEPP } from '../../programmable-units/graph-visualization/directed-graph/directedGraph';
import { getEngineEstinantGraphElements } from './getEngineEstinantGraphElements';
import { ENGINE_PROGRAM_FILE_GEPP } from '../../programmable-units/type-script-file-relationships/engineProgramFile';
import { ENGINE_PROGRAM_LOCATOR_2_GEPP } from '../../programmable-units/engine-program/engineProgramLocator2';
import { ENGINE_PROGRAM_2_GEPP } from '../../programmable-units/engine-program/engineProgram2';
import { TYPE_SCRIPT_FILE_GEPP } from '../../programmable-units/type-script-file/typeScriptFile';
import { ENGINE_ESTINANT_2_GEPP } from '../../programmable-units/engine-program/engineEstinant2';
import { getEngineProgramVoqueElements } from './getEngineProgramVoqueElements';
import { ENGINE_VOQUE_PROGRAM_RELATIONSHIP_GEPP } from '../../programmable-units/engine-program/engineVoqueProgramRelationship';
import { getEngineVoqueLocatorCollection } from '../../programmable-units/engine-program/getEngineVoqueLocatorCollection';
import { getTopLevelEngineProgramMetadataEntries } from './getTopLevelEngineProgramMetadataEntries';
import { getDirectedGraphMetadataById2 } from './getDirectedGraphMetadataById2';
import { DIRECTED_GRAPH_METADATA_BY_ID_GEPP } from '../../programmable-units/graph-visualization/directedGraphMetadataById';
import {
  DIRECTED_GRAPH_METADATA_ENTRY_GEPP,
  DirectedGraphMetadataEntryVoque,
} from '../../programmable-units/graph-visualization/directedGraphMetadataEntry';
import { getEngineEstinantMetadataEntry } from './getEngineEstinantMetadataEntry';
import { getInputMetdataEntry } from './getInputMetdataEntry';
import { getEngineVoqueMetadataEntry } from './getEngineVoqueMetadataEntry';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';

const programFileCache = new ProgramFileCache({
  namespace: 'modelProgramsB',
});

const example = buildEstinant({
  name: 'example',
})
  .fromVoictent2({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .toHubblepup2({
    gepp: 'foo',
  })
  .onPinbe((list) => {
    return list;
  })
  .assemble();

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
    new InMemoryVoictent<DirectedGraphMetadataEntryVoque>({
      gepp: DIRECTED_GRAPH_METADATA_ENTRY_GEPP,
      initialHubblepupTuple: [],
    }),
    new OutputFileVoictent({
      programFileCache,
    }),
    // new InMemoryVoictent({
    //   gepp: 'foo',
    //   initialHubblepupTuple: [],
    // }),
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
    getEngineVoqueLocatorCollection,
    getEngineVoque,
    getEngineProgram2,

    getTopLevelEngineProgramGraphElements,
    getEngineProgramVoqueElements,
    getEngineEstinantGraphElements,
    getInputEdges,
    getOutputEdge,
    groupGraphElements,
    getDirectedGraphFromGraphElementGroup,

    getTopLevelEngineProgramMetadataEntries,
    getEngineVoqueMetadataEntry,
    getEngineEstinantMetadataEntry,
    getInputMetdataEntry,
    getDirectedGraphMetadataById2,

    encodeDirectedGraphAsGraphvizCode,
    renderGraphvizCodeToSvgDocument,
    addInteractivityToSvgDocument,

    captureOutputFileDigestList,
    // example,

    reportErrors,

    signalError,
  ] as const,
  programFileCache,
  serializeeVoictentGeppList: [
    // note: keep this is a multiline list for easier debugging
    SANITY_SNAPSHOT_GEPP,

    ENGINE_PROGRAM_FILE_GEPP,
    ENGINE_PROGRAM_LOCATOR_2_GEPP,
    ENGINE_PROGRAM_2_GEPP,

    GRAPH_ELEMENT_GROUP_GEPP,

    TYPE_SCRIPT_FILE_GEPP,

    ENGINE_ESTINANT_2_GEPP,

    DIRECTED_GRAPH_GEPP,
    DIRECTED_GRAPH_METADATA_BY_ID_GEPP,

    DIRECTED_GRAPH_ELEMENT_2_GEPP,
    // 'foo',
  ],
  strategy: DigikikifierStrategy.WaitForAllDependencies,
});
