import fs from 'fs';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  HTML_FILE_COLLECTION_ID,
  HtmlFileStreamMetatype,
} from '../html-file/htmlFile';
import {
  OUTPUT_FILE_COLLECTION_ID,
  OutputFileStreamMetatype,
} from '../output-file/outputFile';
import {
  CustomDatumTypeName,
  getCustomTypedDatum,
} from '../../../package-agnostic-utilities/typed-datum/customTypedDatum';
import {
  SVG_DOCUMENT_COLLECTION_ID,
  SvgDocumentStreamMetatype,
} from './svgDocument';
import {
  DIRECTED_GRAPH_METADATA_BY_ID_COLLECTION_ID,
  DirectedGraphMetadataByIdStreamMetatype,
} from './directedGraphMetadataById';
import { IdentifiableItemId } from '../../../adapter/identifiable-item/identifiableItem';

const INTERACTIVE_HTML_FILE_PATH =
  'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/graph-visualization/interactiveSvg.html';

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
export const addInteractivityToSvgDocument = buildProgrammedTransform({
  name: 'addInteractivityToSvgDocument',
})
  .fromItem2<SvgDocumentStreamMetatype>({
    collectionId: SVG_DOCUMENT_COLLECTION_ID,
  })
  .andFromItemTuple2<HtmlFileStreamMetatype, [IdentifiableItemId]>({
    collectionId: HTML_FILE_COLLECTION_ID,
    getRightKeyTuple: () => [INTERACTIVE_HTML_FILE_PATH],
    // TODO: add filepath to index
    getRightKey: (rightInput) => rightInput.item.filePath.serialized,
  })
  .andFromItemTuple2<
    DirectedGraphMetadataByIdStreamMetatype,
    [IdentifiableItemId]
  >({
    collectionId: DIRECTED_GRAPH_METADATA_BY_ID_COLLECTION_ID,
    getRightKeyTuple: (leftInput) => [leftInput.item.id],
    getRightKey: (rightInput) => rightInput.item.id,
  })
  .toItem2<OutputFileStreamMetatype>({
    collectionId: OUTPUT_FILE_COLLECTION_ID,
  })
  .onTransform(
    (leftInput, [templateFile], [{ subitem: directedGraphMetadataById }]) => {
      const svgText = leftInput.subitem;

      const templateText = fs.readFileSync(
        templateFile.filePath.serialized,
        'utf8',
      );

      const metadataByIdCode = dataStructureToCode(directedGraphMetadataById);

      const outputTemplate = templateText
        .replace('<!-- SVG_PLACEHOLDER -->', svgText)
        .replace(
          'const graphMetadataById = {};',
          `const graphMetadataById = ${metadataByIdCode};`,
        );

      // TODO: move this renaming responsibility elsewhere
      const fileName = leftInput.id
        .replace(/^graph:/, '')
        .replaceAll(/\//g, '-');

      return {
        fileName,
        fileExtensionSuffix: 'html',
        text: outputTemplate,
      };
    },
  )
  .assemble();
