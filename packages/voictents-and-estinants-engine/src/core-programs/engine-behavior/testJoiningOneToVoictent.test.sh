set -e

echo "# test-joining-one-to-voictent"
echo "Testing joining each item in one collection the an entire different collection as a whole"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningOneToVoictent.ts
bash checkUncommittedDebug.sh
