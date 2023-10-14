import { assertNotNull } from '../../../../package-agnostic-utilities/nil/assertNotNull';
import { assertNotUndefined } from '../../../../package-agnostic-utilities/nil/assertNotUndefined';
import { ComplexMap } from '../../../../package-agnostic-utilities/data-structure/complexMap';
import { buildNamedConstructorFunction } from '../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { BoundedFile } from '../file/boundedFile';
import { PartitionFact } from '../partition-fact/partitionFact';
import { FileDependencyPathSegment } from './dependency-path/fileDependencyPathSegment';
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

/**
 * A group of dependencies that share the same imported file and an associated
 * partition. The same group will be associated with multiple partitions.
 */
type PartitionedFileDependencyGroup = {
  id: PartitionedFileDependencyGroupZorn;
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
      'id',
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
      typeCheckErrorMessage: {
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

        const id = new PartitionedFileDependencyGroupZorn({
          partitionFact: partitionFact.id,
          importedFile: importedFile.id,
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
              dependencyGroupZorn: id,
              pathNode,
              pathHeadId: importedFile.localGraphElementId.forMachine,
              pathTailIdSet: new Set(
                importingFileList.map((importingFile) => {
                  return importingFile.localGraphElementId.forMachine;
                }),
              ),
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

        const keyTemplate = ['tailDirectoryPath', 'headDirectoryPath'] as const;
        const pathTailIdSetByPathSegment = new ComplexMap<
          FileDependencyPathSegment,
          Set<string>,
          typeof keyTemplate
        >({
          keyTemplate,
        });

        fileDependencyList
          .flatMap((fileDependency) => {
            return fileDependency.pathSegmentSet.map((pathSegment) => {
              const pathTailId =
                fileDependency.importingFile.localGraphElementId.forMachine;
              return {
                pathSegment,
                pathTailId,
              };
            });
          })
          .forEach(({ pathSegment, pathTailId }) => {
            const pathTailIdSet =
              pathTailIdSetByPathSegment.get(pathSegment) ?? new Set<string>();
            pathTailIdSet.add(pathTailId);
            pathTailIdSetByPathSegment.set(pathSegment, pathTailIdSet);
          });

        const pathHeadId = importedFile.localGraphElementId.forMachine;

        const partialPathSegmentSet = pathSegmentCombination
          .values()
          .map((pathSegment) => {
            const { tailDirectoryPath, headDirectoryPath } = pathSegment;

            const tailPathNode = pathNodeByDirectoryPath.get(tailDirectoryPath);
            const headPathNode = pathNodeByDirectoryPath.get(headDirectoryPath);
            const pathTailIdSet = pathTailIdSetByPathSegment.get(pathSegment);

            assertNotUndefined(tailPathNode);
            assertNotUndefined(headPathNode);
            assertNotNull(pathTailIdSet);

            return new FileDependencyPathSegmentFactInstance({
              partitionFact,
              dependencyGroupZorn: id,
              tailGraphElementZorn: tailPathNode.localGraphElementId,
              headGraphElementZorn: headPathNode.localGraphElementId,
              pathHeadId,
              pathTailIdSet,
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
              dependencyGroupZorn: id,
              tailGraphElementZorn:
                fileDependency.importingFile.localGraphElementId,
              headGraphElementZorn: tailNode.localGraphElementId,
              pathHeadId,
              pathTailIdSet: new Set([
                fileDependency.importingFile.localGraphElementId.forMachine,
              ]),
            });
          }),
          ...partialPathSegmentSet,
          new FileDependencyPathSegmentFactInstance({
            partitionFact,
            dependencyGroupZorn: id,
            tailGraphElementZorn: headNode.localGraphElementId,
            headGraphElementZorn: importedFile.localGraphElementId,
            pathHeadId,
            pathTailIdSet: new Set(
              fileDependencyList.map((fileDependency) => {
                return fileDependency.importingFile.localGraphElementId
                  .forMachine;
              }),
            ),
          }),
        ];

        return {
          id,
          partitionFact,
          importedFile,
          importingFileList,
          pathNodeSet,
          pathSegmentSet,
        } satisfies PartitionedFileDependencyGroup;
      },
    })
    .assemble();
