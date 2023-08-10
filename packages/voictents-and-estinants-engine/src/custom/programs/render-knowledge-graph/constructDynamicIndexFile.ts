import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  OUTPUT_FILE_GEPP,
  OutputFileVoque,
} from '../../programmable-units/output-file/outputFile';
import { BOUNDARY_FACT_GEPP, BoundaryFactVoque } from './boundary/boundaryFact';

/**
 * Generates a barrel file for every file created by decodeAndRecastSvgDocument for the
 * knowledge graph app to import
 */
export const constructDynamicIndexFile = buildEstinant({
  name: 'constructDynamicIndexFile',
})
  .fromVoictent2<BoundaryFactVoque>({
    gepp: BOUNDARY_FACT_GEPP,
  })
  .toHubblepup2<OutputFileVoque>({
    gepp: OUTPUT_FILE_GEPP,
  })
  .onPinbe((boundaryFactList) => {
    const boundaryFactWithVariableNameList = boundaryFactList.map(
      (boundaryFact, index) => {
        const variableName = `boundary${index}`;

        return {
          boundaryFact,
          variableName,
        };
      },
    );

    const importStatementList = boundaryFactWithVariableNameList.map(
      ({ boundaryFact, variableName }) => {
        return `import { Main as ${variableName} } from './${boundaryFact.rootGraphLocator.debugName}';`;
      },
    );

    const importStatementText = importStatementList.join('\n');

    const programText = `
      ${importStatementText}

      export default [
        ${boundaryFactWithVariableNameList
          .map(({ boundaryFact, variableName }) => {
            const entry = [
              '{',
              `  label: "${boundaryFact.boundary.displayName}",`,
              `  Component: ${variableName},`,
              '},',
            ];

            return entry.join('\n');
          })
          .join('\n')}
      ];
    `;

    return {
      filePath:
        'packages/voictents-and-estinants-engine/src/custom/programs/render-knowledge-graph/app/browser/generated/index.tsx',
      text: programText,
    };
  })
  .assemble();
