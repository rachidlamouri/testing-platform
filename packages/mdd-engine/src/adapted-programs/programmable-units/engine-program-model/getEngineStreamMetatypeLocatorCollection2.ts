import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  ENGINE_STREAM_METATYPE_LOCATOR_2_COLLECTION_ID,
  EngineStreamMetatypeLocator2StreamMetatype,
} from './engineStreamMetatypeLocator2';
import {
  PROGRAMMED_TRANSFORM_STREAM_METATYPE_RELATIONSHIP_2_COLLECTION_ID,
  ProgrammedTransformStreamMetatypeRelationship2StreamMetatype,
} from './programmedTransformStreamMetatypeRelationship2';
import {
  PROGRAM_STREAM_METATYPE_RELATIONSHIP_2_COLLECTION_ID,
  ProgramStreamMetatypeRelationship2StreamMetatype,
} from './programStreamMetatypeRelationship2';

/**
 * Consumes the entire collection engine program locators and engine estinant
 * locators in order to get a unique list of voque locators. This transform
 * makes sure that each engine voque is only processed once.
 *
 * @readableName getStreamMetatypeLocatorCollection
 *
 * @todo move the responsibility of uniqueness to a collection
 *
 * @canonicalDeclaration
 */
export const getEngineStreamMetatypeLocatorCollection2 =
  buildProgrammedTransform({
    name: 'getEngineStreamMetatypeLocatorCollection2',
  })
    .fromCollection2<ProgramStreamMetatypeRelationship2StreamMetatype>({
      collectionId: PROGRAM_STREAM_METATYPE_RELATIONSHIP_2_COLLECTION_ID,
    })
    .andFromCollection2<ProgrammedTransformStreamMetatypeRelationship2StreamMetatype>(
      {
        collectionId:
          PROGRAMMED_TRANSFORM_STREAM_METATYPE_RELATIONSHIP_2_COLLECTION_ID,
      },
    )
    .toItemTuple2<EngineStreamMetatypeLocator2StreamMetatype>({
      collectionId: ENGINE_STREAM_METATYPE_LOCATOR_2_COLLECTION_ID,
    })
    .onTransform(
      (
        programRelationshipCollection,
        programmedTransformStreamMetatypeRelationshipCollection,
      ) => {
        const streamMetatypeLocatorById = new Map(
          [
            ...programRelationshipCollection.list,
            ...programmedTransformStreamMetatypeRelationshipCollection.list,
          ].map((relationship) => {
            return [
              relationship.streamMetatypeLocator.id,
              relationship.streamMetatypeLocator,
            ] as const;
          }),
        );

        const uniqueLocatorList = [...streamMetatypeLocatorById.values()];

        return uniqueLocatorList;
      },
    )
    .assemble();
