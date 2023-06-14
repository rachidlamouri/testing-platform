import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ENGINE_PROGRAM_2_GEPP,
  EngineProgram2Voque,
} from '../../programmable-units/engine-program/engineProgram2';
import {
  DIRECTED_GRAPH_METADATA_ENTRY_GEPP,
  DirectedGraphMetadataEntry,
  DirectedGraphMetadataEntryVoque,
} from '../../programmable-units/graph-visualization/directedGraphMetadataEntry';

export const getTopLevelEngineProgramMetadataEntries = buildEstinant({
  name: 'getTopLevelEngineProgramMetadataEntries',
})
  .fromHubblepup2<EngineProgram2Voque>({
    gepp: ENGINE_PROGRAM_2_GEPP,
  })
  .toHubblepupTuple2<DirectedGraphMetadataEntryVoque>({
    gepp: DIRECTED_GRAPH_METADATA_ENTRY_GEPP,
  })
  .onPinbe((engineProgram) => {
    const programEntry: DirectedGraphMetadataEntry = {
      elementId: engineProgram.id,
      rootGraphLocator: engineProgram.locator.rootGraphLocator,
      metadata: {
        title: engineProgram.programName,
        fieldList: [
          {
            label: 'Type',
            value: 'Program',
          },
          {
            label: 'Description',
            value: engineProgram.description,
          },
          {
            label: 'File Path',
            value: engineProgram.filePath,
          },
        ],
      },
    };

    const startNodeEntry: DirectedGraphMetadataEntry = {
      elementId: engineProgram.startingNodeId,
      rootGraphLocator: engineProgram.locator.rootGraphLocator,
      metadata: {
        title: 'Start',
        fieldList: [
          {
            label: 'Description',
            value:
              'This represents the starting point for all paths through an engine program. It points to the collections for which the programmer has provided intitial values.',
          },
          {
            label: 'Starting Collections',
            value: engineProgram.initializedVoqueList
              .map((engineVoque) => engineVoque.displayName)
              .join(', '),
          },
        ],
      },
    };

    // TODO: this logic is duplicated in getEngineProgram as well
    const terminatingEstinantList = engineProgram.estinantList.filter(
      (estinant) => estinant.outputList.length === 0,
    );

    const endNodeEntry: DirectedGraphMetadataEntry = {
      elementId: engineProgram.endingNodeId,
      rootGraphLocator: engineProgram.locator.rootGraphLocator,
      metadata: {
        title: 'End',
        fieldList: [
          {
            label: 'Description',
            value:
              'This represents a terminal point for all paths through an engine program. The program as a whole does not terminate until zero transforms are able to process information from their input collections on a tick of the engine.',
          },
          {
            label: 'Unused Collections',
            value: engineProgram.endingVoqueList
              .map((engineVoque) => engineVoque.displayName)
              .join(', '),
          },
          {
            label: 'Terminating Transforms',
            value: terminatingEstinantList
              .map((estinant) => estinant.estinantName)
              .join(', '),
          },
        ],
      },
    };

    return [programEntry, startNodeEntry, endNodeEntry];
  })
  .assemble();
