import { InMemoryCollection } from '../../../layer-agnostic-utilities/collection/inMemoryCollection';
import {
  buildVoictentByGepp,
  digikikify,
} from '../../../adapter/engine/digikikify';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
import { PROGRAM_ERROR_GEPP } from '../../programmable-units/error/programError';
import { ProgramErrorVoictent } from '../../programmable-units/error/programErrorVoictent';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { signalError } from '../../programmable-units/error/signalError';
import { OutputFileVoictent } from '../../programmable-units/output-file/outputFileVoictent';
import { reportErrorCount } from '../../programmable-units/error/reportErrorCount';
import {
  APP_RENDERER_DELAYER_GEPP,
  AppRendererDelayerVoque,
  AppRendererDelayerInstance,
} from '../render-knowledge-graph/appRendererDelayer';
import { renderApp } from '../render-knowledge-graph/app/node/renderApp';

const programFileCache = new ProgramFileCache({
  namespace: 'develop-knowledge-graph',
});

/**
 * Re-renders the knowledge graph without rebuilding the svgs. You must run
 * "packages/voictents-and-estinants-engine/src/adapted-programs/programs/render-knowledge-graph/renderKnowledgeGraph.ts"
 * at least once for this script to work
 *
 * @usage DEV_KG= npm run dev
 *
 * @canonicalComment
 */
digikikify({
  explicitVoictentTuple: [
    new InMemoryCollection<AppRendererDelayerVoque>({
      collectionId: APP_RENDERER_DELAYER_GEPP,
      initialItemEggTuple: [
        new AppRendererDelayerInstance({
          estinantName: 'n/a',
        }),
      ],
    }),
  ] as const,
  fileSystemNodeGeppCombination: {},
  uninferableVoictentByGepp: buildVoictentByGepp([
    new ProgramErrorVoictent({
      programFileCache,
    }),
    new OutputFileVoictent({
      programFileCache,
    }),
  ] as const),
  errorGepp: PROGRAM_ERROR_GEPP,
  estinantTuple: [
    // keep this as a multi-line list for easier debugging
    renderApp,

    reportErrors,
    reportErrorCount,
    signalError,
  ] as const,
  programFileCache,
  serializeeGeppList: [
    // keep this as a multi-line list for easier debugging
  ],
});
