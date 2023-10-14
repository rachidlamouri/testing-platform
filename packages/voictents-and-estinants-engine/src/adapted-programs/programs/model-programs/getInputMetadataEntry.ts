import { buildProgrammedTransform } from '../../../adapter/estinant-builder/buildEstinant';
import { OdeshinZorn } from '../../../adapter/identifiable-item/identifiableItem';
import {
  ESTINANT_INPUT_2_GEPP,
  EngineEstinantInput2Voque,
} from '../../programmable-units/engine-program/input-output/engineEstinantInput2';
import {
  PROGRAM_ESTINANT_INPUT_RELATIONSHIP_GEPP,
  ProgramEstinantInputRelationshipVoque,
} from '../../programmable-units/engine-program/input-output/programEstinantInputRelationship';
import {
  DIRECTED_GRAPH_METADATA_ENTRY_GEPP,
  DirectedGraphMetadataEntryInstance,
  DirectedGraphMetadataEntryVoque,
} from '../../programmable-units/graph-visualization/directedGraphMetadataEntry';

/**
 * Gets information about transform inputs and their connected collections
 */
export const getInputMetadataEntry = buildProgrammedTransform({
  name: 'getInputMetadataEntry',
})
  .fromItem2<ProgramEstinantInputRelationshipVoque>({
    collectionId: PROGRAM_ESTINANT_INPUT_RELATIONSHIP_GEPP,
  })
  .andFromHubblepupTuple2<EngineEstinantInput2Voque, [OdeshinZorn]>({
    collectionId: ESTINANT_INPUT_2_GEPP,
    getRightKeyTuple: (relationship) => {
      return [relationship.item.estinantInput.zorn];
    },
    getRightKey: (engineEstinant) => engineEstinant.item.zorn,
  })
  .toItem2<DirectedGraphMetadataEntryVoque>({
    collectionId: DIRECTED_GRAPH_METADATA_ENTRY_GEPP,
  })
  .onTransform((relationship, [estinantInput]) => {
    const inputName =
      estinantInput.index === 0
        ? 'Left Input'
        : `Right Input ${estinantInput.index}`;

    const entry = new DirectedGraphMetadataEntryInstance({
      elementId: estinantInput.id,
      rootGraphLocator: relationship.rootGraphLocator,
      metadata: {
        title: `${estinantInput.estinantName}: ${inputName}`,
        fieldList: [
          {
            label: 'Type',
            value: 'Transform Input',
          },
          {
            label: 'Source Collection',
            value: estinantInput.voictentName,
          },
        ],
      },
    });

    return entry;
  })
  .assemble();
