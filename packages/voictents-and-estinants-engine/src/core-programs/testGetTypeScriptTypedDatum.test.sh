set -e

echo "# test-get-type-script-typed-datum"
echo "Testing "getTypeScriptTypedDatum""
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/testGetTypeScriptTypedDatum.ts
bash checkUncommittedDebug.sh
