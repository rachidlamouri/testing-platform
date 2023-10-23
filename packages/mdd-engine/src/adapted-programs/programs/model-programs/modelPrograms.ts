import {
  buildCollectionByCollectionId,
  runEngine,
} from '../../../adapter/engine/runEngine';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
  FileSystemObjectEnumeratorConfigurationStreamMetatype,
  COLLECTIONS_AND_PROGRAMMED_TRANSFORMS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import { associateTypeScriptFileToTypescriptConfiguration } from '../../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import {
  ENGINE_FUNCTION_CONFIGURATION_LIST,
  ENGINE_FUNCTION_CONFIGURATION_COLLECTION_ID,
  EngineFunctionConfigurationStreamMetatype,
} from '../../programmable-units/engine-program-model/engineFunctionConfiguration';
import { parseTypeScriptFile } from '../../programmable-units/type-script-file/parseTypeScriptFile';
import { getTypeScriptFileImportList } from '../../programmable-units/type-script-file/getTypeScriptFileImportList';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { getCommentedProgramBodyDeclarationList } from '../../programmable-units/type-script-file/getCommentedProgramBodyDeclarationList';
import { filterEngineProgramFile } from '../../programmable-units/engine-program-model/filterEngineProgramFile';
import { signalError } from '../../programmable-units/error/signalError';
import { InMemoryCollection } from '../../../layer-agnostic-utilities/collection/inMemoryCollection';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
import { ProgramErrorCollection } from '../../programmable-units/error/programErrorCollection';
import { OutputFileCollection } from '../../programmable-units/output-file/outputFileCollection';
import { EngineRunnerStrategy } from '../../../core/engine/runEngine';
import { PROGRAM_ERROR_COLLECTION_ID } from '../../programmable-units/error/programError';
import { buildDefaultFileCollectionTuple } from '../../programmable-units/file/buildDefaultFileCollectionTuple';
import { reportFailedLintAssertion } from '../../programmable-units/linting/reportFailedLintAssertion';
import {
  LINT_ASSERTION_OMISSION_COLLECTION_ID,
  LintAssertionOmissionCollection,
  LintAssertionOmissionStreamMetatype,
  NULL_OMISSION,
} from '../../programmable-units/linting/lintAssertionOmission';
import { reportErrorCount } from '../../programmable-units/error/reportErrorCount';
import { parseTypeScriptFileComments } from '../../programmable-units/type-script-file/parseTypeScriptFileComments';
import {
  COLLECTION_DEFINITION_LOCATOR_COLLECTION_ID,
  CollectionDefinitionLocatorStreamMetatype,
} from '../../programmable-units/engine-program-model/collection-definition/collectionDefinitionLocator';
import {
  ITEM_DEFINITION_LOCATOR_COLLECTION_ID,
  ItemDefinitionLocatorStreamMetatype,
} from '../../programmable-units/engine-program-model/item-definition/itemDefinitionLocator';
import {
  COLLECTION_INSTANCE_SKELETON_COLLECTION_ID,
  CollectionInstanceSkeletonStreamMetatype,
} from '../../programmable-units/engine-program-model/collection-instance/collectionInstanceSkeleton';
import { parseProgramFile } from '../../programmable-units/engine-program-model/program-file-parser/parseProgramFile';
import { InMemoryIdentifiableItem3Collection } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  PROGRAMMED_TRANSFORM_LOCATOR_COLLECTION_ID,
  ProgrammedTransformLocatorStreamMetatype,
} from '../../programmable-units/engine-program-model/programmed-transform/programmedTransformLocator';
import {
  PROGRAM_SKELETON_COLLECTION_ID,
  ProgramSkeletonStreamMetatype,
} from '../../programmable-units/engine-program-model/program/programSkeleton';
import { parseItemDefinition } from '../../programmable-units/engine-program-model/item-definition/parseItemDefinition';
import {
  PROGRAMMED_TRANSFORM_SKELETON_COLLECTION_ID,
  ProgrammedTransformSkeletonStreamMetatype,
} from '../../programmable-units/engine-program-model/programmed-transform/programmedTransformSkeleton';
import {
  PROGRAMMED_TRANSFORM_INPUT_SKELETON_COLLECTION_ID,
  ProgrammedTransformInputSkeletonStreamMetatype,
} from '../../programmable-units/engine-program-model/programmed-transform/input/programmedTransformInputSkeleton';
import {
  PROGRAMMED_TRANSFORM_OUTPUT_SKELETON_COLLECTION_ID,
  ProgrammedTransformOutputSkeletonStreamMetatype,
} from '../../programmable-units/engine-program-model/programmed-transform/output/programmedTransformOutputSkeleton';
import {
  PROGRAMMED_TRANSFORM_INPUT_MODEL_COLLECTION_ID,
  ProgrammedTransformInputModelStreamMetatype,
} from '../../programmable-units/engine-program-model/programmed-transform/input/programmedTransformInputModel';
import {
  PROGRAMMED_TRANSFORM_OUTPUT_MODEL_COLLECTION_ID,
  ProgrammedTransformOutputModelStreamMetatype,
} from '../../programmable-units/engine-program-model/programmed-transform/output/programmedTransformOutputModel';
import { buildProgrammedTransformInputModel } from '../../programmable-units/engine-program-model/programmed-transform/input/buildProgrammedTransformInputModel';
import { buildProgrammedTransformOutputModel } from '../../programmable-units/engine-program-model/programmed-transform/output/buildProgrammedTransformOutputModel';
import { buildProgrammedTransformModel } from '../../programmable-units/engine-program-model/programmed-transform/buildProgrammedTransformModel';
import {
  PROGRAMMED_TRANSFORM_MODEL_COLLECTION_ID,
  ProgrammedTransformModelStreamMetatype,
} from '../../programmable-units/engine-program-model/programmed-transform/programmedTransformModel';
import { renderApp } from '../render-knowledge-graph/app/node/renderApp';
import {
  APPLICATION_CONFIGURATION_COLLECTION_ID,
  ApplicationConfiguration,
  ApplicationConfigurationStreamMetatype,
} from '../render-knowledge-graph/app/node/applicationConfiguration';
import {
  AppRendererDelayerStreamMetatype,
  APP_RENDERER_DELAYER_COLLECTION_ID,
  AppRendererDelayerInstance,
} from '../render-knowledge-graph/appRendererDelayer';
import { getAllGraphElements } from '../../programmable-units/engine-program-model/getAllGraphElements';
import { groupGraphElements } from '../../programmable-units/graph-visualization/directed-graph/element-group/groupGraphElements';
import { encodeDirectedGraphAsGraphvizCode } from '../../programmable-units/graph-visualization/directed-graph/graphviz-adapter/programmable/encodeDirectedGraphAsGraphvizCode';
import { renderGraphvizCodeToSvgDocument } from '../../programmable-units/graph-visualization/directed-graph/svg-adapter/renderGraphvizCodeToSvgDocument';
import { addInteractivityToSvgDocument } from '../../programmable-units/graph-visualization/directed-graph/base-interactivity/addInteractivityToSvgDocument';
import { buildProgramModel } from '../../programmable-units/engine-program-model/program/buildProgramModel';
import { parseProgrammedTransform } from '../../programmable-units/engine-program-model/programmed-transform-parser/parseProgrammedTransform';
import { captureOutputFileDigestList } from '../../programmable-units/sanity-snapshot/captureOutputFileDigestList';
import { SANITY_SNAPSHOT_COLLECTION_ID } from '../../programmable-units/sanity-snapshot/sanitySnapshot';

const programFileCache = new ProgramFileCache({
  namespace: 'modelPrograms',
});

/**
 * Creates an interactive model for each engine program.
 *
 * @canonicalComment
 */
runEngine({
  explicitCollectionTuple: [
    new InMemoryCollection<FileSystemObjectEnumeratorConfigurationStreamMetatype>(
      {
        collectionId: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
        initialItemEggTuple: [
          COLLECTIONS_AND_PROGRAMMED_TRANSFORMS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
        ],
      },
    ),
    new InMemoryCollection<EngineFunctionConfigurationStreamMetatype>({
      collectionId: ENGINE_FUNCTION_CONFIGURATION_COLLECTION_ID,
      initialItemEggTuple: ENGINE_FUNCTION_CONFIGURATION_LIST,
    }),
    new LintAssertionOmissionCollection<LintAssertionOmissionStreamMetatype>({
      collectionId: LINT_ASSERTION_OMISSION_COLLECTION_ID,
      // TODO: fix and remove omissions
      initialItemEggTuple: [
        // keep this multiline
        NULL_OMISSION,
      ],
    }),
    new InMemoryIdentifiableItem3Collection<CollectionDefinitionLocatorStreamMetatype>(
      {
        collectionId: COLLECTION_DEFINITION_LOCATOR_COLLECTION_ID,
        continueOnDuplicate: true,
      },
    ),
    new InMemoryIdentifiableItem3Collection<ItemDefinitionLocatorStreamMetatype>(
      {
        collectionId: ITEM_DEFINITION_LOCATOR_COLLECTION_ID,
        continueOnDuplicate: true,
      },
    ),
    new InMemoryIdentifiableItem3Collection<CollectionInstanceSkeletonStreamMetatype>(
      {
        collectionId: COLLECTION_INSTANCE_SKELETON_COLLECTION_ID,
        continueOnDuplicate: false,
      },
    ),
    new InMemoryIdentifiableItem3Collection<ProgrammedTransformLocatorStreamMetatype>(
      {
        collectionId: PROGRAMMED_TRANSFORM_LOCATOR_COLLECTION_ID,
        continueOnDuplicate: true,
      },
    ),
    new InMemoryIdentifiableItem3Collection<ProgramSkeletonStreamMetatype>({
      collectionId: PROGRAM_SKELETON_COLLECTION_ID,
      continueOnDuplicate: false,
    }),
    new InMemoryIdentifiableItem3Collection<ProgrammedTransformSkeletonStreamMetatype>(
      {
        collectionId: PROGRAMMED_TRANSFORM_SKELETON_COLLECTION_ID,
        continueOnDuplicate: false,
      },
    ),
    new InMemoryIdentifiableItem3Collection<ProgrammedTransformInputSkeletonStreamMetatype>(
      {
        collectionId: PROGRAMMED_TRANSFORM_INPUT_SKELETON_COLLECTION_ID,
        continueOnDuplicate: false,
      },
    ),
    new InMemoryIdentifiableItem3Collection<ProgrammedTransformOutputSkeletonStreamMetatype>(
      {
        collectionId: PROGRAMMED_TRANSFORM_OUTPUT_SKELETON_COLLECTION_ID,
        continueOnDuplicate: false,
      },
    ),
    new InMemoryIdentifiableItem3Collection<ProgrammedTransformInputModelStreamMetatype>(
      {
        collectionId: PROGRAMMED_TRANSFORM_INPUT_MODEL_COLLECTION_ID,
        continueOnDuplicate: false,
      },
    ),
    new InMemoryIdentifiableItem3Collection<ProgrammedTransformOutputModelStreamMetatype>(
      {
        collectionId: PROGRAMMED_TRANSFORM_OUTPUT_MODEL_COLLECTION_ID,
        continueOnDuplicate: false,
      },
    ),
    new InMemoryIdentifiableItem3Collection<ProgrammedTransformModelStreamMetatype>(
      {
        collectionId: PROGRAMMED_TRANSFORM_MODEL_COLLECTION_ID,
        continueOnDuplicate: false,
      },
    ),
    new InMemoryCollection<ApplicationConfigurationStreamMetatype>({
      collectionId: APPLICATION_CONFIGURATION_COLLECTION_ID,
      initialItemEggTuple: [
        new ApplicationConfiguration({
          inputTypeScriptFilePath:
            'packages/mdd-engine/src/adapted-programs/programs/model-programs/app/index.tsx',
          outputHtmlFileName: 'program-models',
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
    new OutputFileCollection({
      programFileCache,
    }),
  ] as const),
  errorCollectionId: PROGRAM_ERROR_COLLECTION_ID,
  programmedTransformTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    associateTypeScriptFileToTypescriptConfiguration,
    parseTypeScriptFile,
    parseTypeScriptFileComments,
    getCommentedProgramBodyDeclarationList,
    getTypeScriptFileImportList,

    filterEngineProgramFile,
    parseProgramFile,
    parseItemDefinition,
    parseProgrammedTransform,

    buildProgrammedTransformInputModel,
    buildProgrammedTransformOutputModel,
    buildProgrammedTransformModel,
    buildProgramModel,

    getAllGraphElements,

    groupGraphElements,
    encodeDirectedGraphAsGraphvizCode,
    renderGraphvizCodeToSvgDocument,
    addInteractivityToSvgDocument,

    captureOutputFileDigestList,

    renderApp,

    // TODO: add the audit back in when we don't need the NULL_OMISSION
    // auditLintAssertionOmissions,
    reportFailedLintAssertion,
    reportErrors,
    reportErrorCount,
    signalError,
  ] as const,
  programFileCache,
  serializeeCollectionIdList: [
    // note: keep this is a multiline list for easier debugging
    SANITY_SNAPSHOT_COLLECTION_ID,
  ],
  strategy: EngineRunnerStrategy.WaitForAllDependencies,
});
