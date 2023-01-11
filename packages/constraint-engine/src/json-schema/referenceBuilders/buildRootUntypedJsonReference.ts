import { ReferenceBuilder } from '../../types/builders/referenceBuilder';
import { JsonTargetTypeId } from '../types/constants';
import { JsonTarget } from '../types/targets';
import { JsonUnknownTypedTarget } from '../types/typedTargets';

const ROOT_JSON_TARGET_PATH = 'data' as const;
type RootJsonTargetPath = typeof ROOT_JSON_TARGET_PATH;

export const buildRootJsonReference: ReferenceBuilder<
  JsonTarget,
  JsonUnknownTypedTarget,
  RootJsonTargetPath
> = (inputInstance) => {
  return {
    typeId: JsonTargetTypeId.Unknown,
    instance: inputInstance,
    path: ROOT_JSON_TARGET_PATH,
  };
};
