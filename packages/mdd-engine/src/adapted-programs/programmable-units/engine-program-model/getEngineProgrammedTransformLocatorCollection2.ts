import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  ENGINE_PROGRAMMED_TRANSFORM_LOCATOR_2_COLLECTION_ID,
  EngineProgrammedTransformLocator2,
  EngineProgrammedTransformLocator2StreamMetatype,
} from './engineProgrammedTransformLocator2';
import {
  PROGRAM_PROGRAMMED_TRANSFORM_RELATIONSHIP_COLLECTION_ID,
  ProgramProgrammedTransformRelationshipStreamMetatype,
} from './programProgrammedTransformRelationship';

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
    name: 'getEngineProgrammedTransformLocatorCollection2',
  })
    .fromCollection2<ProgramProgrammedTransformRelationshipStreamMetatype>({
      collectionId: PROGRAM_PROGRAMMED_TRANSFORM_RELATIONSHIP_COLLECTION_ID,
    })
    .toItemTuple2<EngineProgrammedTransformLocator2StreamMetatype>({
      collectionId: ENGINE_PROGRAMMED_TRANSFORM_LOCATOR_2_COLLECTION_ID,
    })
    .onTransform((relationshipList) => {
      const entries = relationshipList
        .map((relationship) => relationship.programmedTransformLocator)
        .map(
          (
            programmedTransformLocator,
          ): [string, EngineProgrammedTransformLocator2] => [
            programmedTransformLocator.id.forHuman,
            programmedTransformLocator,
          ],
        );

      const locatorById = new Map<string, EngineProgrammedTransformLocator2>(
        entries,
      );

      const uniqueLocatorList = [...locatorById.values()];

      return uniqueLocatorList;
    })
    .assemble();
