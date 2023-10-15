set -e

echo "# test-programmed-transform-error"
echo "Testing that the engine forwards errors to an error collection"
npx ts-node packages/mdd-engine/src/core-programs/engine-behavior/testProgrammedTransformError.ts
bash checkUncommittedDebug.sh
