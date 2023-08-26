import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { DEPENDENCY_FACT_GEPP, DependencyFactVoque } from './dependencyFact';
import {
  BaseInvertedDependencyGroup,
  INVERTED_DEPENDENCY_GROUP_GEPP,
  InvertedDependencyGroupInstance,
  InvertedDependencyGroupVoque,
} from './invertedDependencyGroup';

/**
 * Gets a file and all files that import it
 */
export const getInvertedDependencyGroup = buildEstinant({
  name: 'getInvertedDependencyGroup',
})
  .fromVoictent2<DependencyFactVoque>({
    gepp: DEPENDENCY_FACT_GEPP,
  })
  .toHubblepupTuple2<InvertedDependencyGroupVoque>({
    gepp: INVERTED_DEPENDENCY_GROUP_GEPP,
  })
  .onPinbe((dependencyFactList) => {
    const invertedDependencyGroupByImportedFactZorn = new Map<
      string,
      BaseInvertedDependencyGroup
    >();

    dependencyFactList.forEach((dependencyFact) => {
      const invertedDependencyGroup: BaseInvertedDependencyGroup =
        invertedDependencyGroupByImportedFactZorn.get(
          dependencyFact.importedFact.zorn,
        ) ?? {
          importedFact: dependencyFact.importedFact,
          dependencyFactList: [],
        };

      // TODO: expand this to cross-boundary dependencies
      if (
        dependencyFact.importedFact.directoryFact.boundaryFact.boundary.zorn ===
        dependencyFact.importingFact.directoryFact.boundaryFact.boundary.zorn
      ) {
        invertedDependencyGroup.dependencyFactList.push(dependencyFact);
      }

      invertedDependencyGroupByImportedFactZorn.set(
        dependencyFact.importedFact.zorn,
        invertedDependencyGroup,
      );
    });

    const outputList = [
      ...invertedDependencyGroupByImportedFactZorn.values(),
    ].map((baseGroup) => {
      return new InvertedDependencyGroupInstance(baseGroup);
    });

    return outputList;
  })
  .assemble();
