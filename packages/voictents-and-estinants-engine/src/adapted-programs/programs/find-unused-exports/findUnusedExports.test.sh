set -e

echo "# find-unused-exports"
echo "Linting unused exports"
npx ts-node packages/voictents-and-estinants-engine/src/adapted-programs/programs/find-unused-exports/findUnusedExports.ts
bash checkUncommittedDebug.sh
