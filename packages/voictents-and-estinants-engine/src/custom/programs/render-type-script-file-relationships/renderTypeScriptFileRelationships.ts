import { digikikify } from '../../../type-script-adapter/digikikify';
import { buildQuirmDebugger } from '../../debugger/quirmDebugger';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { encodeDirectedGraphAsGraphvizCode } from '../../programmable-units/graph-visualization/encodeDirectedGraphAsGraphvizCode';
import { renderGraphvizCodeToSvgDocument } from '../../programmable-units/graph-visualization/renderGraphvizCodeToSvgDocument';
import { associateTypeScriptFileToTypescriptConfiguration } from '../../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import { getTypeScriptFileImportList } from '../../programmable-units/type-script-file/getTypeScriptFileImportList';
import { parseTypeScriptFile } from '../../programmable-units/type-script-file/parseTypeScriptFile';
import { getRootDirectedGraph } from '../../programmable-units/type-script-file-relationships/graph-element/getRootDirectedGraph';
import { getGraphMetadataById } from '../../programmable-units/type-script-file-relationships/getGraphMetadataById';
import { getRootDirectory } from '../../programmable-units/type-script-file-relationships/getRootDirectory';
import { getDirectoryInstanceIdByDirectoryPath } from '../../programmable-units/type-script-file-relationships/getDirectoryInstanceIdByFilePath';
import { getExternalModuleCollection } from '../../programmable-units/type-script-file-relationships/graph-element/getExternalModuleCollection';
import {
  BOUNDARY_CONFIGURATION_GEPP,
  createBoundaryConfiguration,
} from '../../programmable-units/type-script-file-relationships/graph-element/boundaryConfiguration';
import { getBoundaryMetadata } from '../../programmable-units/type-script-file-relationships/graph-element/getBoundaryMetadata';
import { getDirectoryMetadata } from '../../programmable-units/type-script-file-relationships/graph-element/getDirectoryMetadata';
import { getFileNodeMetadata } from '../../programmable-units/type-script-file-relationships/graph-element/getFileNodeMetadata';
import { getExternalModuleMetadata } from '../../programmable-units/type-script-file-relationships/graph-element/getExternalModuleMetadata';
import { getFileNodeMetadataByFilePath } from '../../programmable-units/type-script-file-relationships/graph-element/getFileNodeMetadataByFilePath';
import { getExternalModuleMetadataBySourcePath } from '../../programmable-units/type-script-file-relationships/graph-element/getExternalModuleMetadataBySourcePath';
import { getRootMetadata } from '../../programmable-units/type-script-file-relationships/graph-element/getRootMetadata';
import { getInitialEdgeMetadata } from '../../programmable-units/type-script-file-relationships/graph-element/getInitialEdgeMetadata';
import { constructKnowledgeGraph } from '../../programmable-units/graph-visualization/constructKnowledgeGraph';
import { getSvgMetadataList } from '../../programmable-units/type-script-file-relationships/getSvgMetadataList';
import { markUnusedNodes } from '../../programmable-units/type-script-file-relationships/markUnusedNodes';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { getOutputFileCount } from './getOutputFileCount';

/**
 * Assembles a knowledge graph of the TypeScript files in this package and their
 * dependency relationships. It groups files into "boundaries" to make the file
 * system easier to visualize and to establish which groups of files cover which
 * concerns.
 *
 * @note Capturing the output file digest for this program resulted in a
 * non-deterministic result between my local environment and the CI environment due
 * to inconsistent floating point numbers in the layout
 */
digikikify({
  initialVoictentsByGepp: {
    [FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP]: [
      VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
    ],
    [BOUNDARY_CONFIGURATION_GEPP]: [
      createBoundaryConfiguration([
        'packages/voictents-and-estinants-engine/src/core',

        'packages/voictents-and-estinants-engine/src/custom/adapter',
        'packages/voictents-and-estinants-engine/src/custom/debugger',
        'packages/voictents-and-estinants-engine/src/custom/programmable-units',

        'packages/voictents-and-estinants-engine/src/custom/programs/categorize-files',
        'packages/voictents-and-estinants-engine/src/custom/programs/comments-example',
        'packages/voictents-and-estinants-engine/src/custom/programs/estinant-builder-example',
        'packages/voictents-and-estinants-engine/src/custom/programs/get-snapshot-refresh-script',
        'packages/voictents-and-estinants-engine/src/custom/programs/model-programs',
        'packages/voictents-and-estinants-engine/src/custom/programs/render-type-script-file-relationships',
        'packages/voictents-and-estinants-engine/src/custom/programs/scaffold-voictent-file',
        'packages/voictents-and-estinants-engine/src/custom/programs/test-graph-render',
        'packages/voictents-and-estinants-engine/src/custom/programs/test-typed-datum',
        'packages/voictents-and-estinants-engine/src/custom/programs/test-voictent-input',

        'packages/voictents-and-estinants-engine/src/example-programs',
        'packages/voictents-and-estinants-engine/src/type-script-adapter',

        'packages/voictents-and-estinants-engine/src/utilities/file',
        'packages/voictents-and-estinants-engine/src/utilities/semantic-types',
        'packages/voictents-and-estinants-engine/src/utilities/type-script-ast',
        'packages/voictents-and-estinants-engine/src/utilities/typed-datum',
        'packages/voictents-and-estinants-engine/src/utilities',
      ]),
    ],
  },
  estinantTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    associateTypeScriptFileToTypescriptConfiguration,
    parseTypeScriptFile,
    getTypeScriptFileImportList,

    getExternalModuleCollection,

    getRootDirectory,
    getDirectoryInstanceIdByDirectoryPath,

    getBoundaryMetadata,
    getDirectoryMetadata,
    getFileNodeMetadata,
    getFileNodeMetadataByFilePath,
    getExternalModuleMetadata,
    getExternalModuleMetadataBySourcePath,

    getGraphMetadataById,

    getInitialEdgeMetadata,
    getRootMetadata,

    getRootDirectedGraph,

    encodeDirectedGraphAsGraphvizCode,
    renderGraphvizCodeToSvgDocument,
    getSvgMetadataList,
    constructKnowledgeGraph,

    getOutputFileCount,

    markUnusedNodes,
    reportErrors,
  ],
  quirmDebugger: buildQuirmDebugger('renderTypeScriptFileRelationships'),
});
