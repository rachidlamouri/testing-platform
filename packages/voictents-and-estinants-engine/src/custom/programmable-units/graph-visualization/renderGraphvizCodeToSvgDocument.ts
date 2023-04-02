import childProcessUtilities from 'child_process';
import * as cheerio from 'cheerio';
import { GraphvizCodeVoictent, GRAPHVIZ_CODE_GEPP } from './graphvizCode';
import { SvgDocumentVoictent, SVG_DOCUMENT_GEPP } from './svgDocument';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';

export const renderGraphvizCodeToSvgDocument = buildEstinant()
  .fromHubblepup<GraphvizCodeVoictent>({
    gepp: GRAPHVIZ_CODE_GEPP,
  })
  .toHubblepupTuple<SvgDocumentVoictent>({
    gepp: SVG_DOCUMENT_GEPP,
  })
  .onPinbe(({ zorn, grition }) => {
    const result = childProcessUtilities.spawnSync('dot', ['-Tsvg'], {
      encoding: 'utf8',
      input: grition,
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

    return [
      {
        zorn: `${zorn}/original`,
        grition: originalDocument,
      },
      {
        zorn: `${zorn}/modified`,
        grition: modifiedDocument,
      },
    ];
  })
  .assemble();