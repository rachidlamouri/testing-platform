import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  EngineProgram3Voque,
  ENGINE_PROGRAM_3_GEPP,
} from '../../programmable-units/engine-program/engineProgram3';
import {
  DIRECTED_GRAPH_METADATA_ENTRY_GEPP,
  DirectedGraphMetadataEntryInstance,
  DirectedGraphMetadataEntryVoque,
} from '../../programmable-units/graph-visualization/directedGraphMetadataEntry';

/**
 * Gets metadata for engine program concepts that require the full program
 * context
 */
export const getTopLevelEngineProgramMetadataEntries = buildProgrammedTransform(
  {
    name: 'getTopLevelEngineProgramMetadataEntries',
  },
)
  .fromItem2<EngineProgram3Voque>({
    collectionId: ENGINE_PROGRAM_3_GEPP,
  })
  .toItemTuple2<DirectedGraphMetadataEntryVoque>({
    collectionId: DIRECTED_GRAPH_METADATA_ENTRY_GEPP,
  })
  .onTransform((engineProgram) => {
    const programEntry = new DirectedGraphMetadataEntryInstance({
      elementId: engineProgram.digestibleId,
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
    });

    const startNodeEntry = new DirectedGraphMetadataEntryInstance({
      elementId: engineProgram.locator.startingNodeId,
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
            value: engineProgram.initializedVoqueLocatorList
              .map((voqueLocator) => voqueLocator.displayName)
              .join(', '),
          },
        ],
      },
    });

    // TODO: this logic is duplicated in getEngineProgram as well
    const terminatingEstinantList = engineProgram.estinantList.filter(
      (estinant) => estinant.outputList.length === 0,
    );

    const endNodeEntry = new DirectedGraphMetadataEntryInstance({
      elementId: engineProgram.locator.endingNodeId,
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
            value: engineProgram.endingVoqueLocatorList
              .map((voqueLocator) => voqueLocator.displayName)
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
    });

    return [programEntry, startNodeEntry, endNodeEntry];
  })
  .assemble();
