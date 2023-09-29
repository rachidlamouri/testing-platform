set -e

echo "# test-error-serialization"
echo "Testing ErrorSerializableCollection"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/testErrorSerialization.ts
bash checkUncommittedDebug.sh
