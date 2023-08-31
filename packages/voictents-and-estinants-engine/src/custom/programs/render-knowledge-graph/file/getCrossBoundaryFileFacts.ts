import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  BOUNDARY_FACT_GEPP,
  BoundaryFactVoque,
} from '../boundary/boundaryFact';
import {
  DependencyFactVoque,
  DEPENDENCY_FACT_GEPP,
} from '../dependency/dependencyFact';
import {
  ASSOCIATED_BOUNDARY_FACT_GEPP,
  AssociatedBoundaryFactVoque,
} from '../associated-boundary/associatedBoundaryFact';
import {
  CROSS_BOUNDARY_FILE_FACT_GEPP,
  CrossBoundaryFileFactInstance,
  CrossBoundaryFileFactVoque,
} from './crossBoundaryFileFact';

export const getCrossBoundaryFileFacts = buildEstinant({
  name: 'getCrossBoundaryFileFacts',
})
  .fromHubblepup2<BoundaryFactVoque>({
    gepp: BOUNDARY_FACT_GEPP,
  })
  .andFromVoictent2<AssociatedBoundaryFactVoque>({
    gepp: ASSOCIATED_BOUNDARY_FACT_GEPP,
  })
  .andFromVoictent2<DependencyFactVoque>({
    gepp: DEPENDENCY_FACT_GEPP,
  })
  .toHubblepupTuple2<CrossBoundaryFileFactVoque>({
    gepp: CROSS_BOUNDARY_FILE_FACT_GEPP,
  })
  .onPinbe(
    (boundaryFact, allAssociatedBoundaryFactList, dependencyFactList) => {
      const associatedBoundaryFactList = allAssociatedBoundaryFactList.filter(
        (associatedBoundaryFact) => {
          return (
            associatedBoundaryFact.referencingBoundaryFact.zorn ===
            boundaryFact.zorn
          );
        },
      );

      const associatedBoundaryByReferencedBoundaryFactZorn = new Map(
        associatedBoundaryFactList.map((associatedBoundaryFact) => {
          return [
            associatedBoundaryFact.referencedBoundaryFact.zorn,
            associatedBoundaryFact,
          ] as const;
        }),
      );

      const crossBoundaryDependencyFactList = dependencyFactList.filter(
        (dependencyFact) => dependencyFact.isCrossBoundary,
      );

      const incomingArrowDependencytFactList =
        crossBoundaryDependencyFactList.filter((dependencyFact) => {
          return (
            dependencyFact.importedBoundaryZorn === boundaryFact.boundary.zorn
          );
        });

      const outgoingArrowDependencyFactList =
        crossBoundaryDependencyFactList.filter((dependencyFact) => {
          return (
            dependencyFact.importingBoundaryZorn === boundaryFact.boundary.zorn
          );
        });

      const importingFileFactByZorn = new Map(
        incomingArrowDependencytFactList.map((dependencyFact) => {
          return [
            dependencyFact.importingFact.zorn,
            dependencyFact.importingFact,
          ] as const;
        }),
      );

      const importedFileFactByZorn = new Map(
        outgoingArrowDependencyFactList.map((dependencyFact) => {
          return [
            dependencyFact.importedFact.zorn,
            dependencyFact.importedFact,
          ] as const;
        }),
      );

      const importingFileFactList = [...importingFileFactByZorn.values()];
      const importedFileFactList = [...importedFileFactByZorn.values()];

      const crossBoundaryFileFactList = [
        ...importingFileFactList,
        ...importedFileFactList,
      ].map((fileFact) => {
        const associatedBoundaryFact =
          associatedBoundaryByReferencedBoundaryFactZorn.get(
            fileFact.directoryFact.boundaryFact.zorn,
          );

        if (associatedBoundaryFact === undefined) {
          throw new Error(
            'Unexpected error: associated boundary does not exist',
          );
        }

        return new CrossBoundaryFileFactInstance({
          associatedBoundaryFact,
          fileFact,
        });
      });

      return crossBoundaryFileFactList;
    },
  )
  .assemble();
