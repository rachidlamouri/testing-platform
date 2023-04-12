import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  SVG_DOCUMENT_GEPP,
  SvgDocumentVoictent,
} from '../graph-visualization/svgDocument';
import {
  SVG_METADATA_LIST_GEPP,
  SvgMetadataListVoictent,
} from '../graph-visualization/svgMetadataList';
import { RootDirectoryVoictent, ROOT_DIRECTORY_GEPP } from './rootDirectory';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from './typeScriptFileRelationshipGraphZorn';

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
      grition: svgDocumentInputList.map(({ zorn, grition }) => {
        const filePath = zorn;
        const label = filePath
          .replace(/^internal\//, '')
          .replace(`${rootDirectory.directoryPath}/`, '');

        return {
          label,
          document: grition,
        };
      }),
    };
  })
  .assemble();
