import childProcessUtilities from 'child_process';
import * as cheerio from 'cheerio';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { GRAPHVIZ_CODE_GEPP, GraphvizCodeVoque } from './graphvizCode';
import { SVG_DOCUMENT_GEPP, SvgDocumentVoque } from './svgDocument';

/**
 * Uses the "dot" program to convert Graphviz code into an SVG HTML document.
 */
export const renderGraphvizCodeToSvgDocument = buildEstinant({
  name: 'renderGraphvizCodeToSvgDocument',
})
  .fromHubblepup2<GraphvizCodeVoque>({
    gepp: GRAPHVIZ_CODE_GEPP,
  })
  .toHubblepup2<SvgDocumentVoque>({
    gepp: SVG_DOCUMENT_GEPP,
  })
  .onPinbe((identifiableCode) => {
    const result = childProcessUtilities.spawnSync('dot', ['-Tsvg'], {
      encoding: 'utf8',
      input: identifiableCode.grition,
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
      zorn: identifiableCode.zorn,
      grition: modifiedDocument,
    };
  })
  .assemble();
