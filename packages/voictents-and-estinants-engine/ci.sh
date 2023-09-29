set -e

echo "Starting ci.sh"
printf "\n"

# JSON and Error Serialization

## test-json-serialization
bash packages/voictents-and-estinants-engine/src/core-programs/testJsonSerialization.test.sh
printf "\n"

## test-error-serialization
bash packages/voictents-and-estinants-engine/src/core-programs/testErrorSerialization.test.sh
printf "\n"

# Core Engine Behavior

## test-build-add-metadata-for-serialization
bash packages/voictents-and-estinants-engine/src/core-programs/testBuildAddMetadataForSerialization.test.sh
printf "\n"

## test-estinant-error
bash packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testEstinantError.test.sh
printf "\n"

## test-voictent-input
bash packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testVoictentInput.test.sh
printf "\n"

## test-joining-one-to-one
bash packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningOneToOne.test.sh
printf "\n"

## test-joining-one-to-many
bash packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningOneToMany.test.sh
printf "\n"

## test-joining-one-to-voictent
bash packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningOneToVoictent.test.sh
printf "\n"

## test-joining-voictent-to-voictent
bash packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningVoictentToVoictent.test.sh
printf "\n"

## test-releasing-a-left-voictent-multiple-times
bash packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testReleasingALeftVoictentMultipleTimes.test.sh
printf "\n"

## test-releasing-a-right-voictent-multiple-times
bash packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testReleasingARightVoictentMultipleTimes.test.sh
printf "\n"

## test-untriggered-cology-error
bash packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testUntriggeredCologyError.test.sh
printf "\n"

# Core Programs

## test-get-type-script-typed-datum
bash packages/voictents-and-estinants-engine/src/core-programs/testGetTypeScriptTypedDatum.test.sh
printf "\n"

## test-get-custom-typed-datum
bash packages/voictents-and-estinants-engine/src/core-programs/testGetCustomTypedDatum.test.sh
printf "\n"

## test-serialize
bash packages/voictents-and-estinants-engine/src/core-programs/testSerialize.test.sh
printf "\n"

# Adapted Programs

## categorize-files
bash packages/voictents-and-estinants-engine/src/adapted-programs/programs/categorize-files/categorizeFiles.test.sh
printf "\n"

## test-graph-render
bash packages/voictents-and-estinants-engine/src/adapted-programs/programs/test-graph-render/testGraphRender.test.sh
printf "\n"

## model-programs
bash packages/voictents-and-estinants-engine/src/adapted-programs/programs/model-programs/modelPrograms.test.sh
printf "\n"

## find-unused-exports
bash packages/voictents-and-estinants-engine/src/adapted-programs/programs/find-unused-exports/findUnusedExports.test.sh
printf "\n"

## model-ci
bash packages/voictents-and-estinants-engine/src/adapted-programs/programs/model-ci/modelCi.test.sh
printf "\n"

# WIP Adapted Programs

## render-knowledge-graph
bash packages/voictents-and-estinants-engine/src/adapted-programs/programs/render-knowledge-graph/renderKnowledgeGraph.test.sh
printf "\n"

## develop-knowledge-graph
bash packages/voictents-and-estinants-engine/src/adapted-programs/programs/develop-knowledge-graph/developKnowledgeGraph.test.sh
printf "\n"

## render-type-script-file-relationships
bash packages/voictents-and-estinants-engine/src/adapted-programs/programs/render-type-script-file-relationships/renderTypeScriptFileRelationships.test.sh
printf "\n"

## assemble-scaffolded-file
bash packages/voictents-and-estinants-engine/src/adapted-programs/programs/scaffold-file/assembleScaffoldedFile.test.sh
printf "\n"

## comments-example
bash packages/voictents-and-estinants-engine/src/adapted-programs/programs/comments-example/commentsExample.test.sh
printf "\n"

## get-snapshot-refresh-script
bash packages/voictents-and-estinants-engine/src/adapted-programs/programs/get-snapshot-refresh-script/getSnapshotRefreshScript.test.sh
printf "\n"

## test-cached-on-disk-datum
bash packages/voictents-and-estinants-engine/src/core-programs/testCachedOnDiskDatum.test.sh
printf "\n"

echo "Finished without errors!"
printf "\n"
