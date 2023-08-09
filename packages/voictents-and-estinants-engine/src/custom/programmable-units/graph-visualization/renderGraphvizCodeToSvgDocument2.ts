import childProcessUtilities from 'child_process';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { GRAPHVIZ_CODE_GEPP, GraphvizCodeVoque } from './graphvizCode';
import { SVG_DOCUMENT_GEPP, SvgDocumentVoque } from './svgDocument';

/**
 * Uses the "dot" program to convert Graphviz code into an SVG HTML document.
 */
export const renderGraphvizCodeToSvgDocument2 = buildEstinant({
  name: 'renderGraphvizCodeToSvgDocument2',
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

    return {
      zorn: identifiableCode.zorn,
      grition: originalDocument,
    };
  })
  .assemble();
