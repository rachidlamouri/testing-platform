set -e

echo "# test-estinant-error"
echo "Testing that the engine forwards errors to an error collection"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testEstinantError.ts
bash checkUncommittedDebug.sh
