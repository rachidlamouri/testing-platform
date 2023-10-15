set -e

echo "# rename-nonsense"
echo "Testing this works"
npx ts-node packages/mdd-engine/src/adapted-programs/programs/rename-nonsense/renameNonsense.ts
bash checkUncommittedDebug.sh
