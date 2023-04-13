import * as uuid from 'uuid';
import { digikikify } from '../../../type-script-adapter/digikikify';
import { ComparisonConfigurationTypeName } from '../../../utilities/file/getNestedFilePaths';
import { buildQuirmDebugger } from '../../debugger/quirmDebugger';
import { categorizeFiles } from '../file/categorizeFiles';
import { enumerateFileSystemObjects } from '../file/enumerateFileSystemObjects';
import { FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP } from '../file/fileSystemObjectEnumeratorConfiguration';
import { constructKnowledgeGraph } from '../graph-visualization/constructKnowledgeGraph';
import { encodeDirectedGraphAsGraphvizCode } from '../graph-visualization/encodeDirectedGraphAsGraphvizCode';
import { renderGraphvizCodeToSvgDocument } from '../graph-visualization/renderGraphvizCodeToSvgDocument';
import { getDirectoryInstanceIdByDirectoryPath } from '../type-script-file-relationships/getDirectoryInstanceIdByFilePath';
import { getGraphMetadataById } from '../type-script-file-relationships/getGraphMetadataById';
import { getRootDirectory } from '../type-script-file-relationships/getRootDirectory';
import { getSvgMetadataList } from '../type-script-file-relationships/getSvgMetadataList';
import { BOUNDARY_CONFIGURATION_GEPP } from '../type-script-file-relationships/graph-element/boundaryConfiguration';
import { getBoundaryMetadata } from '../type-script-file-relationships/graph-element/getBoundaryMetadata';
import { getDirectoryMetadata } from '../type-script-file-relationships/graph-element/getDirectoryMetadata';
import { getExternalModuleCollection } from '../type-script-file-relationships/graph-element/getExternalModuleCollection';
import { getExternalModuleMetadata } from '../type-script-file-relationships/graph-element/getExternalModuleMetadata';
import { getExternalModuleMetadataBySourcePath } from '../type-script-file-relationships/graph-element/getExternalModuleMetadataBySourcePath';
import { getFileNodeMetadata } from '../type-script-file-relationships/graph-element/getFileNodeMetadata';
import { getFileNodeMetadataByFilePath } from '../type-script-file-relationships/graph-element/getFileNodeMetadataByFilePath';
import { getInitialEdgeMetadata } from '../type-script-file-relationships/graph-element/getInitialEdgeMetadata';
import { getRootDirectedGraph } from '../type-script-file-relationships/graph-element/getRootDirectedGraph';
import { getRootMetadata } from '../type-script-file-relationships/graph-element/getRootMetadata';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from '../type-script-file-relationships/typeScriptFileRelationshipGraphZorn';
import { associateTypeScriptFileToTypescriptConfiguration } from '../type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import { getTypeScriptFileImportList } from '../type-script-file/getTypeScriptFileImportList';
import { parseTypeScriptFile } from '../type-script-file/parseTypeScriptFile';
import { HTML_FILE_GEPP } from '../html-file/htmlFile';

digikikify({
  initialVoictentsByGepp: {
    [HTML_FILE_GEPP]: [
      {
        zorn: '../testing-platform/packages/voictents-and-estinants-engine/src/custom/programmable-units/graph-visualization/knowledgeGraphTemplate.html',
        grition: {
          filePath:
            '../testing-platform/packages/voictents-and-estinants-engine/src/custom/programmable-units/graph-visualization/knowledgeGraphTemplate.html',
        },
      },
    ],
    [FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP]: [
      {
        directoryPath: '../openGraphScraper',
        ignoredNodePathConfigurationList: [
          {
            typeName: ComparisonConfigurationTypeName.Equals,
            value: '../openGraphScraper/coverage',
          },
          {
            typeName: ComparisonConfigurationTypeName.Equals,
            value: '../openGraphScraper/node_modules',
          },
          {
            typeName: ComparisonConfigurationTypeName.Equals,
            value: '../openGraphScraper/dist',
          },
          {
            typeName: ComparisonConfigurationTypeName.Equals,
            value: '../openGraphScraper/.git',
          },
          {
            typeName: ComparisonConfigurationTypeName.Equals,
            value: '../openGraphScraper/.github',
          },
          {
            typeName: ComparisonConfigurationTypeName.Equals,
            value: '../openGraphScraper/.nyc_output',
          },
        ],
      },
    ],
    [BOUNDARY_CONFIGURATION_GEPP]: [
      {
        zorn: TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN,
        grition: {
          overview: {
            instanceId: uuid.v4(),
          },
          internal: [
            {
              instanceId: uuid.v4(),
              directoryPath: '../openGraphScraper',
            },
          ],
          external: {
            instanceId: uuid.v4(),
          },
          limbo: {
            instanceId: uuid.v4(),
          },
        },
      },
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
    getGraphMetadataById,

    getBoundaryMetadata,
    getDirectoryMetadata,
    getFileNodeMetadata,
    getFileNodeMetadataByFilePath,
    getExternalModuleMetadata,
    getExternalModuleMetadataBySourcePath,

    getInitialEdgeMetadata,
    getRootMetadata,

    getRootDirectedGraph,

    encodeDirectedGraphAsGraphvizCode,
    renderGraphvizCodeToSvgDocument,
    getSvgMetadataList,
    constructKnowledgeGraph,
  ],
  quirmDebugger: buildQuirmDebugger('buildOgsKnowledgeGraph'),
});
