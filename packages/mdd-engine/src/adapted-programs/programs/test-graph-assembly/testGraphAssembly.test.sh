set -e

echo "# test-graph-assembly"
echo "Testing assembling a graph from its constituents"
npx ts-node packages/mdd-engine/src/adapted-programs/programs/test-graph-assembly/testGraphAssembly.ts
bash checkUncommittedDebug.sh
