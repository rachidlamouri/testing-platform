import { SetOptional } from 'type-fest';

export enum LabelLocation {
  Top = 't',
  Bottom = 'b',
  Center = 'c',
}

export enum Shape {
  Box = 'box',
}

export type AttributeByKey = {
  id: string;
  label: string;
  labelloc: LabelLocation;
  shape: Shape;
  fontname: string;
  fontsize: number;
};

export type PartialAttributeByKey = SetOptional<
  AttributeByKey,
  Exclude<keyof AttributeByKey, 'id'>
>;
