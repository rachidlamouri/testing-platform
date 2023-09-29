set -e

echo "# model-programs"
echo "Verifying program models have not changed"
npx ts-node packages/voictents-and-estinants-engine/src/adapted-programs/programs/model-programs/modelPrograms.ts
bash checkUncommittedDebug.sh
