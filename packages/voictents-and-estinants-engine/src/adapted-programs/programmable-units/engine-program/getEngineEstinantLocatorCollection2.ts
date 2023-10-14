import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  ENGINE_ESTINANT_LOCATOR_2_GEPP,
  EngineEstinantLocator2,
  EngineEstinantLocator2Voque,
} from './engineEstinantLocator2';
import {
  PROGRAM_ESTINANT_RELATIONSHIP_GEPP,
  ProgramEstinantRelationshipVoque,
} from './programEstinantRelationship';

/**
 * Consumes the entire collection of engine program locators in order to
 * deduplicate their estinant locator information. This transform makes sure
 * that each estinant is only processed once.
 *
 * @readableName getProgrammedTransformLocatorCollection
 */
export const getEngineEstinantLocatorCollection2 = buildProgrammedTransform({
  name: 'getEngineEstinantLocatorCollection2',
})
  .fromCollection2<ProgramEstinantRelationshipVoque>({
    collectionId: PROGRAM_ESTINANT_RELATIONSHIP_GEPP,
  })
  .toItemTuple2<EngineEstinantLocator2Voque>({
    collectionId: ENGINE_ESTINANT_LOCATOR_2_GEPP,
  })
  .onTransform((relationshipList) => {
    const entries = relationshipList
      .map((relationship) => relationship.estinantLocator)
      .map((estinantLocator): [string, EngineEstinantLocator2] => [
        estinantLocator.id.forHuman,
        estinantLocator,
      ]);

    const locatorByZorn = new Map<string, EngineEstinantLocator2>(entries);

    const uniqueLocatorList = [...locatorByZorn.values()];

    return uniqueLocatorList;
  })
  .assemble();
