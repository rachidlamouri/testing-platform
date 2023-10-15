set -e

echo "# lint-file-system-node-path-literals"
echo "Testing this works"
npx ts-node packages/mdd-engine/src/adapted-programs/programs/lint-file-system-node-path-literals/lintFileSystemNodePathLiterals.ts
bash checkUncommittedDebug.sh
