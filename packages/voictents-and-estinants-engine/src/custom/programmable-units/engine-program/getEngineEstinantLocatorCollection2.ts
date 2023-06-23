import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
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
 */
export const getEngineEstinantLocatorCollection2 = buildEstinant({
  name: 'getEngineEstinantLocatorCollection2',
})
  .fromVoictent2<ProgramEstinantRelationshipVoque>({
    gepp: PROGRAM_ESTINANT_RELATIONSHIP_GEPP,
  })
  .toHubblepupTuple2<EngineEstinantLocator2Voque>({
    gepp: ENGINE_ESTINANT_LOCATOR_2_GEPP,
  })
  .onPinbe((relationshipList) => {
    const entries = relationshipList
      .map((relationship) => relationship.estinantLocator)
      .map((estinantLocator): [string, EngineEstinantLocator2] => [
        estinantLocator.zorn,
        estinantLocator,
      ]);

    const locatorByZorn = new Map<string, EngineEstinantLocator2>(entries);

    const uniqueLocatorList = [...locatorByZorn.values()];

    return uniqueLocatorList;
  })
  .assemble();
