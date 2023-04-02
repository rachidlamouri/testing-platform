import fs from 'fs';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { HtmlFileVoictent, HTML_FILE_GEPP } from '../html-file/htmlFile';
import {
  OutputFileVoictent,
  OUTPUT_FILE_GEPP,
} from '../output-file/outputFile';
import {
  DirectedGraphMetadataByIdVoictent,
  DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
} from './directedGraphMetadataById';
import { SvgDocumentVoictent, SVG_DOCUMENT_GEPP } from './svgDocument';

const INTERACTIVE_HTML_FILE_PATH =
  'packages/voictents-and-estinants-engine/src/custom/programmable-units/graph-visualization/interactiveSvg.html';

export const addInteractivityToSvgDocument = buildEstinant()
  .fromHubblepup<SvgDocumentVoictent>({
    gepp: SVG_DOCUMENT_GEPP,
  })
  .andFromHubblepupTuple<HtmlFileVoictent, [string]>({
    gepp: HTML_FILE_GEPP,
    framate: () => [INTERACTIVE_HTML_FILE_PATH],
    croard: (rightInput) => rightInput.zorn,
  })
  .andFromHubblepupTuple<DirectedGraphMetadataByIdVoictent, [string]>({
    gepp: DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
    framate: (leftInput) => [leftInput.zorn],
    croard: (rightInput) => rightInput.zorn,
  })
  .toHubblepup<OutputFileVoictent>({
    gepp: OUTPUT_FILE_GEPP,
  })
  .onPinbe(
    (leftInput, [rightInput], [{ grition: directedGraphMetadataById }]) => {
      const svgText = leftInput.grition;
      const templateFile = rightInput.grition;

      const templateText = fs.readFileSync(templateFile.filePath, 'utf8');

      const stringifiedMetadataById = JSON.stringify(
        directedGraphMetadataById,
        null,
        2,
      );

      const outputTemplate = templateText
        .replace('<!-- SVG_PLACEHOLDER -->', svgText)
        .replace(
          'const panelContentById = {};',
          `const panelContentById = JSON.parse(\`${stringifiedMetadataById}\`);`,
        );

      const fileId = leftInput.zorn.replaceAll(/\//g, '-');

      return {
        fileName: fileId,
        fileExtensionSuffix: 'html',
        text: outputTemplate,
      };
    },
  )
  .assemble();
