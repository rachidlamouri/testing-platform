set -e

echo "# test-get-type-script-typed-datum"
echo "Testing "getTypeScriptTypedDatum""
npx ts-node packages/mdd-engine/src/core-programs/testGetTypeScriptTypedDatum.ts
bash checkUncommittedDebug.sh
