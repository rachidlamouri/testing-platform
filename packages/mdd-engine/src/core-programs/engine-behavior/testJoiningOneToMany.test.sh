set -e

echo "# test-joining-one-to-many"
echo "Testing joining each item in one collection to multiple items from another"
npx ts-node packages/mdd-engine/src/core-programs/engine-behavior/testJoiningOneToMany.ts
bash checkUncommittedDebug.sh
