set -e

echo "# test-releasing-a-right-collection-multiple-times"
echo "Testing a right collection that stops accumulating items for one engine tick"
npx ts-node packages/mdd-engine/src/core-programs/engine-behavior/testReleasingARightCollectionMultipleTimes.ts
bash checkUncommittedDebug.sh
