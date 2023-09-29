set -e

echo "# test-cached-on-disk-datum"
echo "Testing that a cached-on-disk collection can receive items"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/testCachedOnDiskDatum.ts
bash checkUncommittedDebug.sh
