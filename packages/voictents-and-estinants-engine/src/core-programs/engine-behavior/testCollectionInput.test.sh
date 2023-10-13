set -e

echo "# test-collection-input"
echo "Testing consuming a collection as a whole"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testCollectionInput.ts
bash checkUncommittedDebug.sh
