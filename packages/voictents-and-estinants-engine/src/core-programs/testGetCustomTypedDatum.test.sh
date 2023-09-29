set -e

echo "# test-get-custom-typed-datum"
echo "Testing "getCustomTypedDatum""
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/testGetCustomTypedDatum.ts
bash checkUncommittedDebug.sh
