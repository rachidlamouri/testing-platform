import { SetOptional } from 'type-fest';

export enum Shape {
  Box = 'box',
}

export enum LabelLocation {
  Top = 't',
  Center = 'c',
  Bottom = 'b',
}

export type AttributeByKey = {
  id: string;
  label: string;
  shape: Shape;
  fontname: string;
  labelloc: LabelLocation;
};

export type PartialAttributeByKey = SetOptional<
  AttributeByKey,
  Exclude<keyof AttributeByKey, 'id'>
>;
