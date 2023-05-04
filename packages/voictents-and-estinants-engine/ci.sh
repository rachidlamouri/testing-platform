set -e

npx ts-node packages/voictents-and-estinants-engine/src/example-programs/testJsonSerialization.ts
bash checkUncommitted.sh
