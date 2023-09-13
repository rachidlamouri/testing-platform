import { buildNamedConstructorFunction } from '../../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../../../utilities/simplify';
import { FileDependencyZorn } from '../fileDependencyZorn';

const FILE_DEPENDENCY_PATH_NODE_ZORN_TEMPLATE = [
  ['fileDependency', FileDependencyZorn],
  'index',
] as const satisfies GenericZorn2Template;
type FileDependencyPathNodeZornTemplate =
  typeof FILE_DEPENDENCY_PATH_NODE_ZORN_TEMPLATE;
class FileDependencyPathNodeZorn extends Zorn2<FileDependencyPathNodeZornTemplate> {
  get rawTemplate(): FileDependencyPathNodeZornTemplate {
    return FILE_DEPENDENCY_PATH_NODE_ZORN_TEMPLATE;
  }
}

type FileDependencyPathNodeConstructorInput = {
  fileDependencyZorn: FileDependencyZorn;
  directoryPath: string;
  index: number;
};

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
