set -e

echo "# test-joining-voictent-to-voictent"
echo "Testing joining one collection as a whole to another collection as a whole"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningVoictentToVoictent.ts
bash checkUncommittedDebug.sh
