set -e

echo "# comments-example"
echo "Perfoming test run of "commentsExample""
npx ts-node packages/voictents-and-estinants-engine/src/adapted-programs/programs/comments-example/commentsExample.ts
bash checkUncommittedDebug.sh
