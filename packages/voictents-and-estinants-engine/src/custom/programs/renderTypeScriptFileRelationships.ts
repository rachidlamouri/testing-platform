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
import { digraphificateTypeScriptFileRelationshipList } from '../programmable-units/type-script-file-relationships/digraphificateTypeScriptFileRelationshipList';
import { associateTypeScriptFileToTypescriptConfiguration } from '../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import { getTypeScriptFileImportList } from '../programmable-units/type-script-file/getTypeScriptFileImportList';
import { parseTypeScriptFile } from '../programmable-units/type-script-file/parseTypeScriptFile';
import { getTypeScriptFileRelationshipList } from '../programmable-units/type-script-file-relationships/getTypeScriptFileRelationshipList';

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

    getTypeScriptFileRelationshipList,
    digraphificateTypeScriptFileRelationshipList,

    encodeDirectedGraphAsGraphvizCode,
    renderGraphvizCodeToSvgDocument,
    addInteractivityToSvgDocument,
  ],
  quirmDebugger: buildQuirmDebugger('renderTypeScriptFileRelationships'),
});
