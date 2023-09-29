set -e

echo "# test-json-serialization"
echo "Testing JsonSerializableCollection"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/testJsonSerialization.ts
bash checkUncommittedDebug.sh
