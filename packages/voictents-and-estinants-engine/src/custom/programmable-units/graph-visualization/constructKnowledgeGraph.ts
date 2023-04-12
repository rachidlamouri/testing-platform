import fs from 'fs';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { HtmlFileVoictent, HTML_FILE_GEPP } from '../html-file/htmlFile';
import {
  OutputFileVoictent,
  OUTPUT_FILE_GEPP,
} from '../output-file/outputFile';
import {
  SVG_METADATA_LIST_GEPP,
  SvgMetadataListVoictent,
} from './svgMetadataList';
import {
  DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
  DirectedGraphMetadataByIdVoictent,
} from './directedGraphMetadataById';

const KNOWLEDGE_GRAPH_FILE_PATH =
  'packages/voictents-and-estinants-engine/src/custom/programmable-units/graph-visualization/knowledgeGraphTemplate.html';

export const constructKnowledgeGraph = buildEstinant({
  name: 'constructKnowledgeGraph',
})
  .fromHubblepup<SvgMetadataListVoictent>({
    gepp: SVG_METADATA_LIST_GEPP,
  })
  .andFromGritionTuple<HtmlFileVoictent, [string]>({
    gepp: HTML_FILE_GEPP,
    framate: () => [KNOWLEDGE_GRAPH_FILE_PATH],
    croard: (rightInput) => rightInput.zorn,
  })
  .andFromOdeshinVoictent<DirectedGraphMetadataByIdVoictent>({
    gepp: DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
  })
  .toHubblepup<OutputFileVoictent>({
    gepp: OUTPUT_FILE_GEPP,
  })
  .onPinbe((leftInput, [templateFile], metadataByIdList) => {
    const svgMetadataList = leftInput.grition;

    const navigationItemList = svgMetadataList.map((metadata) => {
      return { text: metadata.label };
    });

    const svgTemplateTextList = svgMetadataList.map((metadata) => {
      const templateDocument = [
        `<!-- ${metadata.label} -->`,
        '<template>',
        metadata.document,
        '</template>',
      ].join('\n');

      return templateDocument;
    });

    const htmlTemplateText = fs.readFileSync(templateFile.filePath, 'utf8');
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

    const fileName = leftInput.zorn.replaceAll(/\//g, '-');

    return {
      fileName,
      fileExtensionSuffix: 'html',
      text: outputTemplate,
    };
  })
  .assemble();
