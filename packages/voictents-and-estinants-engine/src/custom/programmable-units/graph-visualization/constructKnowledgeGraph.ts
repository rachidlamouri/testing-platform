import fs from 'fs';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { HTML_FILE_GEPP, HtmlFileVoque } from '../html-file/htmlFile';
import { OUTPUT_FILE_GEPP, OutputFileVoque } from '../output-file/outputFile';
import {
  SVG_METADATA_LIST_GEPP,
  SvgMetadataListVoque,
} from './svgMetadataList';
import {
  DirectedGraphMetadataByIdVoque,
  DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
} from './directedGraphMetadataById';
import { OdeshinZorn } from '../../adapter/odeshin2';

const KNOWLEDGE_GRAPH_FILE_PATH =
  'packages/voictents-and-estinants-engine/src/custom/programmable-units/graph-visualization/knowledgeGraphTemplate.html';

/**
 * Combines the knowledge graph HTML template with the SVG graphs and their
 * corresponding labels.
 */
export const constructKnowledgeGraph = buildEstinant({
  name: 'constructKnowledgeGraph',
})
  .fromHubblepup2<SvgMetadataListVoque>({
    gepp: SVG_METADATA_LIST_GEPP,
  })
  .andFromHubblepupTuple2<HtmlFileVoque, [OdeshinZorn]>({
    gepp: HTML_FILE_GEPP,
    framate: () => [KNOWLEDGE_GRAPH_FILE_PATH],
    croard: (rightInput) => rightInput.indexByName.zorn,
  })
  .andFromVoictent2<DirectedGraphMetadataByIdVoque>({
    gepp: DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
  })
  .toHubblepup2<OutputFileVoque>({
    gepp: OUTPUT_FILE_GEPP,
  })
  .onPinbe((identifiableSvgMetadataList, [templateFile], metadataByIdList) => {
    const navigationItemList = identifiableSvgMetadataList.grition.map(
      (metadata) => {
        return { text: metadata.label };
      },
    );

    const svgTemplateTextList = identifiableSvgMetadataList.grition.map(
      (metadata) => {
        const templateDocument = [
          `<!-- ${metadata.label} -->`,
          '<template>',
          metadata.document.grition,
          '</template>',
        ].join('\n');

        return templateDocument;
      },
    );

    const htmlTemplateText = fs.readFileSync(templateFile.filePath.serialized, 'utf8');
    const navigationItemListText = JSON.stringify(navigationItemList, null, 2);
    const metadataByIdListText = JSON.stringify(metadataByIdList, null, 2);
    const svgTemplateText = svgTemplateTextList.join('\n');

    const outputTemplate = htmlTemplateText
      .replace(
        'const navigationItemList = [];',
        `const navigationItemList = JSON.parse(\`${navigationItemListText}\`);`,
      )
      .replace(
        'const graphMetadataByIdList = [];',
        `const graphMetadataByIdList = JSON.parse(\`${metadataByIdListText}\`);`,
      )
      .replace('<!-- SVG_TEMPLATE_SET_PLACEHOLDER -->', svgTemplateText);

    const fileName = identifiableSvgMetadataList.zorn.replaceAll(/\//g, '-');

    return {
      fileName,
      fileExtensionSuffix: 'html',
      text: outputTemplate,
    };
  })
  .assemble();
