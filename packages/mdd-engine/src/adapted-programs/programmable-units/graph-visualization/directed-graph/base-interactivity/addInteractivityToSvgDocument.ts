import fs from 'fs';
import { buildProgrammedTransform } from '../../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  SVG_DOCUMENT_COLLECTION_ID,
  SvgDocumentStreamMetatype,
} from '../svg-adapter/svgDocument';
import {
  HTML_FILE_COLLECTION_ID,
  HtmlFileStreamMetatype,
} from '../../../html-file/htmlFile';
import { IdentifiableItemId } from '../../../../../adapter/identifiable-item/identifiableItem';
import {
  OUTPUT_FILE_COLLECTION_ID,
  OutputFileStreamMetatype,
} from '../../../output-file/outputFile';
import { assertNotUndefined } from '../../../../../package-agnostic-utilities/nil/assertNotUndefined';

const INTERACTIVE_HTML_FILE_PATH =
  'packages/mdd-engine/src/adapted-programs/programmable-units/graph-visualization/directed-graph/base-interactivity/interactiveSvg.html';

/**
 * Merges an SVG document with an HTML file template. The HTML file template
 * displays the SVG and applies an interactive pan-zoom handler to it.
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
  .toItem2<OutputFileStreamMetatype>({
    collectionId: OUTPUT_FILE_COLLECTION_ID,
  })
  .onTransform((svgDocument, [templateFile]) => {
    const svgText = svgDocument.document;

    const templateText = fs.readFileSync(
      templateFile.filePath.serialized,
      'utf8',
    );

    const outputTemplate = templateText.replace(
      '<!-- SVG_PLACEHOLDER -->',
      svgText,
    );

    const { outputFileName } = svgDocument.graph;
    assertNotUndefined(outputFileName);

    return {
      fileName: outputFileName,
      fileExtensionSuffix: 'html',
      text: outputTemplate,
    };
  })
  .assemble();
