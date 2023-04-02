import { digikikify } from '../../type-script-adapter/digikikify';
import { buildQuirmDebugger } from '../debugger/quirmDebugger';
import { categorizeFiles } from '../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../programmable-units/file/enumerateFileSystemObjects';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { associateTypeScriptFileToTypescriptConfiguration } from '../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import { parseTypeScriptFile } from '../programmable-units/type-script-file/parseTypeScriptFile';
import { getRootDirectory } from '../programmable-units/type-script-file-relationships/getRootDirectory';
import { buildEstinant } from '../adapter/estinant-builder/estinantBuilder';
import { addInteractivityToSvgDocument } from '../programmable-units/graph-visualization/addInteractivityToSvgDocument';
import { Shape } from '../programmable-units/graph-visualization/directed-graph/attribute';
import {
  DirectedGraphVoictent,
  DIRECTED_GRAPH_GEPP,
  DirectedGraph,
} from '../programmable-units/graph-visualization/directed-graph/directedGraph';
import { DirectedGraphNode } from '../programmable-units/graph-visualization/directed-graph/directedGraphNode';
import { encodeDirectedGraphAsGraphvizCode } from '../programmable-units/graph-visualization/encodeDirectedGraphAsGraphvizCode';
import { renderGraphvizCodeToSvgDocument } from '../programmable-units/graph-visualization/renderGraphvizCodeToSvgDocument';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from '../programmable-units/type-script-file-relationships/typeScriptFileRelationshipGraphZorn';
import {
  BOUNDARY_CONFIGURATION_GEPP,
  createBoundaryConfigurationTuple,
} from '../programmable-units/type-script-file-relationships/boundaryConfiguration';
import { getBoundaryElement } from '../programmable-units/type-script-file-relationships/graph-element/getBoundaryElement';
import { getFileNodeAttributeByKey } from '../programmable-units/type-script-file-relationships/graph-element/getFileNodeAttributeByKey';
import {
  FILE_NODE_ATTRIBUTE_BY_KEY_GEPP,
  FileNodeAttributeByKeyVoictent,
} from '../programmable-units/type-script-file-relationships/graph-element/fileNodeAttributeByKey';
import { getGraphMetadataById } from '../programmable-units/type-script-file-relationships/getGraphMetadataById';
import { getDirectorySubgraphAttributeByKey } from '../programmable-units/type-script-file-relationships/graph-element/getDirectorySubgraphAttributeByKey';
import {
  DIRECTORY_SUBGRAPH_ATTRIBUTE_BY_KEY_GEPP,
  DirectorySubgraphAttributeByKeyVoictent,
} from '../programmable-units/type-script-file-relationships/graph-element/directorySubgraphAttributeByKey';
import {
  IMPORT_RELATIONSHIP_EDGE_GEPP,
  ImportRelationshipEdgeVoictent,
} from '../programmable-units/type-script-file-relationships/graph-element/importRelationshipEdge';
import { getImportRelationshipEdge } from '../programmable-units/type-script-file-relationships/graph-element/getImportRelationshipEdge';
import { getTypeScriptFileImportList } from '../programmable-units/type-script-file/getTypeScriptFileImportList';
import { getTypeScriptFileInstanceIdByFilePath } from '../programmable-units/type-script-file-relationships/getTypeScriptFileInstanceIdByFilePath';
import { getRootDirectedGraph } from '../programmable-units/type-script-file-relationships/graph-element/getRootDirectedGraph';
import {
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  TypeScriptFileImportList,
  TypeScriptFileImportListVoictent,
} from '../programmable-units/type-script-file/typeScriptFileImportList';

digikikify({
  initialVoictentsByGepp: {
    [FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP]: [
      VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
    ],
    [BOUNDARY_CONFIGURATION_GEPP]: createBoundaryConfigurationTuple([
      'packages/voictents-and-estinants-engine/src/core/digikikify.ts',
    ]),
    // [TYPE_SCRIPT_FILE_GEPP]: [
    //   {
    //     zorn: 'my-file',
    //     grition: {
    //       filePath: 'bar',
    //     },
    //   },
    // ],
    // [ROOT_DIRECTORY_GEPP]: [
    //   {
    //     zorn: 'my-dir',
    //     grition: {
    //       directoryPath: 'foo',
    //     },
    //   },
    // ],
  },
  estinantTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    associateTypeScriptFileToTypescriptConfiguration,
    parseTypeScriptFile,
    getTypeScriptFileImportList,

    // buildEstinant('my-import-checker')
    //   .fromOdeshinVoictent<TypeScriptFileImportListVoictent>({
    //     gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
    //   })
    //   .onPinbe((input) => {
    //     console.log('HEY', input.flat().length);
    //   })
    //   .assemble(),

    // getTypeScriptImportRelationshipLisForFile,
    // getExternalModuleCollection,

    getBoundaryElement,
    // getExternalModuleElement,

    // getTypeScriptFileRelationshipList,
    // digraphificateTypeScriptFileRelationshipList,

    getRootDirectory,

    getTypeScriptFileInstanceIdByFilePath,
    getImportRelationshipEdge,

    getFileNodeAttributeByKey,
    getDirectorySubgraphAttributeByKey,

    getGraphMetadataById,

    // getIdentifiableBoundary,
    // getIdentifiableDirectory,
    // getIdentifiableTypeScriptFile,

    getRootDirectedGraph,

    encodeDirectedGraphAsGraphvizCode,
    renderGraphvizCodeToSvgDocument,
    addInteractivityToSvgDocument,
  ],
  quirmDebugger: buildQuirmDebugger('renderTypeScriptFileRelationships'),
});
