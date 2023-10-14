import { buildNamedConstructorFunction } from '../../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../../../package-agnostic-utilities/type/simplify';
import { FileDependencyId } from '../fileDependencyZorn';

const FILE_DEPENDENCY_PATH_NODE_ID_TEMPLATE = [
  ['fileDependency', FileDependencyId],
  'index',
] as const satisfies GenericComplexIdTemplate;
type FileDependencyPathNodeIdTemplate =
  typeof FILE_DEPENDENCY_PATH_NODE_ID_TEMPLATE;
class FileDependencyPathNodeId extends ComplexId<FileDependencyPathNodeIdTemplate> {
  get rawTemplate(): FileDependencyPathNodeIdTemplate {
    return FILE_DEPENDENCY_PATH_NODE_ID_TEMPLATE;
  }
}

type FileDependencyPathNodeConstructorInput = {
  fileDependencyId: FileDependencyId;
  directoryPath: string;
  index: number;
};

/**
 * The conceptual marker on a directory along a FileDependencyPath
 *
 * @todo define FileDependencyPath
 */
export type FileDependencyPathNode = SimplifyN<
  [
    { id: FileDependencyPathNodeId },
    Pick<FileDependencyPathNodeConstructorInput, 'directoryPath' | 'index'>,
  ]
>;

export const { FileDependencyPathNodeInstance } = buildNamedConstructorFunction(
  {
    constructorName: 'FileDependencyPathNodeInstance',
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'id',
      'directoryPath',
      'index',
    ],
  } as const,
)
  .withTypes<FileDependencyPathNodeConstructorInput, FileDependencyPathNode>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { fileDependencyId, index } = input;

      const twoDigitIndex = `${index}`.padStart(2, '0');

      const id = new FileDependencyPathNodeId({
        fileDependency: fileDependencyId,
        index: twoDigitIndex,
      });

      return {
        id,
        ...input,
      } satisfies FileDependencyPathNode;
    },
  })
  .assemble();
