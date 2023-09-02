import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../../utilities/getZorn';
import { Directory } from '../../../programmable-units/file/directory';
import { Boundary } from '../boundary/boundary';

type BaseDirectoryBoundaryRelationship = {
  directory: Directory;
  boundary: Boundary;
};

type DirectoryFactPrototype = {
  get zorn(): string;
};

/**
 * A directory and the boundary it is under
 */
type DirectoryBoundaryRelationship = ObjectWithPrototype<
  BaseDirectoryBoundaryRelationship,
  DirectoryFactPrototype
>;

export const { DirectoryBoundaryRelationshipInstance } =
  buildConstructorFunctionWithName('DirectoryBoundaryRelationshipInstance')<
    BaseDirectoryBoundaryRelationship,
    DirectoryFactPrototype,
    DirectoryBoundaryRelationship
  >({
    zorn: (relationship) => {
      return getZorn([
        relationship.boundary.zorn,
        'directory',
        relationship.directory.zorn.forHuman,
      ]);
    },
  });

export const DIRECTORY_BOUNDARY_RELATIONSHIP_GEPP =
  'directory-boundary-relationship';

type DirectoryBoundaryRelationshipGepp =
  typeof DIRECTORY_BOUNDARY_RELATIONSHIP_GEPP;

export type DirectoryBoundaryRelationshipVoque = InMemoryOdeshin2ListVoque<
  DirectoryBoundaryRelationshipGepp,
  DirectoryBoundaryRelationship
>;
