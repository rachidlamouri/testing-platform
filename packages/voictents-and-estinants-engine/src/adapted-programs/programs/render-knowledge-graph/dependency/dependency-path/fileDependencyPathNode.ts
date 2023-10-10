import { buildNamedConstructorFunction } from '../../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexzornTemplate,
  Complexzorn,
} from '../../../../../package-agnostic-utilities/data-structure/zorn';
import { SimplifyN } from '../../../../../package-agnostic-utilities/type/simplify';
import { FileDependencyZorn } from '../fileDependencyZorn';

const FILE_DEPENDENCY_PATH_NODE_ZORN_TEMPLATE = [
  ['fileDependency', FileDependencyZorn],
  'index',
] as const satisfies GenericComplexzornTemplate;
type FileDependencyPathNodeZornTemplate =
  typeof FILE_DEPENDENCY_PATH_NODE_ZORN_TEMPLATE;
class FileDependencyPathNodeZorn extends Complexzorn<FileDependencyPathNodeZornTemplate> {
  get rawTemplate(): FileDependencyPathNodeZornTemplate {
    return FILE_DEPENDENCY_PATH_NODE_ZORN_TEMPLATE;
  }
}

type FileDependencyPathNodeConstructorInput = {
  fileDependencyZorn: FileDependencyZorn;
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
    { zorn: FileDependencyPathNodeZorn },
    Pick<FileDependencyPathNodeConstructorInput, 'directoryPath' | 'index'>,
  ]
>;

export const { FileDependencyPathNodeInstance } = buildNamedConstructorFunction(
  {
    constructorName: 'FileDependencyPathNodeInstance',
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'zorn',
      'directoryPath',
      'index',
    ],
  } as const,
)
  .withTypes<FileDependencyPathNodeConstructorInput, FileDependencyPathNode>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { fileDependencyZorn, index } = input;

      const twoDigitIndex = `${index}`.padStart(2, '0');

      const zorn = new FileDependencyPathNodeZorn({
        fileDependency: fileDependencyZorn,
        index: twoDigitIndex,
      });

      return {
        zorn,
        ...input,
      } satisfies FileDependencyPathNode;
    },
  })
  .assemble();
