import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../../utilities/simplify';
import { Directory } from '../../../programmable-units/file/directory';

import {
  BoundaryAssociation,
  BoundaryAssociationZorn,
} from '../boundary/boundaryAssociation';
import { BoundedDirectory, BoundedDirectoryZorn } from './boundedDirectory';

const BOUNDARY_TO_BOUNDED_DIRECTORY_ASSOCIATION_ZORN_TEMPLATE = [
  ['boundaryAssociation', BoundaryAssociationZorn],
  ['boundedDirectory', BoundedDirectoryZorn],
] as const satisfies GenericZorn2Template;
type BoundaryToBoundedDirectoryAssociationZornTemplate =
  typeof BOUNDARY_TO_BOUNDED_DIRECTORY_ASSOCIATION_ZORN_TEMPLATE;
class BoundaryToBoundedDirectoryAssociationZorn extends Zorn2<BoundaryToBoundedDirectoryAssociationZornTemplate> {
  get rawTemplate(): BoundaryToBoundedDirectoryAssociationZornTemplate {
    return BOUNDARY_TO_BOUNDED_DIRECTORY_ASSOCIATION_ZORN_TEMPLATE;
  }
}

type BoundaryToBoundedDirectoryAssociationConstructorInput = {
  boundaryAssociation: BoundaryAssociation;
  parentDirectory: Directory;
  boundedDirectory: BoundedDirectory;
};

type BoundaryToBoundedDirectoryAssociation = SimplifyN<
  [
    { zorn: BoundaryToBoundedDirectoryAssociationZorn },
    BoundaryToBoundedDirectoryAssociationConstructorInput,
  ]
>;

export const { BoundaryToBoundedDirectoryAssociationInstance } =
  buildNamedConstructorFunction({
    constructorName: 'BoundaryToBoundedDirectoryAssociationInstance',
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'zorn',
      'boundaryAssociation',
      'parentDirectory',
      'boundedDirectory',
    ],
  } as const)
    .withTypes<
      BoundaryToBoundedDirectoryAssociationConstructorInput,
      BoundaryToBoundedDirectoryAssociation
    >({
      typeCheckErrorMesssages: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { boundaryAssociation, boundedDirectory } = input;

        const zorn = new BoundaryToBoundedDirectoryAssociationZorn({
          boundaryAssociation: boundaryAssociation.zorn,
          boundedDirectory: boundedDirectory.zorn,
        });

        return {
          zorn,
          ...input,
        };
      },
    })
    .assemble();

export const BOUNDARY_TO_BOUNDED_DIRECTORY_ASSOCIATION_GEPP =
  'boundary-to-bounded-directory-association';

type BoundaryToBoundedDirectoryAssociationGepp =
  typeof BOUNDARY_TO_BOUNDED_DIRECTORY_ASSOCIATION_GEPP;

export type BoundaryToBoundedDirectoryAssociationVoque =
  InMemoryOdeshin2ListVoque<
    BoundaryToBoundedDirectoryAssociationGepp,
    BoundaryToBoundedDirectoryAssociation
  >;
