import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';

type BaseBoundary = {
  directoryPath: string;
  displayName: string;
};

type BoundaryPrototype = {
  get zorn(): string;
};

/**
 * A group of files and directories in the project with some related concerns, or purpose
 */
export type Boundary = ObjectWithPrototype<BaseBoundary, BoundaryPrototype>;

export const { BoundaryInstance } = buildConstructorFunctionWithName(
  'BoundaryInstance',
)<BaseBoundary, BoundaryPrototype, Boundary>({
  zorn: (boundary) => {
    return boundary.displayName.replaceAll(/(:|\s+),'-'/g, '');
  },
});

export const BOUNDARY_GEPP = 'boundary';

export type BoundaryGepp = typeof BOUNDARY_GEPP;

export type BoundaryVoque = InMemoryOdeshin2Voque<BoundaryGepp, Boundary>;

export const STATIC_BOUNDARY_LIST: Boundary[] = [
  new BoundaryInstance({
    displayName: 'Core Layer',
    directoryPath: 'packages/voictents-and-estinants-engine/src/core',
  }),
  new BoundaryInstance({
    // TODO: move to adapter
    displayName: 'Custom Adapter',
    directoryPath: 'packages/voictents-and-estinants-engine/src/custom/adapter',
  }),
  new BoundaryInstance({
    // TODO: split these up by program and shared boundaries
    displayName: 'Programmable Units',
    directoryPath:
      'packages/voictents-and-estinants-engine/src/custom/programmable-units',
  }),
  new BoundaryInstance({
    displayName: 'Example Programs',
    directoryPath:
      'packages/voictents-and-estinants-engine/src/example-programs',
  }),
  new BoundaryInstance({
    displayName: 'Adapter Layer',
    directoryPath:
      'packages/voictents-and-estinants-engine/src/type-script-adapter',
  }),
  new BoundaryInstance({
    displayName: 'Utilities',
    directoryPath: 'packages/voictents-and-estinants-engine/src/utilities',
  }),
];
