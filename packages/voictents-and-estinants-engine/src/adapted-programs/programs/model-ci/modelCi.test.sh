set -e

echo "# model-ci"
echo "Verifying ci.sh runs every engine program"
npx ts-node packages/voictents-and-estinants-engine/src/adapted-programs/programs/model-ci/modelCi.ts
bash checkUncommittedDebug.sh
