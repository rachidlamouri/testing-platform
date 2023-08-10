import childProcessUtility from 'child_process';
import fs from 'fs';
import { buildEstinant } from '../../../../adapter/estinant-builder/estinantBuilder';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  FileSystemObjectEnumeratorConfigurationVoque,
} from '../../../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import {
  OUTPUT_FILE_GEPP,
  OutputFileVoque,
} from '../../../../programmable-units/output-file/outputFile';

/**
 * Generates the knowledge graph js bundle with esbuild and merges it with an
 * html file
 *
 * @todo add the graphviz output to this html file
 */
export const renderApp = buildEstinant({
  name: 'renderApp',
})
  .fromHubblepup2<FileSystemObjectEnumeratorConfigurationVoque>({
    gepp: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  })
  .toHubblepup2<OutputFileVoque>({
    gepp: OUTPUT_FILE_GEPP,
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
      fileName: 'rendered-knowledge-graph',
      fileExtensionSuffix: 'html',
      text: htmlContents,
    };
  })
  .assemble();
