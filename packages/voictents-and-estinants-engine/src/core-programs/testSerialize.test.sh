set -e

echo "# test-serialize"
echo "Testing "serialize""
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/testSerialize.ts
bash checkUncommittedDebug.sh
