set -e

echo "# test-graph-render"
echo "Verifying example rendered graph has not changed"
npx ts-node packages/mdd-engine/src/adapted-programs/programs/test-graph-render/testGraphRender.ts
bash checkUncommittedDebug.sh
