import { TypedTarget } from '../../types/typedTarget';
import { JsonMetaTargetTypeId } from './constants';
import { JsonTarget, JsonTypedTargetTarget } from './targets';

export type JsonMetaUnknownTypedTarget = TypedTarget<
  JsonMetaTargetTypeId.UnknownType,
  JsonTarget
>;

export type JsonMetaKnownTypedTarget = TypedTarget<
  JsonMetaTargetTypeId.KnownType,
  JsonTypedTargetTarget
>;
