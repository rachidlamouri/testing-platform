set -e

echo "# test-releasing-a-left-voictent-multiple-times"
echo "Testing a left collection that stops accumulating items for one engine tick"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testReleasingALeftVoictentMultipleTimes.ts
bash checkUncommittedDebug.sh
