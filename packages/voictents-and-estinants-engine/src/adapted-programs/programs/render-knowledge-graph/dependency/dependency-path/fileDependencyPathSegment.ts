import { buildNamedConstructorFunction } from '../../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';

/**
 * The concept of a segment of an arrow spanning two adjacent nodes, or a node
 * and a file, within a FileDependencyPath
 *
 * @todo define FileDependencyPath
 */
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
      typeCheckErrorMessage: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => input,
    })
    .assemble();
