set -e

echo "# lint-features"
echo "Verifying that features are implemented"
npx ts-node packages/mdd-engine/src/adapted-programs/programs/lint-features/lintFeatures.ts
bash checkUncommittedDebug.sh
