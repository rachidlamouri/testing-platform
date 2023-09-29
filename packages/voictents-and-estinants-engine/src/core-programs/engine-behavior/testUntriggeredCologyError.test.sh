set -e

echo "# test-untriggered-cology-error"
echo "Testing that the engine emits an error when a cology is left untriggered"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testUntriggeredCologyError.ts
bash checkUncommittedDebug.sh
