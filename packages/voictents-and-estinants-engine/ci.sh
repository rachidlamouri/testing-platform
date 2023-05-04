set -e

echo "Testing json serialization"
npx ts-node packages/voictents-and-estinants-engine/src/example-programs/testJsonSerialization.ts
bash checkUncommitted.sh
printf "\n"

echo "Testing transforming data for serialization"
npx ts-node packages/voictents-and-estinants-engine/src/example-programs/testBuildAddMetadataForSerialization.ts
bash checkUncommitted.sh
printf "\n"

echo "Testing getTypeScriptTypedDatum"
npx ts-node packages/voictents-and-estinants-engine/src/example-programs/testGetTypeScriptTypedDatum.ts
bash checkUncommitted.sh
printf "\n"

echo "Testing getCustomTypedDatum"
npx ts-node packages/voictents-and-estinants-engine/src/example-programs/testGetCustomTypedDatum.ts
bash checkUncommitted.sh
printf "\n"

echo "Testing custom serialization"
npx ts-node packages/voictents-and-estinants-engine/src/example-programs/testSerialize.ts
bash checkUncommitted.sh
printf "\n"


