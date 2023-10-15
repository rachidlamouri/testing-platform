set -e

echo "# test-build-add-metadata-for-serialization"
echo "Testing consuming each item in a collection, and "buildAddMetadataForSerialization""
npx ts-node packages/mdd-engine/src/core-programs/testBuildAddMetadataForSerialization.ts
bash checkUncommittedDebug.sh
