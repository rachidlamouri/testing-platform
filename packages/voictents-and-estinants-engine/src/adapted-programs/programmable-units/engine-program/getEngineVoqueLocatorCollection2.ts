import { buildEstinant } from '../../../adapter/estinant-builder/buildEstinant';
import {
  ENGINE_VOQUE_LOCATOR_2_GEPP,
  EngineVoqueLocator2Voque,
} from './engineVoqueLocator2';
import {
  ESTINANT_VOQUE_RELATIONSHIP_2_GEPP,
  EstinantVoqueRelationship2Voque,
} from './estinantVoqueRelationship2';
import {
  PROGRAM_VOQUE_RELATIONSHIP_2_GEPP,
  ProgramVoqueRelationship2Voque,
} from './programVoqueRelationship2';

/**
 * Consumes the entire collection engine program locators and engine estinant
 * locators in order to get a unique list of voque locators. This transform
 * makes sure that each engine voque is only processed once.
 *
 * @readableName getStreamMetatypeLocatorCollection
 *
 * @todo move the responsibility of uniqueness to a collection
 */
export const getEngineVoqueLocatorCollection2 = buildEstinant({
  name: 'getEngineVoqueLocatorCollection2',
})
  .fromVoictent2<ProgramVoqueRelationship2Voque>({
    gepp: PROGRAM_VOQUE_RELATIONSHIP_2_GEPP,
  })
  .andFromVoictent2<EstinantVoqueRelationship2Voque>({
    gepp: ESTINANT_VOQUE_RELATIONSHIP_2_GEPP,
  })
  .toHubblepupTuple2<EngineVoqueLocator2Voque>({
    gepp: ENGINE_VOQUE_LOCATOR_2_GEPP,
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
