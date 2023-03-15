import { digikikify } from '../../type-script-adapter/digikikify';
import { debugHubblepup } from '../debugger/debugHubblepup';
import { fileMattomer } from '../programmable-units/file/fileMattomer';
import { fileMentursection } from '../programmable-units/file/fileMentursection';
import {
  FILE_MENTURSECTION_CONFIGURATION_GEPP,
  VOICTENTS_AND_ESTINANTS_FILE_MENTURSECTION_CONFIGURATION,
} from '../programmable-units/file/fileMentursectionConfiguration';
import { directedGraphToGraphvizCode } from '../programmable-units/graph-visualization/directedGraphToGraphvizCode';
import { graphvizCodeToSvgDocument } from '../programmable-units/graph-visualization/graphvizCodeToSvgDocument';
import { svgDocumentToInteractivePage } from '../programmable-units/graph-visualization/svgDocumentToInteractivePage';
import { typeScriptFileRelationshipWattlection } from '../programmable-units/type-script-file-relationships/typeScriptFileRelationshipList';
import { typeScriptFileRelationshipListToDirectedGraph } from '../programmable-units/type-script-file-relationships/typeScriptFileRelationshipListToDirectedGraph';
import { parsedTypeScriptFileMentursection } from '../programmable-units/type-script-file/parsedTypeScriptFile';
import { typeScriptFileConfigurationOnama } from '../programmable-units/type-script-file/typeScriptFileConfiguration';
import { typeScriptFileImportListOnama } from '../programmable-units/type-script-file/typeScriptFileImportList';

digikikify({
  initialVoictentsByGepp: {
    [FILE_MENTURSECTION_CONFIGURATION_GEPP]: [
      VOICTENTS_AND_ESTINANTS_FILE_MENTURSECTION_CONFIGURATION,
    ],
  },
  estinantTuple: [
    fileMentursection,
    fileMattomer,

    typeScriptFileConfigurationOnama,
    parsedTypeScriptFileMentursection,
    typeScriptFileImportListOnama,

    typeScriptFileRelationshipWattlection,
    typeScriptFileRelationshipListToDirectedGraph,

    directedGraphToGraphvizCode,
    graphvizCodeToSvgDocument,
    svgDocumentToInteractivePage,
    // relationshipRendererWortinator,
  ],
  onHubblepupAddedToVoictents: debugHubblepup,
});
