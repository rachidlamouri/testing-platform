import fs from 'fs';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  SVG_DOCUMENT_GEPP,
  SvgDocumentVoictent,
} from '../graph-visualization/svgDocument';
import { HTML_FILE_GEPP, HtmlFileVoictent } from '../html-file/htmlFile';
import {
  OUTPUT_FILE_GEPP,
  OutputFileVoictent,
} from '../output-file/outputFile';

export const populateHtmlFile = buildEstinant({
  name: 'populateHtmlFile',
})
  .fromGrition<SvgDocumentVoictent>({
    gepp: SVG_DOCUMENT_GEPP,
  })
  .andFromGritionTuple<HtmlFileVoictent, [string]>({
    gepp: HTML_FILE_GEPP,
    framate: () => [
      'packages/voictents-and-estinants-engine/src/custom/programmable-units/minecraft/interactiveSvg.html',
    ],
    croard: (rightInput) => rightInput.zorn,
  })
  .toHubblepup<OutputFileVoictent>({
    gepp: OUTPUT_FILE_GEPP,
  })
  .onPinbe((svgDocument, [templateFile]) => {
    const templateFileContents = fs.readFileSync(templateFile.filePath, 'utf8');

    const text = templateFileContents.replace(
      '<!-- SVG_PLACEHOLDER -->',
      svgDocument,
    );

    return {
      fileName: 'map',
      fileExtensionSuffix: 'html',
      text,
    };
  })
  .assemble();
