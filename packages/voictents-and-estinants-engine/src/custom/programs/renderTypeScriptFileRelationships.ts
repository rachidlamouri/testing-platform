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

digikikify({
  initialVoictentsByGepp: {
    [FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP]: [
      VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
    ],
  },
  estinantTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    associateTypeScriptFileToTypescriptConfiguration,
    parseTypeScriptFile,
    getTypeScriptFileImportList,

    getRootDirectory,
    getTypeScriptFileInstanceIdByFilePath,
    getGraphMetadataById,

    getFileNodeAttributeByKey,
    getImportRelationshipEdge,
    getRootDirectedGraph,

    encodeDirectedGraphAsGraphvizCode,
    renderGraphvizCodeToSvgDocument,
    addInteractivityToSvgDocument,
  ],
  quirmDebugger: buildQuirmDebugger('renderTypeScriptFileRelationships'),
});
