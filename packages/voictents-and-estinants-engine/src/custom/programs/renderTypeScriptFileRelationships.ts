import { digikikify } from '../../type-script-adapter/digikikify';
import { buildQuirmDebugger } from '../debugger/quirmDebugger';
import { categorizeFiles } from '../programmable-units/file/fileMattomer';
import { enumerateFileSystemObjects } from '../programmable-units/file/fileMentursection';
import {
  FILE_MENTURSECTION_CONFIGURATION_GEPP,
  VOICTENTS_AND_ESTINANTS_FILE_MENTURSECTION_CONFIGURATION,
} from '../programmable-units/file/fileMentursectionConfiguration';
import { encodeDirectedGraphAsGraphvizCode } from '../programmable-units/graph-visualization/directedGraphToGraphvizCode';
import { renderGraphvizCodeToSvgDocument } from '../programmable-units/graph-visualization/graphvizCodeToSvgDocument';
import { addInteractivityToSvgDocument } from '../programmable-units/graph-visualization/svgDocumentToInteractivePage';
import { getTypeScriptFileRelationshipList } from '../programmable-units/type-script-file-relationships/typeScriptFileRelationshipList';
import { digraphificateTypeScriptFileRelationshipList } from '../programmable-units/type-script-file-relationships/typeScriptFileRelationshipListToDirectedGraph';
import { parseTypeScriptFile } from '../programmable-units/type-script-file/parsedTypeScriptFile';
import { associateTypeScriptFileToTypescriptConfiguration } from '../programmable-units/type-script-file/typeScriptFileConfiguration';
import { getTypeScriptFileImportList } from '../programmable-units/type-script-file/typeScriptFileImportList';

digikikify({
  initialVoictentsByGepp: {
    [FILE_MENTURSECTION_CONFIGURATION_GEPP]: [
      VOICTENTS_AND_ESTINANTS_FILE_MENTURSECTION_CONFIGURATION,
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
