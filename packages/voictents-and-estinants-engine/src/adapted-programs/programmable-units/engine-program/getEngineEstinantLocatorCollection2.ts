import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  ENGINE_ESTINANT_LOCATOR_2_GEPP,
  EngineEstinantLocator2,
  EngineEstinantLocator2Voque,
} from './engineEstinantLocator2';
import {
  PROGRAM_PROGRAMMED_TRANSFORM_RELATIONSHIP_COLLECTION_ID,
  ProgramProgrammedTransformRelationshipStreamMetatype,
} from './programEstinantRelationship';

/**
 * Consumes the entire collection of engine program locators in order to
 * deduplicate their estinant locator information. This transform makes sure
 * that each estinant is only processed once.
 *
 * @readableName getProgrammedTransformLocatorCollection
 *
 * @canonicalDeclaration
 */
export const getEngineProgrammedTransformLocatorCollection2 =
  buildProgrammedTransform({
    name: 'getEngineEstinantLocatorCollection2',
  })
    .fromCollection2<ProgramProgrammedTransformRelationshipStreamMetatype>({
      collectionId: PROGRAM_PROGRAMMED_TRANSFORM_RELATIONSHIP_COLLECTION_ID,
    })
    .toItemTuple2<EngineEstinantLocator2Voque>({
      collectionId: ENGINE_ESTINANT_LOCATOR_2_GEPP,
    })
    .onTransform((relationshipList) => {
      const entries = relationshipList
        .map((relationship) => relationship.programmedTransformLocator)
        .map((estinantLocator): [string, EngineEstinantLocator2] => [
          estinantLocator.id.forHuman,
          estinantLocator,
        ]);

      const locatorByZorn = new Map<string, EngineEstinantLocator2>(entries);

      const uniqueLocatorList = [...locatorByZorn.values()];

      return uniqueLocatorList;
    })
    .assemble();
