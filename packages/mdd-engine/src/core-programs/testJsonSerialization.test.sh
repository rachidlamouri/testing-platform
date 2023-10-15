set -e

echo "# test-json-serialization"
echo "Testing JsonSerializableCollection"
npx ts-node packages/mdd-engine/src/core-programs/testJsonSerialization.ts
bash checkUncommittedDebug.sh
