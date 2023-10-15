set -e

echo "# test-serialize"
echo "Testing "serialize""
npx ts-node packages/mdd-engine/src/core-programs/testSerialize.ts
bash checkUncommittedDebug.sh
