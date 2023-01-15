npx ts-node packages/constraint-engine/src/customTargets/file/jsonFile/buildJsonFileInstance.test.ts
printf "\n"

npx ts-node packages/constraint-engine/src/customTargets/file/utf8File/buildUtf8FileInstance.test.ts
printf "\n"

npx ts-node packages/constraint-engine/src/customTargets/testingPlatform/packageA/buildPackageAReference.test.ts
printf "\n"

npx ts-node packages/constraint-engine/src/customTargets/testingPlatform/packageDirectory/buildPackageDirectoryReferenceSet.test.ts
printf "\n"

npx ts-node packages/constraint-engine/src/customTargets/testingPlatform/packageDirectorySet/buildPackageDirectorySetReference.test.ts
printf "\n"

npx ts-node packages/constraint-engine/src/engine/referenceBuilders/buildDeprecatedDerivedTargetReferences.test.ts
printf "\n"

npx ts-node packages/constraint-engine/src/engine/referenceBuilders/buildDeprecatedDerivedTargetReferenceSets.test.ts
printf "\n"
