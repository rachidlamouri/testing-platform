import childProcessUtilities from 'child_process';
import * as cheerio from 'cheerio';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  GRAPHVIZ_CODE_COLLECTION_ID,
  GraphvizCodeStreamMetatype,
} from './graphvizCode';
import {
  SVG_DOCUMENT_COLLECTION_ID,
  SvgDocumentStreamMetatype,
} from './svgDocument';

/**
 * Uses the "dot" program to convert Graphviz code into an SVG HTML document and
 * uses Cheerio to modify the document.
 */
export const renderGraphvizCodeToSvgDocument = buildProgrammedTransform({
  name: 'renderGraphvizCodeToSvgDocument',
})
  .fromItem2<GraphvizCodeStreamMetatype>({
    collectionId: GRAPHVIZ_CODE_COLLECTION_ID,
  })
  .toItem2<SvgDocumentStreamMetatype>({
    collectionId: SVG_DOCUMENT_COLLECTION_ID,
  })
  .onTransform((identifiableCode) => {
    const result = childProcessUtilities.spawnSync('dot', ['-Tsvg'], {
      encoding: 'utf8',
      input: identifiableCode.subitem,
    });

    const originalDocument = result.output
      .filter((value) => value !== null)
      .join('');

    const $ = cheerio.load(originalDocument);

    const $svg = $('svg');

    $svg.attr('width', '100%');
    $svg.attr('height', '100%');

    const escapePathSeparator = (x: string): string =>
      x.replaceAll(/(\/|\.)/g, '_');

    $svg.find('.node').each((index, element) => {
      const $element = $(element);
      const id = $element.attr('id') ?? '';
      $element.attr('id', escapePathSeparator(id));
      const [tailId, headId] = id.split(':');
      $element.addClass(`tail-${tailId}`);
      $element.addClass(`head-${headId}`);
    });

    if ($svg.find('.node').length === 0) {
      $svg.find('g').append(`<text font-size="18">:(</text>`);
    }

    // TODO: get rid of this convention where its looking for tailId:headId. It's confusing and the concern leaks into other files
    $svg.find('.edge').each((index, element) => {
      const $element = $(element);
      const id = $element.attr('id') ?? '';
      $element.removeAttr('id');
      const [tailId, headId] = id.split(':');
      $element.addClass(`tail-${escapePathSeparator(tailId)}`);
      $element.addClass(`head-${escapePathSeparator(headId)}`);
    });

    $svg.find('.edge > path').attr('stroke', 'gray');
    $svg.find('.edge > polygon').attr('stroke', 'gray');
    $svg.find('.edge > polygon').attr('fill', 'gray');

    const modifiedDocument = $svg.toString() ?? '';
    return {
      id: identifiableCode.id,
      subitem: modifiedDocument,
    };
  })
  .assemble();
