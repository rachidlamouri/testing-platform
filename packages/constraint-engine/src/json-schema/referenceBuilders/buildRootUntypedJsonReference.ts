import { ReferenceBuilder } from '../../types/builders/referenceBuilder';
import { JsonMetaTargetTypeId } from '../types/constants';
import { JsonTarget } from '../types/targets';
import { JsonMetaUnknownTypedTarget } from '../types/typedTargets';

const ROOT_JSON_TARGET_PATH = 'data' as const;
type RootJsonTargetPath = typeof ROOT_JSON_TARGET_PATH;

export const buildRootJsonReference: ReferenceBuilder<
  JsonTarget,
  JsonMetaUnknownTypedTarget,
  RootJsonTargetPath
> = (inputData) => {
  return {
    typeId: JsonMetaTargetTypeId.UnknownType,
    instance: inputData,
    path: ROOT_JSON_TARGET_PATH,
  };
};
