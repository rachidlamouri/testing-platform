import * as recast from 'recast';
import Case from 'case';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  OUTPUT_FILE_GEPP,
  OutputFileVoque,
} from '../../programmable-units/output-file/outputFile';
import {
  APP_RENDERER_DELAYER_GEPP,
  AppRendererDelayerInstance,
  AppRendererDelayerVoque,
} from './appRendererDelayer';
import {
  IdentifierConfiguration,
  treeifyDatum,
} from './decodeAndRecastSvgDocument';
import { LAYER_GEPP, LayerVoque } from './layer/layer';
import {
  PARTITION_FACT_GEPP,
  PartitionFact,
  PartitionFactVoque,
} from './partition-fact/partitionFact';
import { assertNotUndefined } from '../../../utilities/assertNotUndefined';
import {
  NavigationLayer,
  NavigationPartition,
} from './app/browser/dynamicComponentTypes';
import { SpreadN } from '../../../utilities/spreadN';

/**
 * Generates a barrel file for every file created by decodeAndRecastSvgDocument for the
 * knowledge graph app to import
 */
export const constructDynamicIndexFile = buildEstinant({
  name: 'constructDynamicIndexFile',
})
  .fromVoictent2<LayerVoque>({
    gepp: LAYER_GEPP,
  })
  .andFromVoictent2<PartitionFactVoque>({
    gepp: PARTITION_FACT_GEPP,
  })
  .toHubblepup2<OutputFileVoque>({
    gepp: OUTPUT_FILE_GEPP,
  })
  .toHubblepup2<AppRendererDelayerVoque>({
    gepp: APP_RENDERER_DELAYER_GEPP,
  })
  .onPinbe((layerVoictent, partitionFactVoictent) => {
    const getPartitionComponentVariableName = (
      partitionFact: PartitionFact,
    ): string => {
      return `${Case.pascal(partitionFact.layer.displayName)}_${Case.pascal(
        partitionFact.boundary.displayName,
      )}`;
    };

    const partitionFactListByLayerZorn = new Map<string, PartitionFact[]>();
    partitionFactVoictent.list.forEach((partitionFact) => {
      const key = partitionFact.layer.zorn.forHuman;
      const list = partitionFactListByLayerZorn.get(key) ?? [];
      list.push(partitionFact);
      partitionFactListByLayerZorn.set(key, list);
    });

    const importStatementList = partitionFactVoictent.list.map(
      (partitionFact) => {
        const componentVariableName =
          getPartitionComponentVariableName(partitionFact);
        return `import { Main as ${componentVariableName} } from './${partitionFact.rootGraphLocator.distinguisher}';`;
      },
    );

    const importStatementText = importStatementList.join('\n');

    type ModifiedNavigationPartition = SpreadN<
      [
        Omit<NavigationPartition, 'Component'>,
        { Component: IdentifierConfiguration },
      ]
    >;

    type ModifiedNavigationLayer = SpreadN<
      [
        Omit<NavigationLayer, 'partitionList'>,
        { partitionList: ModifiedNavigationPartition[] },
      ]
    >;

    const sortedLayerVoictent = layerVoictent.slice().sort((layerA, layerB) => {
      return layerA.sortOrder - layerB.sortOrder;
    });

    const navigationLayerList =
      sortedLayerVoictent.map<ModifiedNavigationLayer>((layer) => {
        const partitionList = partitionFactListByLayerZorn.get(
          layer.zorn.forHuman,
        );
        assertNotUndefined(
          partitionList,
          `Unable to find partition list for layer: ${layer.displayName}`,
        );

        const navigationPartitionList =
          partitionList.map<ModifiedNavigationPartition>((partitionFact) => {
            const componentVariableName =
              getPartitionComponentVariableName(partitionFact);

            return {
              boundaryId: partitionFact.boundary.zorn.forMachine,
              label: partitionFact.boundary.displayName,
              Component: new IdentifierConfiguration(componentVariableName),
            };
          });

        return {
          label: layer.displayName,
          partitionList: navigationPartitionList,
        };
      });

    const dynamicIndexConfiguration = {
      navigationList: navigationLayerList,
      partitionByBoundaryId: new Map(
        navigationLayerList.flatMap((layer) => {
          return layer.partitionList.map((partition) => {
            return [partition.boundaryId, partition];
          });
        }),
      ),
    };

    const dynamicIndexAstNode = treeifyDatum(dynamicIndexConfiguration);

    const dynamicIndexCode = recast.print(dynamicIndexAstNode).code;

    const programText = `
      ${importStatementText}
      import { GeneratedIndex } from '../dynamicComponentTypes';

      export default ${dynamicIndexCode} satisfies GeneratedIndex
    `;

    return {
      [OUTPUT_FILE_GEPP]: {
        filePath:
          'packages/voictents-and-estinants-engine/src/custom/programs/render-knowledge-graph/app/browser/generated/index.tsx',
        text: programText,
      },
      [APP_RENDERER_DELAYER_GEPP]: new AppRendererDelayerInstance({
        estinantName: 'constructDynamicIndexFile',
      }),
    };
  })
  .assemble();
