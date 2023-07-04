import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';
import { Directory } from '../../../programmable-units/file/directory';
import { Boundary } from '../boundary/boundary';

type BaseBoundarySubdirectorySet = {
  boundary: Boundary;
  subdirectorySet: Directory[];
};

type BoundarySubdirectorySetPrototype = {
  get zorn(): string;
  get boundaryDirectoryPath(): string;
  get subdirectoryPathList(): string[];
};

/**
 * The list of directory paths under a boundary
 */
export type BoundarySubdirectorySet = ObjectWithPrototype<
  BaseBoundarySubdirectorySet,
  BoundarySubdirectorySetPrototype
>;

export const { BoundarySubdirectorySetInstance } =
  buildConstructorFunctionWithName('BoundarySubdirectorySetInstance')<
    BaseBoundarySubdirectorySet,
    BoundarySubdirectorySetPrototype,
    BoundarySubdirectorySet
  >({
    zorn: (boundarySubdirectorySet) => {
      return boundarySubdirectorySet.boundary.zorn;
    },
    boundaryDirectoryPath: (boundarySubdirectorySet) => {
      return boundarySubdirectorySet.boundary.directoryPath;
    },
    subdirectoryPathList: (boundarySubdirectorySet) => {
      return boundarySubdirectorySet.subdirectorySet.map((directory) => {
        return directory.directoryPath;
      });
    },
  });

export const BOUNDARY_SUBDIRECTORY_SET_GEPP = 'boundary-subdirectory-set';

export type BoundarySubdirectorySetGepp = typeof BOUNDARY_SUBDIRECTORY_SET_GEPP;

export type BoundarySubdirectorySetVoque = InMemoryOdeshin2Voque<
  BoundarySubdirectorySetGepp,
  BoundarySubdirectorySet
>;
