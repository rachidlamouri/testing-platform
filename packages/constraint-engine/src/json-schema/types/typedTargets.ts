import { TypedTarget } from '../../types/typedTarget';
import { JsonMetaTargetTypeId } from './constants';
import { JsonTarget } from './targets';

export type JsonMetaUnknownTypedTarget = TypedTarget<
  JsonMetaTargetTypeId.UnknownType,
  JsonTarget
>;
