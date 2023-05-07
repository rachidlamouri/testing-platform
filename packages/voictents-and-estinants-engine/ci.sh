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

echo "Testing joining collections one to one"
npx ts-node packages/voictents-and-estinants-engine/src/example-programs/engine-behavior/testJoiningOneToOne.ts
bash checkUncommitted.sh
printf "\n"

echo "Testing joining collections one to many"
npx ts-node packages/voictents-and-estinants-engine/src/example-programs/engine-behavior/testJoiningOneToMany.ts
bash checkUncommitted.sh
printf "\n"

echo "Testing consuming a collection as a whole"
npx ts-node packages/voictents-and-estinants-engine/src/example-programs/engine-behavior/testVoictentInput.ts
bash checkUncommitted.sh
printf "\n"

echo "Test test-graph-render is unchanged"
npx ts-node packages/voictents-and-estinants-engine/src/custom/programs/test-graph-render/testGraphRender.ts
bash checkUncommitted.sh
printf "\n"

echo "Test model-programs is unchanged"
npx ts-node packages/voictents-and-estinants-engine/src/custom/programs/model-programs/modelPrograms.ts
bash checkUncommitted.sh
printf "\n"

echo "Test render-type-script-file-relationships is unchanged"
npx ts-node packages/voictents-and-estinants-engine/src/custom/programs/render-type-script-file-relationships/renderTypeScriptFileRelationships.ts
bash checkUncommitted.sh
printf "\n"

echo "Finished without errors!"
printf "\n"
