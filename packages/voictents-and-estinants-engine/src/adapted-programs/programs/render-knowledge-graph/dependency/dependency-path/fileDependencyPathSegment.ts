import { buildNamedConstructorFunction } from '../../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';

export type FileDependencyPathSegment = {
  tailDirectoryPath: string;
  headDirectoryPath: string;
};

type FileDependencyPathSegmentConstructorInput = FileDependencyPathSegment;

export const { FileDependencyPathSegmentInstance } =
  buildNamedConstructorFunction({
    constructorName: 'FileDependencyPathSegmentInstance',
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'tailDirectoryPath',
      'headDirectoryPath',
    ],
  } as const)
    .withTypes<
      FileDependencyPathSegmentConstructorInput,
      FileDependencyPathSegment
    >({
      typeCheckErrorMesssages: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => input,
    })
    .assemble();
