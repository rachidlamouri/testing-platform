set -e

echo "# model-ci"
echo "Verifying ci.sh runs every engine program"
npx ts-node packages/mdd-engine/src/adapted-programs/programs/model-ci/modelCi.ts
bash checkUncommittedDebug.sh
