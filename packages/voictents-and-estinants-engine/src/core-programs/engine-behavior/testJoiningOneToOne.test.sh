set -e

echo "# test-joining-one-to-one"
echo "Testing joining each item in one collection to one item from another collection"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningOneToOne.ts
bash checkUncommittedDebug.sh
