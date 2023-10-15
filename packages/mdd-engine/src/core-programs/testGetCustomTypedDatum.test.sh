set -e

echo "# test-get-custom-typed-datum"
echo "Testing "getCustomTypedDatum""
npx ts-node packages/mdd-engine/src/core-programs/testGetCustomTypedDatum.ts
bash checkUncommittedDebug.sh
