set -e

echo "# model-programs"
echo "Verifying program models have not changed"
npx ts-node packages/mdd-engine/src/adapted-programs/programs/model-programs/modelPrograms.ts
bash checkUncommittedDebug.sh
