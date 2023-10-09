set -e

echo "# lint-nonsense"
echo "Checking for nonsense"
npx ts-node packages/voictents-and-estinants-engine/src/adapted-programs/programs/lint-nonsense/lintNonsense.ts
bash checkUncommittedDebug.sh
