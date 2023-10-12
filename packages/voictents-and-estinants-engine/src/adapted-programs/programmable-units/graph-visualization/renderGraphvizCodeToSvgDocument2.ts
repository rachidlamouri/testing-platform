import childProcessUtilities from 'child_process';
import { buildProgrammedTransform } from '../../../adapter/estinant-builder/buildEstinant';
import { GRAPHVIZ_CODE_GEPP, GraphvizCodeVoque } from './graphvizCode';
import { SVG_DOCUMENT_GEPP, SvgDocumentVoque } from './svgDocument';

/**
 * Uses the "dot" program to convert Graphviz code into an SVG HTML document.
 */
export const renderGraphvizCodeToSvgDocument2 = buildProgrammedTransform({
  name: 'renderGraphvizCodeToSvgDocument2',
})
  .fromItem2<GraphvizCodeVoque>({
    collectionId: GRAPHVIZ_CODE_GEPP,
  })
  .toItem2<SvgDocumentVoque>({
    collectionId: SVG_DOCUMENT_GEPP,
  })
  .onTransform((identifiableCode) => {
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
