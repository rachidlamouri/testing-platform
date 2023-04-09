import * as uuid from 'uuid';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  OutputFile,
  OutputFileVoictent,
  OUTPUT_FILE_GEPP,
} from '../output-file/outputFile';
import {
  EngineProgramTreeNodeVoictent,
  ENGINE_PROGRAM_TREE_NODE_GEPP,
} from './tree/engineProgramTreeNode';

enum EntityNodeTypeName {
  VOICTENT = 'VOICTENT',
  ESTINANT = 'ESTINANT',
  ESTINANT_INPUT = 'ESTINANT_INPUT',
}

type EntityNode = {
  typeName: EntityNodeTypeName;
  name: string;
};

type RenderableNode = {
  left: EntityNode;
  right: EntityNode;
};

type IdentifiableEntityNode = {
  id: string;
  node: EntityNode;
};

type IdentifiableRenderableNode = {
  left: IdentifiableEntityNode;
  right: IdentifiableEntityNode;
};

export const constructEngineProgramTreeOutputFile = buildEstinant({
  name: 'constructEngineProgramTreeOutputFile',
})
  .fromGrition<EngineProgramTreeNodeVoictent>({
    gepp: ENGINE_PROGRAM_TREE_NODE_GEPP,
  })
  .toHubblepup<OutputFileVoictent>({
    gepp: OUTPUT_FILE_GEPP,
  })
  .onPinbe((input) => {
    const endEntityNode: EntityNode = {
      typeName: EntityNodeTypeName.VOICTENT,
      name: 'END',
    };

    const allPrerenderNodes = input.estinantList.flatMap<RenderableNode>(
      (estinant) => {
        const estinantNode: EntityNode = {
          typeName: EntityNodeTypeName.ESTINANT,
          name: estinant.estinantName,
        };

        const inputNodes = estinant.inputList.flatMap<RenderableNode>(
          (estinantInput) => {
            const voictentNode: EntityNode = {
              typeName: EntityNodeTypeName.VOICTENT,
              name: estinantInput.voictentName,
            };

            const estinantInputNode: EntityNode = {
              typeName: EntityNodeTypeName.ESTINANT_INPUT,
              name: `${estinant.estinantName}/${estinantInput.index}`,
            };

            return [
              {
                left: voictentNode,
                right: estinantInputNode,
              },
              {
                left: estinantInputNode,
                right: estinantNode,
              },
            ];
          },
        );

        const outputNodes =
          estinant.outputList.length > 0
            ? estinant.outputList.map<RenderableNode>((estinantOutput) => {
                const estinantOutputNode: EntityNode = {
                  typeName: EntityNodeTypeName.VOICTENT,
                  name: estinantOutput.voictentName,
                };

                return {
                  left: estinantNode,
                  right: estinantOutputNode,
                };
              })
            : [
                {
                  left: estinantNode,
                  right: endEntityNode,
                },
              ];

        return [...inputNodes, ...outputNodes];
      },
    );

    if (
      allPrerenderNodes.some(
        (node) =>
          node.right.typeName === EntityNodeTypeName.VOICTENT &&
          node.right.name === 'Error',
      )
    ) {
      allPrerenderNodes.push({
        left: {
          typeName: EntityNodeTypeName.VOICTENT,
          name: 'Error',
        },
        right: endEntityNode,
      });
    }

    const identifiableEntityNodeMap = new Map<string, IdentifiableEntityNode>();
    allPrerenderNodes
      .flatMap((prerenderNode) => [prerenderNode.left, prerenderNode.right])
      .forEach((entityNode) => {
        const identifiableEntityNode = identifiableEntityNodeMap.get(
          entityNode.name,
        ) ?? {
          id: `S${uuid.v4().slice(0, 8)}`,
          node: entityNode,
        };

        identifiableEntityNodeMap.set(entityNode.name, identifiableEntityNode);
      });

    const renderNodeLineList = [...identifiableEntityNodeMap.values()].map(
      // eslint-disable-next-line array-callback-return
      ({ id, node }) => {
        switch (node.typeName) {
          case EntityNodeTypeName.VOICTENT:
            return `${id}[${node.name}]`;
          case EntityNodeTypeName.ESTINANT:
            return `${id}>${node.name}]`;
          case EntityNodeTypeName.ESTINANT_INPUT: {
            const inputLetter = node.name.split('/')[1] === '0' ? 'L' : 'R';
            return `${id}{${inputLetter}}`;
          }
        }
      },
    );

    const renderEdgeLineList = allPrerenderNodes
      .map<IdentifiableRenderableNode>((prerenderNode) => ({
        left: identifiableEntityNodeMap.get(
          prerenderNode.left.name,
        ) as IdentifiableEntityNode,
        right: identifiableEntityNodeMap.get(
          prerenderNode.right.name,
        ) as IdentifiableEntityNode,
      }))
      .map(({ left, right }) => `${left.id}-->${right.id}`);

    const allLineList = [...renderNodeLineList, ...renderEdgeLineList];

    const markdown = `# ${input.programName}

\`\`\`mermaid
flowchart TD
${allLineList.join('\n')}
\`\`\`
`;

    const outputFile: OutputFile = {
      fileName: input.programName,
      fileExtensionSuffix: 'md',
      text: markdown,
    };

    return outputFile;
  })
  .assemble();
