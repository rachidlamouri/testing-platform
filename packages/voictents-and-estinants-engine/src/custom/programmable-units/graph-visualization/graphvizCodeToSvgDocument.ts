import childProcessUtilities from 'child_process';
import * as cheerio from 'cheerio';
import { buildMentursection } from '../../../type-script-adapter/estinant/mentursection';
import { GraphvizCodeVoictent, GRAPHVIZ_CODE_GEPP } from './graphvizCode';
import { SvgDocumentVoictent, SVG_DOCUMENT_GEPP } from './svgDocument';

export const graphvizCodeToSvgDocument = buildMentursection<
  GraphvizCodeVoictent,
  [SvgDocumentVoictent]
>({
  inputGepp: GRAPHVIZ_CODE_GEPP,
  outputGeppTuple: [SVG_DOCUMENT_GEPP],
  pinbe: ({ zorn, grition }) => {
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

    return {
      [SVG_DOCUMENT_GEPP]: [
        {
          zorn: `${zorn}/original`,
          grition: originalDocument,
        },
        {
          zorn: `${zorn}/modified`,
          grition: modifiedDocument,
        },
      ],
    };
  },
});
