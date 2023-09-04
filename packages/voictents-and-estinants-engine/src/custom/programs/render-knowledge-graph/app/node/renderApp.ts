import childProcessUtility from 'child_process';
import fs from 'fs';
import { buildEstinant } from '../../../../adapter/estinant-builder/estinantBuilder';
import {
  OUTPUT_FILE_GEPP,
  OutputFileVoque,
} from '../../../../programmable-units/output-file/outputFile';
import {
  GenericProgramErrorPelue,
  GenericProgramErrorVoque,
  PROGRAM_ERROR_GEPP,
} from '../../../../programmable-units/error/programError';
import {
  APP_RENDERER_DELAYER_GEPP,
  AppRendererDelayerVoque,
} from '../../appRendererDelayer';

/**
 * Generates the knowledge graph js bundle with esbuild and merges it with an
 * html file
 *
 * @todo add the graphviz output to this html file
 */
export const renderApp = buildEstinant({
  name: 'renderApp',
})
  .fromVoictent2<AppRendererDelayerVoque>({
    gepp: APP_RENDERER_DELAYER_GEPP,
  })
  .toHubblepup2<OutputFileVoque>({
    gepp: OUTPUT_FILE_GEPP,
  })
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe(() => {
    const result = childProcessUtility.spawnSync(
      'npx',
      [
        'esbuild',
        '--bundle',
        'packages/voictents-and-estinants-engine/src/custom/programs/render-knowledge-graph/app/browser/index.tsx',
      ],
      {
        encoding: 'utf-8',
        maxBuffer: 1000000000,
      },
    );

    let programErrorList: GenericProgramErrorPelue[];
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
      'packages/voictents-and-estinants-engine/src/custom/programs/render-knowledge-graph/app/browser/index.html',
      { encoding: 'utf-8' },
    );

    const htmlContents = [
      startingHtmlContents,
      '<script>',
      jsContents,
      '</script>',
    ].join('\n');

    return {
      [OUTPUT_FILE_GEPP]: {
        fileName: 'rendered-knowledge-graph',
        fileExtensionSuffix: 'html',
        text: htmlContents,
      },
      [PROGRAM_ERROR_GEPP]: programErrorList,
    };
  })
  .assemble();
