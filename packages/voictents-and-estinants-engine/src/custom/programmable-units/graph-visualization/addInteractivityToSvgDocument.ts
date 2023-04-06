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
  .andFromGritionTuple<HtmlFileVoictent, [string]>({
    gepp: HTML_FILE_GEPP,
    framate: () => [INTERACTIVE_HTML_FILE_PATH],
    croard: (rightInput) => rightInput.zorn,
  })
  .andFromGritionTuple<DirectedGraphMetadataByIdVoictent, [string]>({
    gepp: DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
    framate: (leftInput) => [leftInput.zorn],
    croard: (rightInput) => rightInput.zorn,
  })
  .toHubblepup<OutputFileVoictent>({
    gepp: OUTPUT_FILE_GEPP,
  })
  .onPinbe((leftInput, [templateFile], [directedGraphMetadataById]) => {
    const svgText = leftInput.grition;

    const templateText = fs.readFileSync(templateFile.filePath, 'utf8');

    const stringifiedMetadataById = JSON.stringify(
      directedGraphMetadataById,
      null,
      2,
    );

    const outputTemplate = templateText
      .replace('<!-- SVG_PLACEHOLDER -->', svgText)
      .replace(
        'const graphMetadataById = {};',
        `const graphMetadataById = JSON.parse(\`${stringifiedMetadataById}\`);`,
      );

    const fileName = leftInput.zorn.replaceAll(/\//g, '-');

    return {
      fileName,
      fileExtensionSuffix: 'html',
      text: outputTemplate,
    };
  })
  .assemble();
