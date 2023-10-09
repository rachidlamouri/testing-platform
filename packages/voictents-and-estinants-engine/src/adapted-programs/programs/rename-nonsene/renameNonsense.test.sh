set -e

echo "# rename-nonsense"
echo "Testing this works"
npx ts-node packages/voictents-and-estinants-engine/src/adapted-programs/programs/rename-nonsene/renameNonsense.ts
bash checkUncommittedDebug.sh
