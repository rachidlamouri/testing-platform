set -e

echo "# test-cached-on-disk-datum"
echo "Testing that a cached-on-disk collection can receive items"
npx ts-node packages/mdd-engine/src/core-programs/testCachedOnDiskDatum.ts
bash checkUncommittedDebug.sh
