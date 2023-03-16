import { SetOptional } from 'type-fest';

export enum Shape {
  Box = 'box',
}

export type AttributeByKey = {
  id: string;
  label: string;
  shape: Shape;
  fontname: string;
};

export type PartialAttributeByKey = SetOptional<
  AttributeByKey,
  Exclude<keyof AttributeByKey, 'id'>
>;
