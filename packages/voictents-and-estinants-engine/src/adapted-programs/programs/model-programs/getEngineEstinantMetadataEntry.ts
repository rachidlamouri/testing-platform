import { buildProgrammedTransform } from '../../../adapter/estinant-builder/buildEstinant';
import { OdeshinZorn } from '../../../adapter/odeshin/identifiableItem';
import {
  ENGINE_ESTINANT_3_GEPP,
  EngineEstinant3Voque,
} from '../../programmable-units/engine-program/engineEstinant3';
import {
  PROGRAM_ESTINANT_RELATIONSHIP_GEPP,
  ProgramEstinantRelationshipVoque,
} from '../../programmable-units/engine-program/programEstinantRelationship';
import {
  DIRECTED_GRAPH_METADATA_ENTRY_GEPP,
  DirectedGraphMetadataEntryInstance,
  DirectedGraphMetadataEntryVoque,
} from '../../programmable-units/graph-visualization/directedGraphMetadataEntry';

/**
 * Gets metadata for transforms
 *
 * @readableName getProgrammedTransformModelMetadataEntry
 */
export const getEngineEstinantMetadataEntry = buildProgrammedTransform({
  name: 'getEngineEstinantMetadataEntry',
})
  .fromItem2<ProgramEstinantRelationshipVoque>({
    collectionId: PROGRAM_ESTINANT_RELATIONSHIP_GEPP,
  })
  .andFromHubblepupTuple2<EngineEstinant3Voque, [OdeshinZorn]>({
    gepp: ENGINE_ESTINANT_3_GEPP,
    framate: (relationship) => {
      return [relationship.item.estinantLocator.zorn];
    },
    croard: (engineEstinant) => engineEstinant.item.locator.zorn,
  })
  .toItem2<DirectedGraphMetadataEntryVoque>({
    collectionId: DIRECTED_GRAPH_METADATA_ENTRY_GEPP,
  })
  .onTransform((relationship, [engineEstinant]) => {
    const entry = new DirectedGraphMetadataEntryInstance({
      elementId: engineEstinant.digestibleId,
      rootGraphLocator: relationship.rootGraphLocator,
      metadata: {
        title: engineEstinant.estinantName,
        fieldList: [
          {
            label: 'Type',
            value: 'Transform',
          },
          {
            label: 'Description',
            value: engineEstinant.commentText,
          },
          ...engineEstinant.inputList.map((input) => {
            return {
              label:
                input.index === 0 ? 'Left Input' : `Right Input ${input.index}`,
              value: input.voictentName,
            };
          }),
          {
            label: 'Output',
            value: engineEstinant.outputList
              .map((output) => output.voictentName)
              .join(', '),
          },
        ],
      },
    });

    return entry;
  })
  .assemble();
