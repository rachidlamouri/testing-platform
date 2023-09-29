set -e

# JSON and Error Serialization

## test-json-serialization
echo "# test-json-serialization"
echo "Testing JsonSerializableCollection"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/testJsonSerialization.ts
bash checkUncommittedDebug.sh
printf "\n"

## test-error-serialization
echo "# test-error-serialization"
echo "Testing ErrorSerializableCollection"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/testErrorSerialization.ts
bash checkUncommittedDebug.sh
printf "\n"

# Core Engine Behavior

## test-build-add-metadata-for-serialization
echo "# test-build-add-metadata-for-serialization"
echo "Testing consuming each item in a collection, and "buildAddMetadataForSerialization""
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/testBuildAddMetadataForSerialization.ts
bash checkUncommittedDebug.sh
printf "\n"

## test-estinant-error
echo "# test-estinant-error"
echo "Testing that the engine forwards errors to an error collection"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testEstinantError.ts
bash checkUncommittedDebug.sh
printf "\n"

## test-voictent-input
echo "# test-voictent-input"
echo "Testing consuming a collection as a whole"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testVoictentInput.ts
bash checkUncommittedDebug.sh
printf "\n"

## test-joining-one-to-one
echo "# test-joining-one-to-one"
echo "Testing joining each item in one collection to one item from another collection"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningOneToOne.ts
bash checkUncommittedDebug.sh
printf "\n"

## test-joining-one-to-many
echo "# test-joining-one-to-many"
echo "Testing joining each item in one collection to multiple items from another"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningOneToMany.ts
bash checkUncommittedDebug.sh
printf "\n"

## test-joining-one-to-voictent
echo "# test-joining-one-to-voictent"
echo "Testing joining each item in one collection the an entire different collection as a whole"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningOneToVoictent.ts
bash checkUncommittedDebug.sh
printf "\n"

## test-joining-voictent-to-voictent
echo "# test-joining-voictent-to-voictent"
echo "Testing joining one collection as a whole to another collection as a whole"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningVoictentToVoictent.ts
bash checkUncommittedDebug.sh
printf "\n"

## test-releasing-a-left-voictent-multiple-times
echo "# test-releasing-a-left-voictent-multiple-times"
echo "Testing a left collection that stops accumulating items for one engine tick"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testReleasingALeftVoictentMultipleTimes.ts
bash checkUncommittedDebug.sh
printf "\n"

## test-releasing-a-right-voictent-multiple-times
echo "# test-releasing-a-right-voictent-multiple-times"
echo "Testing a right collection that stops accumulating items for one engine tick"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testReleasingARightVoictentMultipleTimes.ts
bash checkUncommittedDebug.sh
printf "\n"

## test-untriggered-cology-error
echo "# test-untriggered-cology-error"
echo "Testing that the engine emits an error when a cology is left untriggered"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testUntriggeredCologyError.ts
bash checkUncommittedDebug.sh
printf "\n"

# Core Programs

## test-get-type-script-typed-datum
echo "# test-get-type-script-typed-datum"
echo "Testing "getTypeScriptTypedDatum""
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/testGetTypeScriptTypedDatum.ts
bash checkUncommittedDebug.sh
printf "\n"

## test-get-custom-typed-datum
echo "# test-get-custom-typed-datum"
echo "Testing "getCustomTypedDatum""
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/testGetCustomTypedDatum.ts
bash checkUncommittedDebug.sh
printf "\n"

## test-serialize
echo "# test-serialize"
echo "Testing "serialize""
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/testSerialize.ts
bash checkUncommittedDebug.sh
printf "\n"

# Adapted Programs

## categorize-files
echo "# categorize-files"
echo "Verifying file extensions"
npx ts-node packages/voictents-and-estinants-engine/src/adapted-programs/programs/categorize-files/categorizeFiles.ts
bash checkUncommittedDebug.sh
printf "\n"

## test-graph-render
echo "# test-graph-render"
echo "Verifying example rendered graph has not changed"
npx ts-node packages/voictents-and-estinants-engine/src/adapted-programs/programs/test-graph-render/testGraphRender.ts
bash checkUncommittedDebug.sh
printf "\n"

## model-programs
echo "# model-programs"
echo "Verifying program models have not changed"
npx ts-node packages/voictents-and-estinants-engine/src/adapted-programs/programs/model-programs/modelPrograms.ts
bash checkUncommittedDebug.sh
printf "\n"

## find-unused-exports
echo "# find-unused-exports"
echo "Linting unused exports"
npx ts-node packages/voictents-and-estinants-engine/src/adapted-programs/programs/find-unused-exports/findUnusedExports.ts
bash checkUncommittedDebug.sh
printf "\n"

## model-ci
echo "# model-ci"
echo "Verifying ci.sh runs every engine program"
npx ts-node packages/voictents-and-estinants-engine/src/adapted-programs/programs/model-ci/modelCi.ts
bash checkUncommittedDebug.sh
printf "\n"

# WIP Adapted Programs

## render-knowledge-graph
echo "# render-knowledge-graph"
echo "WIP"
npx ts-node packages/voictents-and-estinants-engine/src/adapted-programs/programs/render-knowledge-graph/renderKnowledgeGraph.ts
bash checkUncommittedDebug.sh
printf "\n"

# ## develop-knowledge-graph
# echo "# develop-knowledge-graph"
# echo "WIP"
# npx ts-node packages/voictents-and-estinants-engine/src/adapted-programs/programs/develop-knowledge-graph/developKnowledgeGraph.ts
# bash checkUncommittedDebug.sh
# printf "\n"

# ## render-type-script-file-relationships
# echo "# render-type-script-file-relationships"
# echo "WIP"
# npx ts-node packages/voictents-and-estinants-engine/src/adapted-programs/programs/render-type-script-file-relationships/renderTypeScriptFileRelationships.ts
# bash checkUncommittedDebug.sh
# printf "\n"

# ## assemble-scaffolded-file
# echo "# assemble-scaffolded-file"
# echo "Perfoming test run of "assembleScaffoldedFile""
# BASE_SNAPSHOT_DIRECTORY_PATH=debug/assembleScaffoldedFile/test
# HUBBLEPUP_SNAPSHOT_FILE_PATH="$BASE_SNAPSHOT_DIRECTORY_PATH/hubblepupSnapshot.ts"
# ESTINANT_SNAPSHOT_FILE_PATH="$BASE_SNAPSHOT_DIRECTORY_PATH/estinantSnapshot.ts"
# PROGRAM_SNAPSHOT_FILE_PATH="$BASE_SNAPSHOT_DIRECTORY_PATH/programSnapshot.ts"
# mkdir -p "$BASE_SNAPSHOT_DIRECTORY_PATH"
# rm -f "$HUBBLEPUP_SNAPSHOT_FILE_PATH"
# rm -f "$ESTINANT_SNAPSHOT_FILE_PATH"
# rm -f "$PROGRAM_SNAPSHOT_FILE_PATH"
# touch "$HUBBLEPUP_SNAPSHOT_FILE_PATH"
# touch "$ESTINANT_SNAPSHOT_FILE_PATH"
# touch "$PROGRAM_SNAPSHOT_FILE_PATH"
# npm run scaffold hubblepup "$HUBBLEPUP_SNAPSHOT_FILE_PATH"
# npm run scaffold estinant "$ESTINANT_SNAPSHOT_FILE_PATH"
# npm run scaffold program "$PROGRAM_SNAPSHOT_FILE_PATH"
# bash checkUncommittedDebug.sh
# printf "\n"

## comments-example
echo "# comments-example"
echo "Perfoming test run of "commentsExample""
npx ts-node packages/voictents-and-estinants-engine/src/adapted-programs/programs/comments-example/commentsExample.ts
bash checkUncommittedDebug.sh
printf "\n"

## get-snapshot-refresh-script
echo "# get-snapshot-refresh-script"
echo "Perfoming test run of "getSnapshotRefreshScript""
npx ts-node packages/voictents-and-estinants-engine/src/adapted-programs/programs/get-snapshot-refresh-script/getSnapshotRefreshScript.ts
bash checkUncommittedDebug.sh
printf "\n"

## test-cached-on-disk-datum
echo "# test-cached-on-disk-datum"
echo "Perfoming test run of "testCachedOnDiskDatum""
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/testCachedOnDiskDatum.ts
bash checkUncommittedDebug.sh
printf "\n"

echo "Finished without errors!"
printf "\n"
