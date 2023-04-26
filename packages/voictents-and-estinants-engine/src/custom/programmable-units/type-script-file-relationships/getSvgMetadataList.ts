import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  SVG_DOCUMENT_GEPP,
  SvgDocumentVoictent,
} from '../graph-visualization/svgDocument';
import {
  SVG_METADATA_LIST_GEPP,
  SvgMetadataListVoictent,
} from '../graph-visualization/svgMetadataList';
import {
  EXTERNAL_BOUNDARY_ZORN,
  LIMBO_BOUNDARY_ZORN,
  OVERVIEW_BOUNDARY_ZORN,
} from './graph-element/boundaryConfiguration';
import { RootDirectoryVoictent, ROOT_DIRECTORY_GEPP } from './rootDirectory';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from './typeScriptFileRelationshipGraphZorn';

/**
 * Acquires the metadata needed to populate the tabs on the left in the
 * knowledge graph as well as their associated SVG documents. This transform
 * also dictates the ordering of the labels in the knowledge graph.
 */
export const getSvgMetadataList = buildEstinant({
  name: 'getSvgMetadataList',
})
  .fromVoictent<SvgDocumentVoictent>({
    gepp: SVG_DOCUMENT_GEPP,
  })
  .andFromGritionTuple<RootDirectoryVoictent, [string]>({
    gepp: ROOT_DIRECTORY_GEPP,
    framate: () => [TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN],
    croard: (rightInput) => rightInput.zorn,
  })
  .toHubblepup<SvgMetadataListVoictent>({
    gepp: SVG_METADATA_LIST_GEPP,
  })
  .onPinbe((svgDocumentInputList, [rootDirectory]) => {
    return {
      zorn: TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN,
      grition: svgDocumentInputList
        .slice()
        .sort((a, b) => {
          if (a.zorn === OVERVIEW_BOUNDARY_ZORN) {
            return -1;
          }

          if (b.zorn === OVERVIEW_BOUNDARY_ZORN) {
            return 1;
          }

          if (a.zorn === LIMBO_BOUNDARY_ZORN) {
            return 1;
          }

          if (b.zorn === LIMBO_BOUNDARY_ZORN) {
            return -1;
          }

          if (a.zorn === EXTERNAL_BOUNDARY_ZORN) {
            return 1;
          }

          if (b.zorn === EXTERNAL_BOUNDARY_ZORN) {
            return -1;
          }

          if (a.zorn < b.zorn) {
            return -1;
          }

          return 1;
        })
        .map(({ zorn, grition }) => {
          const filePath = zorn;
          const label = filePath.replace(
            `internal/${rootDirectory.directoryPath}/`,
            '',
          );

          return {
            label,
            document: grition,
          };
        }),
    };
  })
  .assemble();
