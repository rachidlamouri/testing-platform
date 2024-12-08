import {
  runEngine,
  buildCollectionByCollectionId,
} from '../../../adapter/engine/runEngine';
import { InMemoryCollection } from '../../../layer-agnostic-utilities/collection/inMemoryCollection';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
  FileSystemObjectEnumeratorConfigurationStreamMetatype,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { PROGRAM_ERROR_COLLECTION_ID } from '../../programmable-units/error/programError';
import { ProgramErrorCollection } from '../../programmable-units/error/programErrorCollection';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { reportErrorCount } from '../../programmable-units/error/reportErrorCount';
import { signalError } from '../../programmable-units/error/signalError';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
import { assertFileExtensionIsKnown } from '../categorize-files/assertFileExtensionIsKnown';
import { buildDefaultFileCollectionTuple } from '../../programmable-units/file/buildDefaultFileCollectionTuple';
import { renderApp } from '../render-knowledge-graph/app/node/renderApp';
import {
  ApplicationConfigurationStreamMetatype,
  APPLICATION_CONFIGURATION_COLLECTION_ID,
  ApplicationConfiguration,
} from '../render-knowledge-graph/app/node/applicationConfiguration';
import { OutputFileCollection } from '../../programmable-units/output-file/outputFileCollection';
import { parseInput } from './parseInput';
import { InMemoryIdentifiableItem3Collection } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  AppRendererDelayerStreamMetatype,
  APP_RENDERER_DELAYER_COLLECTION_ID,
  AppRendererDelayerInstance,
} from '../render-knowledge-graph/appRendererDelayer';
import { groupGraphElements } from '../../programmable-units/graph-visualization/directed-graph/element-group/groupGraphElements';
import { encodeDirectedGraphAsGraphvizCode } from '../../programmable-units/graph-visualization/directed-graph/graphviz-adapter/programmable/encodeDirectedGraphAsGraphvizCode';
import { renderGraphvizCodeToSvgDocument } from '../../programmable-units/graph-visualization/directed-graph/svg-adapter/renderGraphvizCodeToSvgDocument';
import { addInteractivityToSvgDocument } from '../../programmable-units/graph-visualization/directed-graph/base-interactivity/addInteractivityToSvgDocument';
import { buildGraphElements } from './buildGraphElements';

const programFileCache = new ProgramFileCache({
  namespace: 'render-rocket-league-knowledge-graph',
});

runEngine({
  explicitCollectionTuple: [
    new InMemoryCollection<FileSystemObjectEnumeratorConfigurationStreamMetatype>(
      {
        collectionId: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
        initialItemEggTuple: [
          {
            directoryPath:
              'packages/mdd-engine/src/adapted-programs/programs/render-rocket-league-knowledge-graph',
            ignoredNodePathConfigurationList: [],
          },
          {
            directoryPath:
              'packages/mdd-engine/src/adapted-programs/programmable-units/graph-visualization/directed-graph/base-interactivity',
            ignoredNodePathConfigurationList: [],
          },
        ],
      },
    ),
    new OutputFileCollection({
      programFileCache,
    }),
    new InMemoryCollection<ApplicationConfigurationStreamMetatype>({
      collectionId: APPLICATION_CONFIGURATION_COLLECTION_ID,
      initialItemEggTuple: [
        new ApplicationConfiguration({
          inputTypeScriptFilePath:
            'packages/mdd-engine/src/adapted-programs/programs/render-rocket-league-knowledge-graph/app/index.tsx',
          outputHtmlFileName: 'rocket-league-knowledge-graph',
        }),
      ],
    }),
    new InMemoryIdentifiableItem3Collection<AppRendererDelayerStreamMetatype>({
      collectionId: APP_RENDERER_DELAYER_COLLECTION_ID,
      initialItemEggTuple: [
        new AppRendererDelayerInstance({
          programmedTransformName: 'n/a',
        }),
      ],
    }),
  ] as const,
  uninferableCollectionByCollectionId: buildCollectionByCollectionId([
    ...buildDefaultFileCollectionTuple(),
    new ProgramErrorCollection({
      programFileCache,
    }),
  ] as const),
  errorCollectionId: PROGRAM_ERROR_COLLECTION_ID,
  programmedTransformTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    assertFileExtensionIsKnown,

    parseInput,
    buildGraphElements,

    groupGraphElements,
    encodeDirectedGraphAsGraphvizCode,
    renderGraphvizCodeToSvgDocument,
    addInteractivityToSvgDocument,

    renderApp,

    reportErrors,
    reportErrorCount,
    signalError,
  ] as const,
  serializeeCollectionIdList: [
    // keep this as a multi-line list for easier debugging
    'parsed-input',
  ],
  programFileCache,
});
