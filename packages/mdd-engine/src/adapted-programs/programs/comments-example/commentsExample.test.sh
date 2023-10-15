set -e

echo "# comments-example"
echo "Perfoming test run of "commentsExample""
npx ts-node packages/mdd-engine/src/adapted-programs/programs/comments-example/commentsExample.ts
bash checkUncommittedDebug.sh
