set -e

npx ts-node packages/voictents-and-estinants-engine/src/example-programs/testJsonSerialization.ts
bash checkUncommitted.sh

npx ts-node packages/voictents-and-estinants-engine/src/example-programs/testBuildAddMetadataForSerialization.ts
bash checkUncommitted.sh
