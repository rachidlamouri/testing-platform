import {
  buildCollectionByCollectionId,
  runEngine,
} from '../../../adapter/engine/runEngine';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
import { PROGRAM_ERROR_COLLECTION_ID } from '../../programmable-units/error/programError';
import { ProgramErrorCollection } from '../../programmable-units/error/programErrorCollection';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { signalError } from '../../programmable-units/error/signalError';
import { OutputFileCollection } from '../../programmable-units/output-file/outputFileCollection';
import { reportErrorCount } from '../../programmable-units/error/reportErrorCount';
import {
  APP_RENDERER_DELAYER_COLLECTION_ID,
  AppRendererDelayerStreamMetatype,
  AppRendererDelayerInstance,
} from '../render-knowledge-graph/appRendererDelayer';
import { renderApp } from '../render-knowledge-graph/app/node/renderApp';
import { InMemoryIdentifiableItem3Collection } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  APPLICATION_CONFIGURATION_COLLECTION_ID,
  ApplicationConfigurationStreamMetatype,
} from '../render-knowledge-graph/app/node/applicationConfiguration';
import { InMemoryCollection } from '../../../layer-agnostic-utilities/collection/inMemoryCollection';
import { applicationConfiguration } from '../render-knowledge-graph/applicationConfiguration';

const programFileCache = new ProgramFileCache({
  namespace: 'develop-knowledge-graph',
});

/**
 * Re-renders the knowledge graph without rebuilding the svgs. You must run
 * "packages/mdd-engine/src/adapted-programs/programs/render-knowledge-graph/renderKnowledgeGraph.ts"
 * at least once for this script to work
 *
 * @usage DEV_KG= npm run dev
 *
 * @canonicalComment
 */
runEngine({
  explicitCollectionTuple: [
    new InMemoryIdentifiableItem3Collection<AppRendererDelayerStreamMetatype>({
      collectionId: APP_RENDERER_DELAYER_COLLECTION_ID,
      initialItemEggTuple: [
        new AppRendererDelayerInstance({
          programmedTransformName: 'n/a',
        }),
      ],
    }),
    new InMemoryCollection<ApplicationConfigurationStreamMetatype>({
      collectionId: APPLICATION_CONFIGURATION_COLLECTION_ID,
      initialItemEggTuple: [applicationConfiguration],
    }),
  ] as const,
  uninferableCollectionByCollectionId: buildCollectionByCollectionId([
    new ProgramErrorCollection({
      programFileCache,
    }),
    new OutputFileCollection({
      programFileCache,
    }),
  ] as const),
  errorCollectionId: PROGRAM_ERROR_COLLECTION_ID,
  programmedTransformTuple: [
    // keep this as a multi-line list for easier debugging
    renderApp,

    reportErrors,
    reportErrorCount,
    signalError,
  ] as const,
  programFileCache,
  serializeeCollectionIdList: [
    // keep this as a multi-line list for easier debugging
  ],
});
