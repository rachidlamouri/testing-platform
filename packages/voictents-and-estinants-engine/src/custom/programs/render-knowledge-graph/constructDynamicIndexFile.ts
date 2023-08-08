import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  OUTPUT_FILE_GEPP,
  OutputFileVoque,
} from '../../programmable-units/output-file/outputFile';
import { BOUNDARY_FACT_GEPP, BoundaryFactVoque } from './boundary/boundaryFact';

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
    const list2 = boundaryFactList.map((boundaryFact, index) => {
      const variableName = `boundary${index}`;

      return {
        boundaryFact,
        variableName,
      };
    });

    const importStatementList = list2.map(({ boundaryFact, variableName }) => {
      return `import { Main as ${variableName} } from './${boundaryFact.rootGraphLocator.debugName}';`;
    });

    const importStatementText = importStatementList.join('\n');

    const text = `
      ${importStatementText}

      export default [
        ${list2
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
      text,
    };
  })
  .assemble();
