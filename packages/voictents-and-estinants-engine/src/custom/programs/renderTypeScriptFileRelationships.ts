import { digikikify } from '../../type-script-adapter/digikikify';
import { buildQuirmDebugger } from '../debugger/quirmDebugger';
import { categorizeFiles } from '../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../programmable-units/file/enumerateFileSystemObjects';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { encodeDirectedGraphAsGraphvizCode } from '../programmable-units/graph-visualization/encodeDirectedGraphAsGraphvizCode';
import { renderGraphvizCodeToSvgDocument } from '../programmable-units/graph-visualization/renderGraphvizCodeToSvgDocument';
import { addInteractivityToSvgDocument } from '../programmable-units/graph-visualization/addInteractivityToSvgDocument';
import { associateTypeScriptFileToTypescriptConfiguration } from '../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import { getTypeScriptFileImportList } from '../programmable-units/type-script-file/getTypeScriptFileImportList';
import { parseTypeScriptFile } from '../programmable-units/type-script-file/parseTypeScriptFile';
import { getFileNodeAttributeByKey } from '../programmable-units/type-script-file-relationships/graph-element/getFileNodeAttributeByKey';
import { getRootDirectedGraph } from '../programmable-units/type-script-file-relationships/graph-element/getRootDirectedGraph';
import { getGraphMetadataById } from '../programmable-units/type-script-file-relationships/getGraphMetadataById';
import { getRootDirectory } from '../programmable-units/type-script-file-relationships/getRootDirectory';
import { getImportRelationshipEdge } from '../programmable-units/type-script-file-relationships/graph-element/getImportRelationshipEdge';
import { getTypeScriptFileInstanceIdByFilePath } from '../programmable-units/type-script-file-relationships/getTypeScriptFileInstanceIdByFilePath';
import { getDirectorySubgraphAttributeByKey } from '../programmable-units/type-script-file-relationships/graph-element/getDirectorySubgraphAttributeByKey';
import { getFileNodeToParentRelationship } from '../programmable-units/type-script-file-relationships/graph-element/getFileNodeToParentRelationship';
import { getDirectorySubgraphToParentRelationship } from '../programmable-units/type-script-file-relationships/graph-element/getDirectorySubgraphToParentRelationship';
import { getDirectoryInstanceIdByDirectoryPath } from '../programmable-units/type-script-file-relationships/getDirectoryInstanceIdByFilePath';
import { getBoundarySubgraphAttributeByKey } from '../programmable-units/type-script-file-relationships/graph-element/getBoundarySubgraphAttributeByKey';
import { getBoundarySubgraphToParentRelationship } from '../programmable-units/type-script-file-relationships/graph-element/getBoundarySubgraphToParentRelationship';
import {
  BOUNDARY_CONFIGURATION_GEPP,
  createBoundaryConfigurationTuple,
} from '../programmable-units/type-script-file-relationships/boundaryConfiguration';

digikikify({
  initialVoictentsByGepp: {
    [FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP]: [
      VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
    ],
    [BOUNDARY_CONFIGURATION_GEPP]: createBoundaryConfigurationTuple([
      'packages/voictents-and-estinants-engine/src/core',
      'packages/voictents-and-estinants-engine/src/custom/adapter',
      'packages/voictents-and-estinants-engine/src/custom/debugger',
      'packages/voictents-and-estinants-engine/src/custom/programmable-units',
      'packages/voictents-and-estinants-engine/src/custom/programs',
      'packages/voictents-and-estinants-engine/src/custom/serialize-test-case',
      'packages/voictents-and-estinants-engine/src/example-programs',
      'packages/voictents-and-estinants-engine/src/type-script-adapter',
      'packages/voictents-and-estinants-engine/src/utilities/directedGraph',
      'packages/voictents-and-estinants-engine/src/utilities/file',
      'packages/voictents-and-estinants-engine/src/utilities/semantic-types',
      'packages/voictents-and-estinants-engine/src/utilities/type-script-ast',
      'packages/voictents-and-estinants-engine/src/utilities/typed-datum',
      'packages/voictents-and-estinants-engine/src/utilities',
    ]),
  },
  estinantTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    associateTypeScriptFileToTypescriptConfiguration,
    parseTypeScriptFile,
    getTypeScriptFileImportList,

    getRootDirectory,
    getDirectoryInstanceIdByDirectoryPath,
    getTypeScriptFileInstanceIdByFilePath,
    getGraphMetadataById,

    getBoundarySubgraphAttributeByKey,
    getDirectorySubgraphAttributeByKey,
    getFileNodeAttributeByKey,

    getBoundarySubgraphToParentRelationship,
    getDirectorySubgraphToParentRelationship,
    getFileNodeToParentRelationship,
    getImportRelationshipEdge,

    getRootDirectedGraph,

    encodeDirectedGraphAsGraphvizCode,
    renderGraphvizCodeToSvgDocument,
    addInteractivityToSvgDocument,
  ],
  quirmDebugger: buildQuirmDebugger('renderTypeScriptFileRelationships'),
});
