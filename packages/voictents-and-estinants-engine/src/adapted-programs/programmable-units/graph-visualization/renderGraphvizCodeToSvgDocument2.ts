import childProcessUtilities from 'child_process';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { GRAPHVIZ_CODE_GEPP, GraphvizCodeVoque } from './graphvizCode';
import {
  SVG_DOCUMENT_COLLECTION_ID,
  SvgDocumentStreamMetatype,
} from './svgDocument';

/**
 * Uses the "dot" program to convert Graphviz code into an SVG HTML document.
 */
export const renderGraphvizCodeToSvgDocument2 = buildProgrammedTransform({
  name: 'renderGraphvizCodeToSvgDocument2',
})
  .fromItem2<GraphvizCodeVoque>({
    collectionId: GRAPHVIZ_CODE_GEPP,
  })
  .toItem2<SvgDocumentStreamMetatype>({
    collectionId: SVG_DOCUMENT_COLLECTION_ID,
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
      id: identifiableCode.id,
      subitem: originalDocument,
    };
  })
  .assemble();
