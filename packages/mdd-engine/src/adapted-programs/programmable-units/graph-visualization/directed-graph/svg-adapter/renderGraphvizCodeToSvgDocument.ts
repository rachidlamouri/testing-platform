import childProcessUtilities from 'child_process';
import { buildProgrammedTransform } from '../../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  SvgDocumentStreamMetatype,
  SVG_DOCUMENT_COLLECTION_ID,
  SvgDocument,
} from './svgDocument';
import {
  GraphvizCodeStreamMetatype,
  GRAPHVIZ_CODE_COLLECTION_ID,
} from '../graphviz-adapter/programmable/graphvizCode';

/**
 * Uses the "dot" program to convert Graphviz code into an SVG HTML document.
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
  .onTransform((code) => {
    const result = childProcessUtilities.spawnSync('dot', ['-Tsvg'], {
      encoding: 'utf8',
      input: code.code,
    });

    const originalDocument = result.output
      .filter((value) => value !== null)
      .join('');

    return new SvgDocument({
      graph: code.graph,
      document: originalDocument,
    });
  })
  .assemble();
