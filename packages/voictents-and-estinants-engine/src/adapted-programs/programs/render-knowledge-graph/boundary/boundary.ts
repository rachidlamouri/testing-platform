import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../../package-agnostic-utilities/type/simplify';
import { Directory } from '../../../programmable-units/file/directory';
import { BoundaryTypeName } from './boundaryTypeName';

const BOUNDARY_ZORN_TEMPLATE = [
  'typeName',
  'normalizedDisplayName',
] as const satisfies GenericComplexIdTemplate;
type BoundaryZornTemplate = typeof BOUNDARY_ZORN_TEMPLATE;
type BoundaryZornInput = {
  typeName: BoundaryTypeName;
  displayName: string;
};
export class BoundaryId extends ComplexId<BoundaryZornTemplate> {
  constructor({ typeName, displayName }: BoundaryZornInput) {
    const normalizedDisplayName = displayName.replaceAll(/(:|\s+),'-'/g, '');
    super({
      typeName,
      normalizedDisplayName,
    });
  }

  get rawTemplate(): BoundaryZornTemplate {
    return BOUNDARY_ZORN_TEMPLATE;
  }
}

type BoundaryConstructorInput = {
  typeName: BoundaryTypeName;
  displayName: string;
  directory: Directory;
};

/**
 * A group of files and directories in the project with some related concerns, or purpose
 */
export type Boundary = SimplifyN<
  [
    {
      id: BoundaryId;
    },
    BoundaryConstructorInput,
  ]
>;

export const { BoundaryInstance } = buildNamedConstructorFunction({
  constructorName: 'BoundaryInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'id',
    'typeName',
    'displayName',
    'directory',
  ],
} as const)
  .withTypes<BoundaryConstructorInput, Boundary>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { typeName, displayName, directory } = input;

      const id = new BoundaryId({ typeName, displayName });

      return {
        id,
        typeName,
        displayName,
        directory,
      };
    },
  })
  .assemble();

export const BOUNDARY_COLLECTION_ID = 'boundary';

type BoundaryGepp = typeof BOUNDARY_COLLECTION_ID;

export type BoundaryStreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<BoundaryGepp, Boundary>;
