set -e

echo "# render-knowledge-graph"
echo "Testing that the knowledge graph renders without errors"
npx ts-node packages/voictents-and-estinants-engine/src/adapted-programs/programs/render-knowledge-graph/renderKnowledgeGraph.ts
bash checkUncommittedDebug.sh
