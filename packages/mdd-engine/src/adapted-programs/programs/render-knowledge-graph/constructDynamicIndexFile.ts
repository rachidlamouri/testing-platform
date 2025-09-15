import * as recast from 'recast';
import Case from 'case';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  OUTPUT_FILE_COLLECTION_ID,
  OutputFileStreamMetatype,
} from '../../programmable-units/output-file/outputFile';
import {
  APP_RENDERER_DELAYER_COLLECTION_ID,
  AppRendererDelayerInstance,
  AppRendererDelayerStreamMetatype,
} from './appRendererDelayer';
import {
  EnumReferenceConfiguration,
  IdentifierConfiguration,
  treeifyDatum,
} from './treeifyDatum';
import { LAYER_COLLECTION_ID, LayerStreamMetatype } from './layer/layer';
import {
  PARTITION_FACT_COLLECTION_ID,
  PartitionFact,
  PartitionFactStreamMetatype,
} from './partition-fact/partitionFact';
import { assertNotUndefined } from '../../../package-agnostic-utilities/nil/assertNotUndefined';
import {
  NavigationLayer,
  NavigationPartition,
} from './app/browser/dynamicComponentTypes';
import { SpreadN } from '../../../package-agnostic-utilities/type/spreadN';

/**
 * Generates a barrel file for every file created by decodeAndRecastSvgDocument for the
 * knowledge graph app to import
 */
export const constructDynamicIndexFile = buildProgrammedTransform({
  name: 'constructDynamicIndexFile',
})
  .fromCollection2<LayerStreamMetatype>({
    collectionId: LAYER_COLLECTION_ID,
  })
  .andFromCollection2<PartitionFactStreamMetatype>({
    collectionId: PARTITION_FACT_COLLECTION_ID,
  })
  .toItem2<OutputFileStreamMetatype>({
    collectionId: OUTPUT_FILE_COLLECTION_ID,
  })
  .toItem2<AppRendererDelayerStreamMetatype>({
    collectionId: APP_RENDERER_DELAYER_COLLECTION_ID,
  })
  .onTransform((layerCollection, partitionFactCollection) => {
    const getPartitionComponentVariableName = (
      partitionFact: PartitionFact,
    ): string => {
      return `${Case.pascal(partitionFact.layer.displayName)}_${Case.pascal(
        partitionFact.boundary.displayName,
      )}`;
    };

    const partitionFactListByLayerId = new Map<string, PartitionFact[]>();
    partitionFactCollection.list.forEach((partitionFact) => {
      const key = partitionFact.layer.id.forHuman;
      const list = partitionFactListByLayerId.get(key) ?? [];
      list.push(partitionFact);
      partitionFactListByLayerId.set(key, list);
    });

    const importStatementList = partitionFactCollection.list.map(
      (partitionFact) => {
        const componentVariableName =
          getPartitionComponentVariableName(partitionFact);
        return `import { Main as ${componentVariableName} } from './${partitionFact.rootGraphLocator.distinguisher}';`;
      },
    );

    const importStatementText = importStatementList.join('\n');

    type ModifiedNavigationPartition = SpreadN<
      [
        Omit<NavigationPartition, 'Component' | 'boundaryTypeName'>,
        {
          Component: IdentifierConfiguration;
          boundaryTypeName: EnumReferenceConfiguration;
        },
      ]
    >;

    type ModifiedNavigationLayer = SpreadN<
      [
        Omit<NavigationLayer, 'partitionList'>,
        { partitionList: ModifiedNavigationPartition[] },
      ]
    >;

    const sortedLayerCollection = layerCollection.list
      .slice()
      .sort((layerA, layerB) => {
        return layerA.sortOrder - layerB.sortOrder;
      });

    const navigationLayerList =
      sortedLayerCollection.map<ModifiedNavigationLayer>((layer) => {
        const partitionList = partitionFactListByLayerId.get(layer.id.forHuman);
        assertNotUndefined(
          partitionList,
          `Unable to find partition list for layer: ${layer.displayName}`,
        );

        const navigationPartitionList =
          partitionList.map<ModifiedNavigationPartition>((partitionFact) => {
            const componentVariableName =
              getPartitionComponentVariableName(partitionFact);

            return {
              boundaryTypeName: new EnumReferenceConfiguration(
                'BoundaryTypeName',
                partitionFact.boundary.typeName,
              ),
              boundaryId: partitionFact.boundary.id.forMachine,
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
      import { BoundaryTypeName } from "../../../boundary/boundaryTypeName";
      import { GeneratedIndex } from '../dynamicComponentTypes';

      export default ${dynamicIndexCode} satisfies GeneratedIndex
    `;

    return {
      [OUTPUT_FILE_COLLECTION_ID]: {
        filePath:
          'packages/mdd-engine/src/adapted-programs/programs/render-knowledge-graph/app/browser/generated/index.tsx',
        text: programText,
      },
      [APP_RENDERER_DELAYER_COLLECTION_ID]: new AppRendererDelayerInstance({
        programmedTransformName: 'constructDynamicIndexFile',
      }),
    };
  })
  .assemble();
