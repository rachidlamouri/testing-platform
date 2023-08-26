import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  DEPENDENCY_FACT_GEPP,
  DependencyFactVoque,
} from '../dependency/dependencyFact';
import {
  ASSOCIATED_BOUNDARY_FACT_GEPP,
  AssociatedBoundaryFactVoque,
  AssociatedBoundaryFactInstance,
} from './associatedBoundaryFact';
import {
  BOUNDARY_FACT_GEPP,
  BoundaryFactVoque,
} from '../boundary/boundaryFact';

/**
 * Finds the set of boundaries whose files either import or are imported by
 * files in the referencing boundary
 */
export const getAssociatedBoundaryFacts = buildEstinant({
  name: 'getAssociatedBoundaryFacts',
})
  .fromHubblepup2<BoundaryFactVoque>({
    gepp: BOUNDARY_FACT_GEPP,
  })
  .andFromVoictent2<BoundaryFactVoque>({
    gepp: BOUNDARY_FACT_GEPP,
  })
  .andFromVoictent2<DependencyFactVoque>({
    gepp: DEPENDENCY_FACT_GEPP,
  })
  .toHubblepupTuple2<AssociatedBoundaryFactVoque>({
    gepp: ASSOCIATED_BOUNDARY_FACT_GEPP,
  })
  .onPinbe((referencingBoundaryFact, boundaryFactList, dependencyFactList) => {
    const crossBoundaryDependencyFactList = dependencyFactList.filter(
      (dependencyFact) => {
        return (
          dependencyFact.isCrossBoundary &&
          (dependencyFact.importingBoundaryZorn ===
            referencingBoundaryFact.boundary.zorn ||
            dependencyFact.importedBoundaryZorn ===
              referencingBoundaryFact.boundary.zorn)
        );
      },
    );

    const referencedBoundaryZornSet = new Set(
      crossBoundaryDependencyFactList.map((dependencyFact) => {
        if (
          dependencyFact.importedBoundaryZorn ===
          referencingBoundaryFact.boundary.zorn
        ) {
          return dependencyFact.importingBoundaryZorn;
        }

        return dependencyFact.importedBoundaryZorn;
      }),
    );

    const referencedBoundaryFactList = boundaryFactList.filter((boundaryFact) =>
      referencedBoundaryZornSet.has(boundaryFact.boundary.zorn),
    );

    const associatedBoundaryFactList = referencedBoundaryFactList.map(
      (referencedBoundaryFact) => {
        return new AssociatedBoundaryFactInstance({
          referencingBoundaryFact,
          referencedBoundaryFact,
        });
      },
    );

    return associatedBoundaryFactList;
  })
  .assemble();
