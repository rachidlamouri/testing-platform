set -e

# JSON Serialization

## test-json-serialization
echo "# test-json-serialization"
echo "Testing JsonSerializableCollection"
npx ts-node packages/voictents-and-estinants-engine/src/example-programs/testJsonSerialization.ts
bash checkUncommitted.sh
printf "\n"

# Core Engine Behavior

## test-build-add-metadata-for-serialization
echo "# test-build-add-metadata-for-serialization"
echo "Testing consuming each item in a collection, and "buildAddMetadataForSerialization""
npx ts-node packages/voictents-and-estinants-engine/src/example-programs/testBuildAddMetadataForSerialization.ts
bash checkUncommitted.sh
printf "\n"

## test-voictent-input
echo "# test-voictent-input"
echo "Testing consuming a collection as a whole"
npx ts-node packages/voictents-and-estinants-engine/src/example-programs/engine-behavior/testVoictentInput.ts
bash checkUncommitted.sh
printf "\n"

## test-joining-one-to-one
echo "# test-joining-one-to-one"
echo "Testing joining each item in one collection to one item from another collection"
npx ts-node packages/voictents-and-estinants-engine/src/example-programs/engine-behavior/testJoiningOneToOne.ts
bash checkUncommitted.sh
printf "\n"

## test-joining-one-to-many
echo "# test-joining-one-to-many"
echo "Testing joining each item in one collection to multiple items from another"
npx ts-node packages/voictents-and-estinants-engine/src/example-programs/engine-behavior/testJoiningOneToMany.ts
bash checkUncommitted.sh
printf "\n"

## test-joining-one-to-voictent
echo "# test-joining-one-to-voictent"
echo "Testing joining each item in one collection the an entire different collection as a whole"
npx ts-node packages/voictents-and-estinants-engine/src/example-programs/engine-behavior/testJoiningOneToVoictent.ts
bash checkUncommitted.sh
printf "\n"

## test-joining-voictent-to-voictent
echo "# test-joining-voictent-to-voictent"
echo "Testing joining one collection as a whole to another collection as a whole"
npx ts-node packages/voictents-and-estinants-engine/src/example-programs/engine-behavior/testJoiningVoictentToVoictent.ts
bash checkUncommitted.sh
printf "\n"

## test-releasing-a-left-voictent-multiple-times
echo "# test-releasing-a-left-voictent-multiple-times"
echo "Testing a left collection that stops accumulating items for one engine tick"
npx ts-node packages/voictents-and-estinants-engine/src/example-programs/engine-behavior/testReleasingALeftVoictentMultipleTimes.ts
bash checkUncommitted.sh
printf "\n"

## test-releasing-a-right-voictent-multiple-times
echo "# test-releasing-a-right-voictent-multiple-times"
echo "Testing a right collection that stops accumulating items for one engine tick"
npx ts-node packages/voictents-and-estinants-engine/src/example-programs/engine-behavior/testReleasingARightVoictentMultipleTimes.ts
bash checkUncommitted.sh
printf "\n"

# Core Programs

## test-get-type-script-typed-datum
echo "# test-get-type-script-typed-datum"
echo "Testing "getTypeScriptTypedDatum""
npx ts-node packages/voictents-and-estinants-engine/src/example-programs/testGetTypeScriptTypedDatum.ts
bash checkUncommitted.sh
printf "\n"

## test-get-custom-typed-datum
echo "# test-get-custom-typed-datum"
echo "Testing "getCustomTypedDatum""
npx ts-node packages/voictents-and-estinants-engine/src/example-programs/testGetCustomTypedDatum.ts
bash checkUncommitted.sh
printf "\n"

## test-serialize
echo "# test-serialize"
echo "Testing "serialize""
npx ts-node packages/voictents-and-estinants-engine/src/example-programs/testSerialize.ts
bash checkUncommitted.sh
printf "\n"

# Adapted Programs

## categorize-files
echo "# categorize-files"
echo "Verifying file extensions"
npx ts-node packages/voictents-and-estinants-engine/src/custom/programs/categorize-files/categorizeFiles.ts
bash checkUncommitted.sh
printf "\n"

## test-graph-render
echo "# test-graph-render"
echo "Verifying example rendered graph has not changed"
npx ts-node packages/voictents-and-estinants-engine/src/custom/programs/test-graph-render/testGraphRender.ts
bash checkUncommitted.sh
printf "\n"

## model-programs
echo "# model-programs"
echo "Verifying program models have not changed"
npx ts-node packages/voictents-and-estinants-engine/src/custom/programs/model-programs/modelPrograms.ts
bash checkUncommitted.sh
printf "\n"

## render-type-script-file-relationships
echo "# render-type-script-file-relationships"
echo "WIP"
npx ts-node packages/voictents-and-estinants-engine/src/custom/programs/render-type-script-file-relationships/renderTypeScriptFileRelationships.ts
bash checkUncommitted.sh
printf "\n"

## model-ci
echo "# model-ci"
echo "Verifying ci.sh runs every engine program"
npx ts-node packages/voictents-and-estinants-engine/src/custom/programs/model-ci/modelCi.ts
bash checkUncommitted.sh
printf "\n"

# WIP Adapted Programs

# ## assemble-scaffolded-file
# echo "# assemble-scaffolded-file"
# echo "Perfoming test run of "assembleScaffoldedFile""
# npx ts-node packages/voictents-and-estinants-engine/src/custom/programs/scaffold-voictent-file/assembleScaffoldedFile.ts
# bash checkUncommitted.sh
# printf "\n"

## comments-example
echo "# comments-example"
echo "Perfoming test run of "commentsExample""
npx ts-node packages/voictents-and-estinants-engine/src/custom/programs/comments-example/commentsExample.ts
bash checkUncommitted.sh
printf "\n"

## get-snapshot-refresh-script
echo "# get-snapshot-refresh-script"
echo "Perfoming test run of "getSnapshotRefreshScript""
npx ts-node packages/voictents-and-estinants-engine/src/custom/programs/get-snapshot-refresh-script/getSnapshotRefreshScript.ts
bash checkUncommitted.sh
printf "\n"

## test-cached-on-disk-datum
echo "# test-cached-on-disk-datum"
echo "Perfoming test run of "testCachedOnDiskDatum""
npx ts-node packages/voictents-and-estinants-engine/src/example-programs/testCachedOnDiskDatum.ts
bash checkUncommitted.sh
printf "\n"

echo "Finished without errors!"
printf "\n"
