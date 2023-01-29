import { TypedTarget } from '../../types/typedTarget';
import { JsonTargetTypeId } from './constants';
import {
  JsonArrayTarget,
  JsonBooleanTarget,
  JsonNullTarget,
  JsonNumberTarget,
  JsonObjectTarget,
  JsonStringTarget,
  JsonTarget,
} from './targets';

export type JsonUnknownTypedTarget = TypedTarget<
  JsonTargetTypeId.Unknown,
  JsonTarget
>;

export type JsonStringTypedTarget = TypedTarget<
  JsonTargetTypeId.String,
  JsonStringTarget
>;

export type JsonNumberTypedTarget = TypedTarget<
  JsonTargetTypeId.Number,
  JsonNumberTarget
>;

export type JsonBooleanTypedTarget = TypedTarget<
  JsonTargetTypeId.Boolean,
  JsonBooleanTarget
>;

export type JsonNullTypedTarget = TypedTarget<
  JsonTargetTypeId.Null,
  JsonNullTarget
>;

export type JsonArrayTypedTarget = TypedTarget<
  JsonTargetTypeId.Array,
  JsonArrayTarget
>;

export type JsonObjectTypedTarget = TypedTarget<
  JsonTargetTypeId.Object,
  JsonObjectTarget
>;

export type JsonKnownTypedTargetOptionsTuple = readonly [
  JsonStringTypedTarget,
  JsonNumberTypedTarget,
  JsonBooleanTypedTarget,
  JsonNullTypedTarget,
  JsonArrayTypedTarget,
  JsonObjectTypedTarget,
];

export type JsonKnownTypedTarget = JsonKnownTypedTargetOptionsTuple[number];

// TODO: figure out what to do so we don't have to make an extraneous export
export type TypedTargets = symbol;
