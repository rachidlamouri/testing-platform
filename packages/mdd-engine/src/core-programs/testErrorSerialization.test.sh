set -e

echo "# test-error-serialization"
echo "Testing ErrorSerializableCollection"
npx ts-node packages/mdd-engine/src/core-programs/testErrorSerialization.ts
bash checkUncommittedDebug.sh
