import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { assertNotUndefined } from '../../../../utilities/assertNotUndefined';
import { ComplexMap } from '../../../../utilities/complexMap';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import { BoundedFile } from '../file/boundedFile';
import { PartitionFact } from '../partition-fact/partitionFact';
import {
  FileDependencyPathSegmentFact,
  FileDependencyPathSegmentFactInstance,
} from './dependency-path/fileDependencyPathSegmentFact';
import {
  PartitionedFileDependencyPathNode,
  PartitionedFileDependencyPathNodeInstance,
} from './dependency-path/partitionedFileDependencyPathNode';
import { FileDependency } from './fileDependency';
import { PartitionedFileDependencyGroupZorn } from './partitionedFileDependencyGroupZorn';

export type PartitionedFileDependencyGroupConstructorInput = {
  partitionFact: PartitionFact;
  fileDependencyList: FileDependency[];
};

type PartitionedFileDependencyGroup = {
  zorn: PartitionedFileDependencyGroupZorn;
  partitionFact: PartitionFact;
  importedFile: BoundedFile;
  importingFileList: BoundedFile[];
  pathNodeSet: PartitionedFileDependencyPathNode[];
  pathSegmentSet: FileDependencyPathSegmentFact[];
};

export const { PartitionedFileDependencyGroupInstance } =
  buildNamedConstructorFunction({
    constructorName: 'PartitionedFileDependencyGroupInstance',
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'zorn',
      'partitionFact',
      'importedFile',
      'importingFileList',
      'pathNodeSet',
      'pathSegmentSet',
    ],
  } as const)
    .withTypes<
      PartitionedFileDependencyGroupConstructorInput,
      PartitionedFileDependencyGroup
    >({
      typeCheckErrorMesssages: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { partitionFact, fileDependencyList } = input;

        assertNotUndefined(fileDependencyList[0]);
        const { importedFile } = fileDependencyList[0];
        const importingFileList = fileDependencyList.map(
          ({ importingFile }) => importingFile,
        );

        const zorn = new PartitionedFileDependencyGroupZorn({
          partitionFact: partitionFact.zorn,
          importedFile: importedFile.zorn,
        });

        const pathNodeCombination = new Map(
          fileDependencyList.flatMap((fileDependency) => {
            return fileDependency.pathNodeSet.map((pathNode) => {
              return [pathNode.directoryPath, pathNode] as const;
            });
          }),
        );

        const pathNodeSet = [...pathNodeCombination.values()].map(
          (pathNode) => {
            return new PartitionedFileDependencyPathNodeInstance({
              partitionFact,
              dependencyGroupZorn: zorn,
              pathNode,
            });
          },
        );

        const pathNodeByDirectoryPath = new Map(
          pathNodeSet.map((pathNode) => {
            return [pathNode.directoryPath, pathNode] as const;
          }),
        );

        const pathSegmentCombination = new ComplexMap({
          keyTemplate: ['tailDirectoryPath', 'headDirectoryPath'],
          initialList: fileDependencyList
            .flatMap((fileDependency) => {
              return fileDependency.pathSegmentSet;
            })
            .map((pathSegment) => {
              return [pathSegment, pathSegment] as const;
            }),
        });

        const partialPathSegmentSet = pathSegmentCombination
          .values()
          .map((pathSegment) => {
            const { tailDirectoryPath, headDirectoryPath } = pathSegment;

            const tailPathNode = pathNodeByDirectoryPath.get(tailDirectoryPath);
            const headPathNode = pathNodeByDirectoryPath.get(headDirectoryPath);

            assertNotUndefined(tailPathNode);
            assertNotUndefined(headPathNode);

            return new FileDependencyPathSegmentFactInstance({
              partitionFact,
              dependencyGroupZorn: zorn,
              tailGraphElementZorn: tailPathNode.localGraphElementZorn,
              headGraphElementZorn: headPathNode.localGraphElementZorn,
            });
          });

        const firstDependency = fileDependencyList[0];
        assertNotUndefined(firstDependency);
        const headNode = pathNodeByDirectoryPath.get(
          firstDependency.headNode.directoryPath,
        );
        assertNotUndefined(headNode);

        const pathSegmentSet = [
          ...fileDependencyList.map((fileDependency) => {
            const tailNode = pathNodeByDirectoryPath.get(
              fileDependency.tailNode.directoryPath,
            );
            assertNotUndefined(tailNode);

            return new FileDependencyPathSegmentFactInstance({
              partitionFact,
              dependencyGroupZorn: zorn,
              tailGraphElementZorn:
                fileDependency.importingFile.localGraphElementZorn,
              headGraphElementZorn: tailNode.localGraphElementZorn,
            });
          }),
          ...partialPathSegmentSet,
          new FileDependencyPathSegmentFactInstance({
            partitionFact,
            dependencyGroupZorn: zorn,
            tailGraphElementZorn: headNode.localGraphElementZorn,
            headGraphElementZorn: importedFile.localGraphElementZorn,
          }),
        ];

        return {
          zorn,
          partitionFact,
          importedFile,
          importingFileList,
          pathNodeSet,
          pathSegmentSet,
        } satisfies PartitionedFileDependencyGroup;
      },
    })
    .assemble();

export const PARTITIONED_FILE_DEPENDENCY_GROUP_GEPP =
  'partitioned-file-dependency-group';

type PartitionedFileDependencyGroupGepp =
  typeof PARTITIONED_FILE_DEPENDENCY_GROUP_GEPP;

export type PartitionedFileDependencyGroupVoque = InMemoryOdeshin2ListVoque<
  PartitionedFileDependencyGroupGepp,
  PartitionedFileDependencyGroup
>;
