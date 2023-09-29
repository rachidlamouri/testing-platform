set -e

echo "# categorize-files"
echo "Verifying file extensions"
npx ts-node packages/voictents-and-estinants-engine/src/adapted-programs/programs/categorize-files/categorizeFiles.ts
bash checkUncommittedDebug.sh
