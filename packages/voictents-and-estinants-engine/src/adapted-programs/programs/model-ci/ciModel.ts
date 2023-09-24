import { StandardInMemoryVoque } from '../../../core/engine/inMemoryVoque';

type CustomProgramTest = {
  programName: string;
  programFilePath: string;
  prefaceDescription: string;
  skip?: boolean;
  commandList: string[];
};

type DefaultProgramTest = {
  programName: string;
  programFilePath: string;
  prefaceDescription: string;
  skip?: boolean;
};

type ProgramTestGroup = {
  description: string;
  programTestList: (DefaultProgramTest | CustomProgramTest)[];
};

/**
 * The information needed to build the expected ci.sh file
 */
type CiModel = {
  zorn: string;
  initialCommandList: string[];
  finalCommandList: string[];
  programTestGroupList: ProgramTestGroup[];
};

export const CI_MODEL_GEPP = 'ci-model';

type CiModelGepp = typeof CI_MODEL_GEPP;

export type CiModelVoque = StandardInMemoryVoque<CiModelGepp, CiModel>;

export const CI_MODEL_ZORN = 'CI_MODEL';

export const CI_MODEL: CiModel = {
  zorn: CI_MODEL_ZORN,
  initialCommandList: ['set -e'],
  finalCommandList: ['echo "Finished without errors!"'],
  programTestGroupList: [
    {
      description: 'JSON and Error Serialization',
      programTestList: [
        {
          programName: 'test-json-serialization',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/testJsonSerialization.ts',
          prefaceDescription: 'Testing JsonSerializableCollection',
        },
        {
          programName: 'test-error-serialization',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/testErrorSerialization.ts',
          prefaceDescription: 'Testing ErrorSerializableCollection',
        },
      ],
    },
    {
      description: 'Core Engine Behavior',
      programTestList: [
        {
          programName: 'test-build-add-metadata-for-serialization',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/testBuildAddMetadataForSerialization.ts',
          prefaceDescription:
            'Testing consuming each item in a collection, and "buildAddMetadataForSerialization"',
        },
        {
          programName: 'test-estinant-error',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testEstinantError.ts',
          prefaceDescription:
            'Testing that the engine forwards errors to an error collection',
        },
        {
          programName: 'test-voictent-input',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testVoictentInput.ts',
          prefaceDescription: 'Testing consuming a collection as a whole',
        },
        {
          programName: 'test-joining-one-to-one',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningOneToOne.ts',
          prefaceDescription:
            'Testing joining each item in one collection to one item from another collection',
        },
        {
          programName: 'test-joining-one-to-many',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningOneToMany.ts',
          prefaceDescription:
            'Testing joining each item in one collection to multiple items from another',
        },
        {
          programName: 'test-joining-one-to-voictent',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningOneToVoictent.ts',
          prefaceDescription:
            'Testing joining each item in one collection the an entire different collection as a whole',
        },
        {
          programName: 'test-joining-voictent-to-voictent',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningVoictentToVoictent.ts',
          prefaceDescription:
            'Testing joining one collection as a whole to another collection as a whole',
        },
        {
          programName: 'test-releasing-a-left-voictent-multiple-times',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testReleasingALeftVoictentMultipleTimes.ts',
          prefaceDescription:
            'Testing a left collection that stops accumulating items for one engine tick',
        },
        {
          programName: 'test-releasing-a-right-voictent-multiple-times',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testReleasingARightVoictentMultipleTimes.ts',
          prefaceDescription:
            'Testing a right collection that stops accumulating items for one engine tick',
        },
        {
          programName: 'test-untriggered-cology-error',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testUntriggeredCologyError.ts',
          prefaceDescription:
            'Testing that the engine emits an error when a cology is left untriggered',
        },
      ],
    },
    {
      description: 'Core Programs',
      programTestList: [
        {
          programName: 'test-get-type-script-typed-datum',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/testGetTypeScriptTypedDatum.ts',
          prefaceDescription: 'Testing "getTypeScriptTypedDatum"',
        },
        {
          programName: 'test-get-custom-typed-datum',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/testGetCustomTypedDatum.ts',
          prefaceDescription: 'Testing "getCustomTypedDatum"',
        },
        {
          programName: 'test-serialize',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/testSerialize.ts',
          prefaceDescription: 'Testing "serialize"',
        },
      ],
    },
    {
      description: 'Adapted Programs',
      programTestList: [
        {
          programName: 'categorize-files',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programs/categorize-files/categorizeFiles.ts',
          prefaceDescription: 'Verifying file extensions',
        },
        {
          programName: 'test-graph-render',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programs/test-graph-render/testGraphRender.ts',
          prefaceDescription:
            'Verifying example rendered graph has not changed',
        },
        {
          programName: 'model-programs',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programs/model-programs/modelPrograms.ts',
          prefaceDescription: 'Verifying program models have not changed',
        },
        {
          programName: 'find-unused-exports',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programs/find-unused-exports/findUnusedExports.ts',
          prefaceDescription: 'Linting unused exports',
        },
        {
          programName: 'model-ci',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programs/model-ci/modelCi.ts',
          prefaceDescription: 'Verifying ci.sh runs every engine program',
        },
      ],
    },
    {
      description: 'WIP Adapted Programs',
      programTestList: [
        {
          programName: 'render-knowledge-graph',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programs/render-knowledge-graph/renderKnowledgeGraph.ts',
          prefaceDescription: 'WIP',
        },
        {
          programName: 'develop-knowledge-graph',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programs/develop-knowledge-graph/developKnowledgeGraph.ts',
          prefaceDescription: 'WIP',
          skip: true,
        },
        {
          programName: 'render-type-script-file-relationships',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programs/render-type-script-file-relationships/renderTypeScriptFileRelationships.ts',
          prefaceDescription: 'WIP',
          skip: true,
        },
        {
          programName: 'assemble-scaffolded-file',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programs/scaffold-file/assembleScaffoldedFile.ts',
          prefaceDescription: 'Perfoming test run of "assembleScaffoldedFile"',
          commandList: [
            'BASE_SNAPSHOT_DIRECTORY_PATH=debug/assembleScaffoldedFile/test',
            'HUBBLEPUP_SNAPSHOT_FILE_PATH="$BASE_SNAPSHOT_DIRECTORY_PATH/hubblepupSnapshot.ts"',
            'ESTINANT_SNAPSHOT_FILE_PATH="$BASE_SNAPSHOT_DIRECTORY_PATH/estinantSnapshot.ts"',
            'PROGRAM_SNAPSHOT_FILE_PATH="$BASE_SNAPSHOT_DIRECTORY_PATH/programSnapshot.ts"',
            'mkdir -p "$BASE_SNAPSHOT_DIRECTORY_PATH"',
            'rm -f "$HUBBLEPUP_SNAPSHOT_FILE_PATH"',
            'rm -f "$ESTINANT_SNAPSHOT_FILE_PATH"',
            'rm -f "$PROGRAM_SNAPSHOT_FILE_PATH"',
            'touch "$HUBBLEPUP_SNAPSHOT_FILE_PATH"',
            'touch "$ESTINANT_SNAPSHOT_FILE_PATH"',
            'touch "$PROGRAM_SNAPSHOT_FILE_PATH"',
            'npm run scaffold hubblepup "$HUBBLEPUP_SNAPSHOT_FILE_PATH"',
            'npm run scaffold estinant "$ESTINANT_SNAPSHOT_FILE_PATH"',
            'npm run scaffold program "$PROGRAM_SNAPSHOT_FILE_PATH"',
          ],
        },
        {
          programName: 'comments-example',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programs/comments-example/commentsExample.ts',
          prefaceDescription: 'Perfoming test run of "commentsExample"',
        },
        {
          programName: 'get-snapshot-refresh-script',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programs/get-snapshot-refresh-script/getSnapshotRefreshScript.ts',
          prefaceDescription:
            'Perfoming test run of "getSnapshotRefreshScript"',
        },
        {
          programName: 'test-cached-on-disk-datum',
          programFilePath:
            'packages/voictents-and-estinants-engine/src/core-programs/testCachedOnDiskDatum.ts',
          prefaceDescription: 'Perfoming test run of "testCachedOnDiskDatum"',
        },
      ],
    },
  ],
};
