import { assertIsDefined } from '../../../../utilities/assertIsDefined';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  FILE_DEPENDENCY_GEPP,
  FileDependencyVoque,
} from '../dependency/fileDependency';
import { BOUNDARY_GEPP, BoundaryVoque } from './boundary';
import {
  BOUNDARY_ASSOCIATION_GEPP,
  BoundaryAssociationInstance,
  BoundaryAssociationVoque,
} from './boundaryAssociation';

/**
 * Traverses all file dependencies to construct all permutations of associated
 * boundaries. That is, if file A imports file B, then that will result in the
 * associations: A,B and B,A.
 */
export const getBoundaryAssociations = buildEstinant({
  name: 'getBoundaryAssociations',
})
  .fromVoictent2<FileDependencyVoque>({
    gepp: FILE_DEPENDENCY_GEPP,
  })
  .andFromVoictent2<BoundaryVoque>({
    gepp: BOUNDARY_GEPP,
  })
  .toHubblepupTuple2<BoundaryAssociationVoque>({
    gepp: BOUNDARY_ASSOCIATION_GEPP,
  })
  .onPinbe((fileDependencyList, boundaryVoictent) => {
    const referencedBoundaryZornSetByReferencingBoundaryZorn = new Map<
      string,
      Set<string>
    >();

    fileDependencyList.forEach((fileDependency) => {
      const importingBoundaryZorn =
        fileDependency.importingFile.boundary.zorn.forHuman;
      const importedBoundaryZorn =
        fileDependency.importedFile.boundary.zorn.forHuman;

      const referencedSetForImportingBoundary =
        referencedBoundaryZornSetByReferencingBoundaryZorn.get(
          importingBoundaryZorn,
        ) ?? new Set();
      const referencedSetForImportedBoundary =
        referencedBoundaryZornSetByReferencingBoundaryZorn.get(
          importedBoundaryZorn,
        ) ?? new Set();

      referencedSetForImportingBoundary.add(importedBoundaryZorn);
      referencedSetForImportedBoundary.add(importingBoundaryZorn);

      referencedBoundaryZornSetByReferencingBoundaryZorn.set(
        importingBoundaryZorn,
        referencedSetForImportingBoundary,
      );
      referencedBoundaryZornSetByReferencingBoundaryZorn.set(
        importedBoundaryZorn,
        referencedSetForImportedBoundary,
      );
    });

    const rawBoundaryAssociation = [
      ...referencedBoundaryZornSetByReferencingBoundaryZorn.entries(),
    ].flatMap(([referencingBoundaryZorn, referencedBoundaryZornSet]) => {
      return [...referencedBoundaryZornSet].map((referencedBoundaryZorn) => {
        return {
          referencingBoundaryZorn,
          referencedBoundaryZorn,
        };
      });
    });

    const boundaryAssociationList = rawBoundaryAssociation.map(
      ({ referencingBoundaryZorn, referencedBoundaryZorn }) => {
        const referencingBoundary = boundaryVoictent.byZorn.get(
          referencingBoundaryZorn,
        );
        const referencedBoundary = boundaryVoictent.byZorn.get(
          referencedBoundaryZorn,
        );

        assertIsDefined(referencingBoundary);
        assertIsDefined(referencedBoundary);

        return new BoundaryAssociationInstance({
          referencingBoundary,
          referencedBoundary,
        });
      },
    );

    return boundaryAssociationList;
  })
  .assemble();
