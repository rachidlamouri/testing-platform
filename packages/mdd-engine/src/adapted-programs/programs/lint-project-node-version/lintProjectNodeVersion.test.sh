set -e

echo "# lint-project-node-version"
echo "Verifying that the project's node version is the latest long term support version"
npx ts-node packages/mdd-engine/src/adapted-programs/programs/lint-project-node-version/lintProjectNodeVersion.ts
bash checkUncommittedDebug.sh
