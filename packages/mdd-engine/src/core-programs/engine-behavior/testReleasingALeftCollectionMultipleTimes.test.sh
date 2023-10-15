set -e

echo "# test-releasing-a-left-collection-multiple-times"
echo "Testing a left collection that stops accumulating items for one engine tick"
npx ts-node packages/mdd-engine/src/core-programs/engine-behavior/testReleasingALeftCollectionMultipleTimes.ts
bash checkUncommittedDebug.sh
