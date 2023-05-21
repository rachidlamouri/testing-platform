import fs from 'fs';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { HTML_FILE_GEPP, HtmlFileVoque } from '../html-file/htmlFile';
import { OUTPUT_FILE_GEPP, OutputFileVoque } from '../output-file/outputFile';
import {
  CustomDatumTypeName,
  getCustomTypedDatum,
} from '../../../utilities/typed-datum/customTypedDatum';
import { SVG_DOCUMENT_GEPP, SvgDocumentVoque } from './svgDocument';
import {
  DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
  DirectedGraphMetadataByIdVoque,
} from './directedGraphMetadataById';

const INTERACTIVE_HTML_FILE_PATH =
  'packages/voictents-and-estinants-engine/src/custom/programmable-units/graph-visualization/interactiveSvg.html';

// TODO: replace this with a data structure [to ast?] to code generator (I couldn't find one :sad-face:)
const dataStructureToCode = (datum: unknown): string => {
  const typedDatum = getCustomTypedDatum(datum);

  switch (typedDatum.typeName) {
    case CustomDatumTypeName.RootObjectInstance: {
      const middleLineList = Object.entries(typedDatum.datum).map(
        ([key, value]) => {
          const partialKeyCode = dataStructureToCode(key);
          const valueCode = dataStructureToCode(value);

          const keyCode = `[${partialKeyCode}]`;
          return `${keyCode}: ${valueCode},`;
        },
      );

      const lineList = ['{', ...middleLineList, '}'];
      const code = lineList.join('\n');
      return code;
    }
    case CustomDatumTypeName.Array: {
      const middleLineList = typedDatum.datum.map((element) => {
        const elementCode = `${dataStructureToCode(element)},`;
        return elementCode;
      });

      const lineList = ['[', ...middleLineList, ']'];
      const code = lineList.join('\n');
      return code;
    }
    case CustomDatumTypeName.String: {
      const escapedText = typedDatum.datum.replaceAll('`', '\\`');
      const quotedText = `\`${escapedText}\``;
      return quotedText;
    }
    default: {
      throw Error(`Unhandled datum type "${typedDatum.typeName}"`);
    }
  }
};

/**
 * Merges an SVG document with an HTML file template. The HTML file template
 * displays the SVG and applies an interactive pan-zoom handler to it. The
 * template also provides a side panel to render metadata when SVG elements are
 * clicked on.
 */
export const addInteractivityToSvgDocument = buildEstinant({
  name: 'addInteractivityToSvgDocument',
})
  .fromHubblepup2<SvgDocumentVoque>({
    gepp: SVG_DOCUMENT_GEPP,
  })
  .andFromHubblepupTuple2<HtmlFileVoque, [string]>({
    gepp: HTML_FILE_GEPP,
    framate: () => [INTERACTIVE_HTML_FILE_PATH],
    // TODO: add filepath to index
    croard: (rightInput) => rightInput.hubblepup.filePath,
  })
  .andFromHubblepupTuple2<DirectedGraphMetadataByIdVoque, [string]>({
    gepp: DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
    framate: (leftInput) => [leftInput.indexByName.zorn],
    croard: (rightInput) => rightInput.indexByName.zorn,
  })
  .toHubblepup2<OutputFileVoque>({
    gepp: OUTPUT_FILE_GEPP,
  })
  .onPinbe((leftInput, [templateFile], [directedGraphMetadataById]) => {
    const svgText = leftInput.grition;

    const templateText = fs.readFileSync(templateFile.filePath, 'utf8');

    const metadataByIdCode = dataStructureToCode(directedGraphMetadataById);

    const outputTemplate = templateText
      .replace('<!-- SVG_PLACEHOLDER -->', svgText)
      .replace(
        'const graphMetadataById = {};',
        `const graphMetadataById = ${metadataByIdCode};`,
      );

    // TODO: move this renaming responsibility elsewhere
    const fileName = leftInput.zorn.replaceAll(/\//g, '-');

    return {
      fileName,
      fileExtensionSuffix: 'html',
      text: outputTemplate,
    };
  })
  .assemble();
