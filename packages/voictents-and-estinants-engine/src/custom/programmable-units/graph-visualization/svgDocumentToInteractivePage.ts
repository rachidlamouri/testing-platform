import fs from 'fs';
import { buildDisatinger } from '../../../type-script-adapter/estinant/disatinger';
import { Vicken } from '../../../type-script-adapter/vicken';
import { Vition } from '../../../type-script-adapter/vition';
import { fileUtilities } from '../../../utilities/debugger/fileUtilities';
import { HtmlFileVoictent, HTML_FILE_GEPP } from '../html-file/htmlFile';
import { SvgDocumentVoictent, SVG_DOCUMENT_GEPP } from './svgDocument';

const INTERACTIVE_HTML_FILE_PATH =
  'packages/voictents-and-estinants-engine/src/custom/programmable-units/graph-visualization/interactiveSvg.html';

export const svgDocumentToInteractivePage = buildDisatinger<
  Vition<
    SvgDocumentVoictent,
    [Vicken<HtmlFileVoictent, [HtmlFileVoictent], string>]
  >
>({
  leftGepp: SVG_DOCUMENT_GEPP,
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

    fileUtilities.writeOutputFile(`${fileId}.html`, outputTemplate);
  },
});
