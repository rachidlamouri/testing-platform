set -e

echo "# test-releasing-a-right-voictent-multiple-times"
echo "Testing a right collection that stops accumulating items for one engine tick"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testReleasingARightVoictentMultipleTimes.ts
bash checkUncommittedDebug.sh
