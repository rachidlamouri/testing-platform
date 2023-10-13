set -e

echo "# test-untriggered-transform-input-key-group-error"
echo "Testing that the engine emits an error when a cology is left untriggered"
npx ts-node packages/voictents-and-estinants-engine/src/core-programs/engine-behavior/testUntriggeredTransformInputKeyGroupError.ts
bash checkUncommittedDebug.sh
