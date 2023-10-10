set -e

echo "# lint-file-system-node-path-literals"
echo "Testing this works"
npx ts-node packages/voictents-and-estinants-engine/src/adapted-programs/programs/lint-file-system-node-path-literals/lintFileSystemNodePathLiterals.ts
bash checkUncommittedDebug.sh
