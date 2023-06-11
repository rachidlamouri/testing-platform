import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
<<<<<<< HEAD
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
=======
  ENGINE_ESTINANT_2_GEPP,
  EngineEstinant2Voque,
} from './engineEstinant2';
import {
  ENGINE_PROGRAM_LOCATOR_2_GEPP,
  EngineProgramLocator2Voque,
} from './engineProgramLocator2';
import {
  ENGINE_VOQUE_LOCATOR_GEPP,
  EngineVoqueLocator,
  EngineVoqueLocatorVoque,
} from './engineVoqueLocator';

/**
 * Consumes the entire collection engine program locators and engine estinant
 * locators in order to get a unique list of voque locators. This transform
 * makes sure that each engine voque is only processed once.
>>>>>>> deb685c (Save next program model changes that affect the current modeler)
 *
 * @todo move the responsibility of uniqueness to a collection
 */
export const getEngineVoqueLocatorCollection = buildEstinant({
  name: 'getEngineVoqueLocatorCollection',
})
<<<<<<< HEAD
  .fromVoictent2<ProgramVoqueRelationshipVoque>({
    gepp: PROGRAM_VOQUE_RELATIONSHIP_GEPP,
  })
  .andFromVoictent2<EstinantVoqueRelationshipVoque>({
    gepp: ESTINANT_VOQUE_RELATIONSHIP_GEPP,
=======
  .fromVoictent2<EngineProgramLocator2Voque>({
    gepp: ENGINE_PROGRAM_LOCATOR_2_GEPP,
  })
  .andFromVoictent2<EngineEstinant2Voque>({
    gepp: ENGINE_ESTINANT_2_GEPP,
>>>>>>> deb685c (Save next program model changes that affect the current modeler)
  })
  .toHubblepupTuple2<EngineVoqueLocatorVoque>({
    gepp: ENGINE_VOQUE_LOCATOR_GEPP,
  })
<<<<<<< HEAD
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
=======
  .onPinbe((engineProgramLocatorList, engineEstinantList) => {
    const voqueLocatorEntryList = [
      ...engineProgramLocatorList.flatMap((programLocator) => {
        return programLocator.engineVoqueLocatorList;
      }),
      ...engineEstinantList.flatMap((engineEstinant) => {
        return engineEstinant.allVoqueLocatorList;
      }),
    ].map((voqueLocator) => {
      return [voqueLocator.zorn, voqueLocator] as const;
    });

    const locatorByZorn = new Map<string, EngineVoqueLocator>(
      voqueLocatorEntryList,
    );

    const uniqueLocatorList = [...locatorByZorn.values()];
>>>>>>> deb685c (Save next program model changes that affect the current modeler)

    return uniqueLocatorList;
  })
  .assemble();
