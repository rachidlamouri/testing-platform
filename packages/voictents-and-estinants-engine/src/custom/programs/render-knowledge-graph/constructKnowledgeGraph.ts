import fs from 'fs';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  DirectedGraphMetadataByIdVoque,
  DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
} from '../../programmable-units/graph-visualization/directedGraphMetadataById';
import {
  HtmlFileVoque,
  HTML_FILE_GEPP,
} from '../../programmable-units/html-file/htmlFile';
import {
  OutputFileVoque,
  OUTPUT_FILE_GEPP,
} from '../../programmable-units/output-file/outputFile';
import {
  SVG_DOCUMENT_GEPP,
  SvgDocumentVoque,
} from '../../programmable-units/graph-visualization/svgDocument';

const KNOWLEDGE_GRAPH_FILE_PATH =
  'packages/voictents-and-estinants-engine/src/custom/programmable-units/graph-visualization/knowledgeGraphTemplate.html';

/**
 * Combines the knowledge graph HTML template with the SVG graphs and their
 * corresponding labels. Assumes that all svgs belong to a single knowledge
 * graph.
 */
export const constructKnowledgeGraph = buildEstinant({
  name: 'constructKnowledgeGraph',
})
  .fromVoictent2<SvgDocumentVoque>({
    gepp: SVG_DOCUMENT_GEPP,
  })
  .andFromHubblepupTuple2<HtmlFileVoque, [string]>({
    gepp: HTML_FILE_GEPP,
    framate: () => [KNOWLEDGE_GRAPH_FILE_PATH],
    croard: (htmlFile) => htmlFile.hubblepup.filePath,
  })
  .andFromVoictent2<DirectedGraphMetadataByIdVoque>({
    gepp: DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
  })
  .toHubblepup2<OutputFileVoque>({
    gepp: OUTPUT_FILE_GEPP,
  })
  .onPinbe((svgDocumentList, [templateFile], metadataByIdList) => {
    const svgMetadataList = svgDocumentList
      .slice()
      .sort((documentA, documentB) => {
        if (documentA.zorn < documentB.zorn) {
          return -1;
        }

        if (documentA.zorn === documentB.zorn) {
          return 0;
        }

        return 1;
      })
      .map((document) => {
        return {
          label: document.zorn,
          document,
        };
      });

    const navigationItemList = svgMetadataList.map((metadata) => {
      return { text: metadata.label };
    });

    const svgTemplateTextList = svgMetadataList.map((metadata) => {
      const templateDocument = [
        `<!-- ${metadata.label} -->`,
        '<template>',
        metadata.document.grition,
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

    return {
      fileName: 'knowledge-graph',
      fileExtensionSuffix: 'html',
      text: outputTemplate,
    };
  })
  .assemble();
