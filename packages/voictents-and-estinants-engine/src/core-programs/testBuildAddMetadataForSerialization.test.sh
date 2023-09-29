set -e

echo "# test-build-add-metadata-for-serialization"
echo "Testing consuming each item in a collection, and "buildAddMetadataForSerialization""
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/testBuildAddMetadataForSerialization.ts
bash checkUncommittedDebug.sh
