set -e

echo "# test-joining-collection-to-collection"
echo "Testing joining one collection as a whole to another collection as a whole"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testJoiningCollectionToCollection.ts
bash checkUncommittedDebug.sh
