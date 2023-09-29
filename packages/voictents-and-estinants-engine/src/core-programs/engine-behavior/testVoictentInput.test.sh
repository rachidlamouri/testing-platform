set -e

echo "# test-voictent-input"
echo "Testing consuming a collection as a whole"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testVoictentInput.ts
bash checkUncommittedDebug.sh
