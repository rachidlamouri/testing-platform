import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
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
  PARTITION_FACT_GEPP,
  PartitionFactVoque,
} from './partition-fact/partitionFact';

/**
 * Generates a barrel file for every file created by decodeAndRecastSvgDocument for the
 * knowledge graph app to import
 */
export const constructDynamicIndexFile = buildEstinant({
  name: 'constructDynamicIndexFile',
})
  .fromVoictent2<PartitionFactVoque>({
    gepp: PARTITION_FACT_GEPP,
  })
  .toHubblepup2<OutputFileVoque>({
    gepp: OUTPUT_FILE_GEPP,
  })
  .toHubblepup2<AppRendererDelayerVoque>({
    gepp: APP_RENDERER_DELAYER_GEPP,
  })
  .onPinbe((partitionFactVoictent) => {
    const partitionFactWithVariableNameList = partitionFactVoictent.list.map(
      (partitionFact, index) => {
        const variableName = `boundary${index}`;

        return {
          partitionFact,
          variableName,
        };
      },
    );

    const importStatementList = partitionFactWithVariableNameList.map(
      ({ partitionFact, variableName }) => {
        return `import { Main as ${variableName} } from './${partitionFact.rootGraphLocator.distinguisher}';`;
      },
    );

    const importStatementText = importStatementList.join('\n');

    const programText = `
      ${importStatementText}

      export default [
        ${partitionFactWithVariableNameList
          .map(({ partitionFact, variableName }) => {
            const entry = [
              '{',
              `  boundaryId: "${partitionFact.boundary.zorn.forMachine}",`,
              `  label: "${partitionFact.boundary.displayName}",`,
              `  Component: ${variableName},`,
              '},',
            ];

            return entry.join('\n');
          })
          .join('\n')}
      ];
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
