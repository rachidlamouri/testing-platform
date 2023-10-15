import childProcessUtility from 'child_process';
import fs from 'fs';
import { buildProgrammedTransform } from '../../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  OUTPUT_FILE_COLLECTION_ID,
  OutputFileStreamMetatype,
} from '../../../../programmable-units/output-file/outputFile';
import {
  GenericProgramErrorEgg,
  GenericProgramErrorStreamMetatype,
  PROGRAM_ERROR_COLLECTION_ID,
} from '../../../../programmable-units/error/programError';
import {
  APP_RENDERER_DELAYER_COLLECTION_ID,
  AppRendererDelayerStreamMetatype,
} from '../../appRendererDelayer';

/**
 * Generates the knowledge graph js bundle with esbuild and merges it with an
 * html file
 *
 * @todo add the graphviz output to this html file
 */
export const renderApp = buildProgrammedTransform({
  name: 'renderApp',
})
  .fromCollection2<AppRendererDelayerStreamMetatype>({
    collectionId: APP_RENDERER_DELAYER_COLLECTION_ID,
  })
  .toItem2<OutputFileStreamMetatype>({
    collectionId: OUTPUT_FILE_COLLECTION_ID,
  })
  .toItemTuple2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
  })
  .onTransform(() => {
    const result = childProcessUtility.spawnSync(
      'npx',
      [
        'esbuild',
        '--bundle',
        'packages/mdd-engine/src/adapted-programs/programs/render-knowledge-graph/app/browser/index.tsx',
      ],
      {
        encoding: 'utf-8',
        maxBuffer: 1000000000,
      },
    );

    let programErrorList: GenericProgramErrorEgg[];
    if (result.stderr !== '') {
      const error = Object.assign(
        new Error('Encountered an error in "renderApp"'),
        { stdError: result.stderr },
      );
      programErrorList = [error];
    } else {
      programErrorList = [];
    }

    const jsContents = result.stdout;

    const startingHtmlContents = fs.readFileSync(
      'packages/mdd-engine/src/adapted-programs/programs/render-knowledge-graph/app/browser/index.html',
      { encoding: 'utf-8' },
    );

    const htmlContents = [
      startingHtmlContents,
      '<script>',
      jsContents,
      '</script>',
    ].join('\n');

    return {
      [OUTPUT_FILE_COLLECTION_ID]: {
        fileName: 'rendered-knowledge-graph',
        fileExtensionSuffix: 'html',
        text: htmlContents,
      },
      [PROGRAM_ERROR_COLLECTION_ID]: programErrorList,
    };
  })
  .assemble();
