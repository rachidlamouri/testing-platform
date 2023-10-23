set -e

echo "# test-untriggered-transform-input-key-group-error"
echo "Testing that the engine emits an error when a transform input key group is left untriggered"
npx ts-node packages/mdd-engine/src/core-programs/engine-behavior/testUntriggeredTransformInputKeyGroupError.ts
bash checkUncommittedDebug.sh
