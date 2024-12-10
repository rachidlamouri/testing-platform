import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { assertNotUndefined } from '../../../package-agnostic-utilities/nil/assertNotUndefined';
import { RankDirection } from '../../programmable-units/graph-visualization/directed-graph/attributeByKeyGS';
import { DirectedEdge } from '../../programmable-units/graph-visualization/directed-graph/element/directedEdge';
import { DirectedGraph } from '../../programmable-units/graph-visualization/directed-graph/element/directedGraph';
import {
  DirectedGraphElement,
  DIRECTED_GRAPH_ELEMENT_COLLECTION_ID,
  DirectedGraphElementStreamMetatype,
} from '../../programmable-units/graph-visualization/directed-graph/element/directedGraphElement';
import { DirectedGraphNode } from '../../programmable-units/graph-visualization/directed-graph/element/directedGraphNode';
import {
  NodeShape,
  NodeStyle,
} from '../../programmable-units/graph-visualization/directed-graph/graphviz-adapter/element-attribute-by-key/partialNodeAttributeByKey';
import { DirectedGraphLocator } from '../../programmable-units/graph-visualization/directed-graph/locator/directedGraphLocator';
import { ProgrammedTransformSourceInstance } from '../../programmable-units/linting/source/programmedTransformSource';
import {
  Interactable,
  INTERACTABLE_COLLECTION_ID,
  InteractableStreamMetatype,
} from './interactable';
import {
  PARSED_INPUT_COLLECTION_ID,
  ParsedInputStreamMetatype,
} from './parsedInput';
import { Prerequisite } from './prerequisite';
import { Skill } from './skill';

const PROGRAMMED_TRANSFORM_NAME = 'buildGraphElements' as const;

const transformSource = new ProgrammedTransformSourceInstance({
  filePath: __filename,
  programmedTransformName: PROGRAMMED_TRANSFORM_NAME,
});

/**
 * Converts parsed input html to a directed graph
 */
export const buildGraphElements = buildProgrammedTransform({
  name: PROGRAMMED_TRANSFORM_NAME,
})
  .fromItem2<ParsedInputStreamMetatype>({
    collectionId: PARSED_INPUT_COLLECTION_ID,
  })
  .toItemTuple2<DirectedGraphElementStreamMetatype>({
    collectionId: DIRECTED_GRAPH_ELEMENT_COLLECTION_ID,
  })
  .toItemTuple2<InteractableStreamMetatype>({
    collectionId: INTERACTABLE_COLLECTION_ID,
  })
  .onTransform((input) => {
    const graphElements: DirectedGraphElement[] = [];
    const interactables: Interactable[] = [];

    const graphLocator = new DirectedGraphLocator({
      source: transformSource,
    });

    const root = new DirectedGraph({
      locator: graphLocator,
      inputAttributeByKey: {
        rankdir: RankDirection.LeftRight,
      },
      outputFileName: 'out',
    });
    graphElements.push(root);

    const skillNodeById = new Map<string, DirectedGraphNode>();
    const skillById = new Map<string, Skill>(
      input.sections.flatMap((section) => {
        return section.skills.map((skill) => {
          return [skill.id.forHuman, skill];
        });
      }),
    );

    input.sections.forEach((section) => {
      section.skills.forEach((skill) => {
        const sentenceLabel = skill.title
          .split(' ')
          .map((word) => {
            const firstLetter = word.at(0);
            assertNotUndefined(firstLetter);
            return firstLetter.toUpperCase() + word.substring(1);
          })
          .join(' ');

        const node = new DirectedGraphNode({
          graphLocator,
          parentLocator: graphLocator,
          source: transformSource,
          distinguisher: skill.title,
          inputAttributeByKey: {
            label: sentenceLabel,
            shape: NodeShape.Box,
            style: NodeStyle.Rounded,
          },
        });

        graphElements.push(node);
        interactables.push(
          new Interactable({
            item: skill,
            element: node,
          }),
        );

        skillNodeById.set(skill.id.forHuman, node);
      });
    });

    input.sections.forEach((section) => {
      section.skills.forEach((skill) => {
        const headId = skill.id.forHuman;
        const head = skillNodeById.get(headId);
        assertNotUndefined(head);

        skill.prerequisites.forEach((prerequisite) => {
          const tailNode = skillNodeById.get(prerequisite);
          const tailSkill = skillById.get(prerequisite);
          assertNotUndefined(
            tailNode,
            `Invalid prerequisite "${prerequisite}"`,
          );
          assertNotUndefined(tailSkill);

          const edge = new DirectedEdge({
            graphLocator,
            tail: tailNode,
            head,
            source: transformSource,
          });

          graphElements.push(edge);
          interactables.push(
            new Interactable({
              item: new Prerequisite({
                tailId: tailSkill.id.forHuman,
                headId,
              }),
              element: edge,
            }),
          );
        });
      });
    });

    return {
      [DIRECTED_GRAPH_ELEMENT_COLLECTION_ID]: graphElements,
      [INTERACTABLE_COLLECTION_ID]: interactables,
    };
  })
  .assemble();
