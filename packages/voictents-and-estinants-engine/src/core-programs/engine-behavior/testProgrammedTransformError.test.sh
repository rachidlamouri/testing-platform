set -e

echo "# test-programmed-transform-error"
echo "Testing that the engine forwards errors to an error collection"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testProgrammedTransformError.ts
bash checkUncommittedDebug.sh
