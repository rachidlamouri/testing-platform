set -e

echo "# test-collection-input"
echo "Testing consuming a collection as a whole"
npx ts-node packages/mdd-engine/src/core-programs/engine-behavior/testCollectionInput.ts
bash checkUncommittedDebug.sh
