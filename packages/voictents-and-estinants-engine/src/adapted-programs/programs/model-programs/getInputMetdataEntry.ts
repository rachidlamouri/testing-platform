import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { OdeshinZorn } from '../../../adapter/odeshin/odeshin2';
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
export const getInputMetdataEntry = buildEstinant({
  name: 'getInputMetdataEntry',
})
  .fromHubblepup2<ProgramEstinantInputRelationshipVoque>({
    gepp: PROGRAM_ESTINANT_INPUT_RELATIONSHIP_GEPP,
  })
  .andFromHubblepupTuple2<EngineEstinantInput2Voque, [OdeshinZorn]>({
    gepp: ESTINANT_INPUT_2_GEPP,
    framate: (relationship) => {
      return [relationship.hubblepup.estinantInput.zorn];
    },
    croard: (engineEstinant) => engineEstinant.hubblepup.zorn,
  })
  .toHubblepup2<DirectedGraphMetadataEntryVoque>({
    gepp: DIRECTED_GRAPH_METADATA_ENTRY_GEPP,
  })
  .onPinbe((relationship, [estinantInput]) => {
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
