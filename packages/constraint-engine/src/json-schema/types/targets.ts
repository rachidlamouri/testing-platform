import { TypedTarget } from '../../types/typedTarget';
import { JsonDataType } from './constants';

export type JsonStringTarget = string;

export type JsonNumberTarget = number;

export type JsonBooleanTarget = boolean;

export type JsonNullTarget = null;

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export type JsonArrayTarget = JsonTarget[];

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export type JsonObjectTarget = { [key: string]: JsonTarget };

export type JsonTarget =
  | JsonStringTarget
  | JsonNumberTarget
  | JsonBooleanTarget
  | JsonNullTarget
  | JsonArrayTarget
  | JsonObjectTarget;

export type JsonStringTypedTargetTarget = TypedTarget<
  JsonDataType.String,
  JsonStringTarget
>;

export type JsonNumberTypedTargetTarget = TypedTarget<
  JsonDataType.Number,
  JsonNumberTarget
>;

export type JsonBooleanTypedTargetTarget = TypedTarget<
  JsonDataType.Boolean,
  JsonBooleanTarget
>;

export type JsonNullTypedTargetTarget = TypedTarget<
  JsonDataType.Null,
  JsonNullTarget
>;

export type JsonArrayTypedTargetTarget = TypedTarget<
  JsonDataType.Array,
  JsonArrayTarget
>;

export type JsonObjectTypedTargetTarget = TypedTarget<
  JsonDataType.Object,
  JsonObjectTarget
>;

export type JsonTypedTargetTarget =
  | JsonStringTypedTargetTarget
  | JsonNumberTypedTargetTarget
  | JsonBooleanTypedTargetTarget
  | JsonNullTypedTargetTarget
  | JsonArrayTypedTargetTarget
  | JsonObjectTypedTargetTarget;
