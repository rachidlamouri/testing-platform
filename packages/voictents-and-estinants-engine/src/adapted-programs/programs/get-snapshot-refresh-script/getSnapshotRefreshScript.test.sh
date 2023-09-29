set -e

echo "# get-snapshot-refresh-script"
echo "Perfoming test run of "getSnapshotRefreshScript""
npx ts-node packages/voictents-and-estinants-engine/src/adapted-programs/programs/get-snapshot-refresh-script/getSnapshotRefreshScript.ts
bash checkUncommittedDebug.sh
