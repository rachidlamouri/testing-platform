set -e

echo "# categorize-files"
echo "Verifying file extensions"
npx ts-node packages/mdd-engine/src/adapted-programs/programs/categorize-files/categorizeFiles.ts
bash checkUncommittedDebug.sh
