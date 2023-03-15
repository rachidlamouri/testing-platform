import fs from 'fs';
import { buildWattlection } from '../../../type-script-adapter/estinant/wattlection';
import { Vicken } from '../../../type-script-adapter/vicken';
import { Vition } from '../../../type-script-adapter/vition';
import { HtmlFileVoictent, HTML_FILE_GEPP } from '../html-file/htmlFile';
import {
  OutputFileVoictent,
  OUTPUT_FILE_GEPP,
} from '../output-file/outputFile';
import { SvgDocumentVoictent, SVG_DOCUMENT_GEPP } from './svgDocument';

const INTERACTIVE_HTML_FILE_PATH =
  'packages/voictents-and-estinants-engine/src/custom/programmable-units/graph-visualization/interactiveSvg.html';

export const svgDocumentToInteractivePage = buildWattlection<
  Vition<
    SvgDocumentVoictent,
    [Vicken<HtmlFileVoictent, [HtmlFileVoictent], string>]
  >,
  OutputFileVoictent
>({
  leftGepp: SVG_DOCUMENT_GEPP,
  outputGepp: OUTPUT_FILE_GEPP,
  rightAppreffingeTuple: [
    {
      gepp: HTML_FILE_GEPP,
      framate: (): [string] => [INTERACTIVE_HTML_FILE_PATH],
      croard: (rightInput): string => rightInput.zorn,
    },
  ],
  pinbe: (leftInput, [rightInput]) => {
    const svgText = leftInput.grition;
    const templateFile = rightInput.grition;

    const templateText = fs.readFileSync(templateFile.filePath, 'utf8');

    const outputTemplate = templateText.replace(
      '<!-- SVG_PLACEHOLDER -->',
      svgText,
    );

    const fileId = leftInput.zorn.replaceAll(/\//g, '-');

    return {
      fileName: fileId,
      fileExtensionSuffix: 'html',
      text: outputTemplate,
    };
  },
});
