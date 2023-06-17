import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ENGINE_VOQUE_LOCATOR_GEPP,
  EngineVoqueLocatorVoque,
} from './engineVoqueLocator';
import {
  ESTINANT_VOQUE_RELATIONSHIP_GEPP,
  EstinantVoqueRelationshipVoque,
} from './estinantVoqueRelationship';
import {
  PROGRAM_VOQUE_RELATIONSHIP_GEPP,
  ProgramVoqueRelationshipVoque,
} from './programVoqueRelationship';

/**
 * Consumes the entire collection of program voque relationships to get a unique
 * set of voque locators. This transform makes sure that each engine voque is
 * only processed once.
 *
 * @todo move the responsibility of uniqueness to a collection
 */
export const getEngineVoqueLocatorCollection = buildEstinant({
  name: 'getEngineVoqueLocatorCollection',
})
  .fromVoictent2<ProgramVoqueRelationshipVoque>({
    gepp: PROGRAM_VOQUE_RELATIONSHIP_GEPP,
  })
  .andFromVoictent2<EstinantVoqueRelationshipVoque>({
    gepp: ESTINANT_VOQUE_RELATIONSHIP_GEPP,
  })
  .toHubblepupTuple2<EngineVoqueLocatorVoque>({
    gepp: ENGINE_VOQUE_LOCATOR_GEPP,
  })
  .onPinbe((programRelationshipList, estinantVoqueRelationshipList) => {
    const voqueLocatorByZorn = new Map(
      [...programRelationshipList, ...estinantVoqueRelationshipList].map(
        (relationship) => {
          return [
            relationship.voqueLocator.zorn,
            relationship.voqueLocator,
          ] as const;
        },
      ),
    );

    const uniqueLocatorList = [...voqueLocatorByZorn.values()];

    return uniqueLocatorList;
  })
  .assemble();
