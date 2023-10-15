set -e

echo "Starting ci.sh"
printf "\n"

# JSON and Error Serialization

## test-json-serialization
bash packages/mdd-engine/src/core-programs/testJsonSerialization.test.sh
printf "\n"

## test-error-serialization
bash packages/mdd-engine/src/core-programs/testErrorSerialization.test.sh
printf "\n"

# Core Engine Behavior

## test-build-add-metadata-for-serialization
bash packages/mdd-engine/src/core-programs/testBuildAddMetadataForSerialization.test.sh
printf "\n"

## test-programmed-transform-error
bash packages/mdd-engine/src/core-programs/engine-behavior/testProgrammedTransformError.test.sh
printf "\n"

## test-collection-input
bash packages/mdd-engine/src/core-programs/engine-behavior/testCollectionInput.test.sh
printf "\n"

## test-joining-one-to-one
bash packages/mdd-engine/src/core-programs/engine-behavior/testJoiningOneToOne.test.sh
printf "\n"

## test-joining-one-to-many
bash packages/mdd-engine/src/core-programs/engine-behavior/testJoiningOneToMany.test.sh
printf "\n"

## test-joining-one-to-collection
bash packages/mdd-engine/src/core-programs/engine-behavior/testJoiningOneToCollection.test.sh
printf "\n"

## test-joining-collection-to-collection
bash packages/mdd-engine/src/core-programs/engine-behavior/testJoiningCollectionToCollection.test.sh
printf "\n"

## test-releasing-a-left-collection-multiple-times
bash packages/mdd-engine/src/core-programs/engine-behavior/testReleasingALeftCollectionMultipleTimes.test.sh
printf "\n"

## test-releasing-a-right-collection-multiple-times
bash packages/mdd-engine/src/core-programs/engine-behavior/testReleasingARightCollectionMultipleTimes.test.sh
printf "\n"

## test-untriggered-transform-input-key-group-error
bash packages/mdd-engine/src/core-programs/engine-behavior/testUntriggeredTransformInputKeyGroupError.test.sh
printf "\n"

# Core Programs

## test-get-type-script-typed-datum
bash packages/mdd-engine/src/core-programs/testGetTypeScriptTypedDatum.test.sh
printf "\n"

## test-get-custom-typed-datum
bash packages/mdd-engine/src/core-programs/testGetCustomTypedDatum.test.sh
printf "\n"

## test-serialize
bash packages/mdd-engine/src/core-programs/testSerialize.test.sh
printf "\n"

# Adapted Programs

## categorize-files
bash packages/mdd-engine/src/adapted-programs/programs/categorize-files/categorizeFiles.test.sh
printf "\n"

## test-graph-render
bash packages/mdd-engine/src/adapted-programs/programs/test-graph-render/testGraphRender.test.sh
printf "\n"

## model-programs
bash packages/mdd-engine/src/adapted-programs/programs/model-programs/modelPrograms.test.sh
printf "\n"

## find-unused-exports
bash packages/mdd-engine/src/adapted-programs/programs/find-unused-exports/findUnusedExports.test.sh
printf "\n"

## model-ci
bash packages/mdd-engine/src/adapted-programs/programs/model-ci/modelCi.test.sh
printf "\n"

## lint-file-system-node-path-literals
bash packages/mdd-engine/src/adapted-programs/programs/lint-file-system-node-path-literals/lintFileSystemNodePathLiterals.test.sh
printf "\n"

## lint-nonsense
bash packages/mdd-engine/src/adapted-programs/programs/lint-nonsense/lintNonsense.test.sh
printf "\n"

## rename-nonsense
bash packages/mdd-engine/src/adapted-programs/programs/rename-nonsense/renameNonsense.test.sh
printf "\n"

# WIP Adapted Programs

## render-knowledge-graph
bash packages/mdd-engine/src/adapted-programs/programs/render-knowledge-graph/renderKnowledgeGraph.test.sh
printf "\n"

## develop-knowledge-graph
bash packages/mdd-engine/src/adapted-programs/programs/develop-knowledge-graph/developKnowledgeGraph.test.sh
printf "\n"

## assemble-scaffolded-file
bash packages/mdd-engine/src/adapted-programs/programs/scaffold-file/assembleScaffoldedFile.test.sh
printf "\n"

## comments-example
bash packages/mdd-engine/src/adapted-programs/programs/comments-example/commentsExample.test.sh
printf "\n"

## get-snapshot-refresh-script
bash packages/mdd-engine/src/adapted-programs/programs/get-snapshot-refresh-script/getSnapshotRefreshScript.test.sh
printf "\n"

## test-cached-on-disk-datum
bash packages/mdd-engine/src/core-programs/testCachedOnDiskDatum.test.sh
printf "\n"

echo "Finished without errors!"
printf "\n"
