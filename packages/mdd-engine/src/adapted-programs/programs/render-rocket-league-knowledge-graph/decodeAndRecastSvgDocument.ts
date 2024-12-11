import * as cheerio from 'cheerio';
import { builders as b, namedTypes as n } from 'ast-types';
import * as recast from 'recast';
import Case from 'case';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { isNotNull } from '../../../package-agnostic-utilities/nil/isNotNull';
import {
  GenericProgramErrorStreamMetatype,
  PROGRAM_ERROR_COLLECTION_ID,
  ProgramErrorElementLocatorTypeName,
  ReportingProgrammedTransformLocator,
} from '../../programmable-units/error/programError';
import {
  OutputFile,
  OutputFileStreamMetatype,
  OUTPUT_FILE_COLLECTION_ID,
} from '../../programmable-units/output-file/outputFile';
import {
  AppRendererDelayerStreamMetatype,
  APP_RENDERER_DELAYER_COLLECTION_ID,
  AppRendererDelayerInstance,
} from '../render-knowledge-graph/appRendererDelayer';
import {
  SVG_DOCUMENT_COLLECTION_ID,
  SvgDocumentStreamMetatype,
} from '../../programmable-units/graph-visualization/directed-graph/svg-adapter/svgDocument';
import { TypeScriptObject } from '../../../package-agnostic-utilities/object/typeScriptObject';
import {
  getCustomTypedDatum,
  CustomDatumTypeName,
} from '../../../package-agnostic-utilities/typed-datum/customTypedDatum';
import { PrerequisiteProps, SkillProps } from './app/props';
import { Skill } from './skill';
import {
  INTERACTABLE_COLLECTION_ID,
  InteractableStreamMetatype,
  Item,
} from './interactable';
import { Prerequisite } from './prerequisite';

const PROGRAMMED_TRANSFORM_NAME = 'decodeAndRecastSvgDocument' as const;
type ProgrammedTransformName = typeof PROGRAMMED_TRANSFORM_NAME;
type ReportingLocator =
  ReportingProgrammedTransformLocator<ProgrammedTransformName>;
const reporterLocator: ReportingLocator = {
  typeName:
    ProgramErrorElementLocatorTypeName.ReportingProgrammedTransformLocator,
  name: PROGRAMMED_TRANSFORM_NAME,
  filePath: __filename,
};

type TreeifiedDatumNode =
  | n.Identifier
  | n.Literal
  | n.ArrayExpression
  | n.ObjectExpression
  | n.NewExpression;

export class IdentifierConfiguration {
  constructor(public readonly name: string) {}
}

export const treeifyDatum = (datum: unknown): TreeifiedDatumNode => {
  const typedDatum = getCustomTypedDatum(datum);

  switch (typedDatum.typeName) {
    case CustomDatumTypeName.RootObjectInstance:
    case CustomDatumTypeName.CustomObjectInstance: {
      if (typedDatum.datum instanceof IdentifierConfiguration) {
        const result = b.identifier(typedDatum.datum.name);
        return result;
      }

      const propertyList = Object.entries(typedDatum.datum).map(
        ([key, value]) => {
          return b.objectProperty(b.identifier(key), treeifyDatum(value));
        },
      );

      const result = b.objectExpression(propertyList);
      return result;
    }
    case CustomDatumTypeName.Array: {
      const elementList = typedDatum.datum.map((value) => treeifyDatum(value));
      const result = b.arrayExpression(elementList);
      return result;
    }
    case CustomDatumTypeName.Map: {
      const entryList = [...typedDatum.datum.entries()].map(([key, value]) => {
        const entry = b.arrayExpression([
          treeifyDatum(key),
          treeifyDatum(value),
        ]);

        return entry;
      });

      const parameter = b.arrayExpression(entryList);
      const result = b.newExpression(b.identifier('Map'), [parameter]);
      return result;
    }
    case CustomDatumTypeName.Set: {
      const valueList = [...typedDatum.datum.values()].map((value) => {
        return treeifyDatum(value);
      });

      const parameter = b.arrayExpression(valueList);
      const result = b.newExpression(b.identifier('Set'), [parameter]);
      return result;
    }
    case CustomDatumTypeName.BigInteger:
    case CustomDatumTypeName.Boolean:
    case CustomDatumTypeName.Null:
    case CustomDatumTypeName.Number:
    case CustomDatumTypeName.String:
      return b.literal(typedDatum.datum);
    case CustomDatumTypeName.Undefined:
      return b.identifier('undefined');
    case CustomDatumTypeName.Function:
    case CustomDatumTypeName.Symbol: {
      throw new Error(`Unsupported datum type "${typedDatum.typeName}"`);
    }
  }
};

/**
 * Converts svg to react
 */
export const decodeAndRecastSvgDocument = buildProgrammedTransform({
  name: PROGRAMMED_TRANSFORM_NAME,
})
  .fromItem2<SvgDocumentStreamMetatype>({
    collectionId: SVG_DOCUMENT_COLLECTION_ID,
  })
  .andFromCollection2<InteractableStreamMetatype>({
    collectionId: INTERACTABLE_COLLECTION_ID,
  })
  .toItemTuple2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
  })
  .toItemTuple2<OutputFileStreamMetatype>({
    collectionId: OUTPUT_FILE_COLLECTION_ID,
  })
  .toItemTuple2<AppRendererDelayerStreamMetatype>({
    collectionId: APP_RENDERER_DELAYER_COLLECTION_ID,
  })
  .onTransform((svgDocument, interactableCollection) => {
    const $ = cheerio.load(svgDocument.document);

    const svgNode = $('svg')[0];

    enum NodeTypeName {
      Element = 'Element',
      Text = 'Text',
      Comment = 'Comment',
      Unknown = 'Unknown',
    }

    // TODO: find a better way to get these types and move them to a utility file
    type ChildNode = typeof svgNode.children[number];
    type TextNode = Extract<ChildNode, { nodeType: 3 }>;
    type CommentNode = Extract<ChildNode, { nodeType: 8 }>;

    const knownTagNameSet = new Set([
      'ellipse',
      'g',
      'path',
      'polygon',
      'svg',
      'text',
      'title',
    ]);

    const componentWrapperByTagName: Record<string, string> = {
      ellipse: 'EllipseWrapper',
      g: 'GroupWrapper',
      path: 'PathWrapper',
      polygon: 'PolygonWrapper',
      svg: 'SvgWrapper',
      text: 'TextWrapper',
    };

    const isElementNode = (
      childNode: ChildNode,
    ): childNode is cheerio.Element => 'tagName' in childNode;

    const isKnownElementNode = (
      childNode: ChildNode,
    ): childNode is cheerio.Element =>
      isElementNode(childNode) && knownTagNameSet.has(childNode.tagName);

    const isTextNode = (childNode: ChildNode): childNode is TextNode =>
      childNode.nodeType === 3;

    const isCommentNode = (childNode: ChildNode): childNode is CommentNode =>
      childNode.nodeType === 8;

    type DecodedElementNode = {
      typeName: NodeTypeName.Element;
      attributeTupleList: [name: string, value: string][];
      node: cheerio.Element;
      path: string;
      isRoot: boolean;
      id: string | null;
      tagName: string;
      hasChildren: boolean;
      childPathList: string[];
    };

    type DecodedTextNode = {
      typeName: NodeTypeName.Text;
      node: TextNode;
      path: string;
      isEmpty: boolean;
      trimmedText: string;
    };

    type DecodedNode = DecodedElementNode | DecodedTextNode;

    type UnknownDecodedNode =
      | {
          isElement: true;
          path: string;
          nodeType?: never;
          tagName: string;
        }
      | {
          isElement: false;
          path: string;
          nodeType: number;
          tagName?: never;
        };

    type PathedNode<TNode extends ChildNode = ChildNode> = {
      path: string;
      node: TNode;
    };

    const getNextPath = (currentPath: string, index: number): string => {
      return `${currentPath}/${index}`;
    };

    const flattenNode = (
      currentPath: string,
      node: ChildNode,
      accumulator: PathedNode[],
    ): void => {
      accumulator.push({
        path: currentPath,
        node,
      });

      if ('childNodes' in node) {
        node.childNodes.forEach((childNode, index) => {
          const childPath = getNextPath(currentPath, index);
          flattenNode(childPath, childNode, accumulator);
        });
      }
    };

    const flattenNodeTree = (node: ChildNode): PathedNode[] => {
      const accumulator: PathedNode[] = [];
      flattenNode('', node, accumulator);
      return accumulator;
    };

    const pathedNodeList: PathedNode[] = flattenNodeTree(svgNode);

    const elementPathedNodeList = pathedNodeList.filter(
      (pathedNode): pathedNode is PathedNode<cheerio.Element> => {
        return isKnownElementNode(pathedNode.node);
      },
    );
    const textPathedNodeList = pathedNodeList.filter(
      (pathedNode): pathedNode is PathedNode<TextNode> => {
        return isTextNode(pathedNode.node);
      },
    );
    const unknownNodeList: UnknownDecodedNode[] = pathedNodeList
      .filter((pathedNode) => {
        return (
          !isKnownElementNode(pathedNode.node) &&
          !isTextNode(pathedNode.node) &&
          !isCommentNode(pathedNode.node)
        );
      })
      .map((pathedNode) => {
        if (isElementNode(pathedNode.node)) {
          return {
            isElement: true,
            path: pathedNode.path,
            tagName: pathedNode.node.tagName,
          };
        }

        return {
          isElement: false,
          path: pathedNode.path,
          nodeType: pathedNode.node.nodeType,
        };
      });

    const decodeElementNode = (
      pathedNode: PathedNode<cheerio.Element>,
    ): DecodedElementNode => {
      const { tagName } = pathedNode.node;

      const isRoot = pathedNode.path === '';
      const id = pathedNode.node.attribs.id ?? null;

      const attributeTupleList: [string, string][] = pathedNode.node.attributes
        .filter((attribute) => {
          // TODO: React has different rules for prefixed attributes
          const hasPrefix = attribute.name.includes(':');

          // TODO: fix this attribute that is throwing an error
          const isIgnored = ['xlink'].includes(attribute.name);

          return !hasPrefix && !isIgnored;
        })
        .map((attribute) => {
          let name: string;
          if (attribute.name === 'class') {
            name = 'className';
          } else {
            name = attribute.name;
          }

          return [Case.camel(name), attribute.value];
        });

      return {
        typeName: NodeTypeName.Element,
        node: pathedNode.node,
        attributeTupleList,
        path: pathedNode.path,
        isRoot,
        id,
        tagName,
        hasChildren: pathedNode.node.childNodes.length > 0,
        childPathList: pathedNode.node.childNodes.map((childNode, index) => {
          return getNextPath(pathedNode.path, index);
        }),
      };
    };

    const decodeTextNode = (
      pathedNode: PathedNode<TextNode>,
    ): DecodedTextNode => {
      return {
        typeName: NodeTypeName.Text,
        path: pathedNode.path,
        node: pathedNode.node,
        isEmpty: pathedNode.node.data.trim() === '',
        trimmedText: pathedNode.node.data.trim(),
      };
    };

    const decodedElementNodeList = elementPathedNodeList.map(decodeElementNode);
    const decodedTextNodeList = textPathedNodeList.map(decodeTextNode);

    const decodedNodeByPath = new Map(
      [...decodedElementNodeList, ...decodedTextNodeList].map((decodedNode) => {
        return [decodedNode.path, decodedNode] as const;
      }),
    );

    const getDecodedNodeFromPath = (path: string): DecodedNode | null => {
      const decodedNode = decodedNodeByPath.get(path);

      return decodedNode ?? null;
    };

    const [decodedSvgNode] = decodedElementNodeList;
    if (decodedSvgNode === undefined || decodedSvgNode.tagName !== 'svg') {
      throw Error('Invalid or missing starting node');
    }

    const interactableBySvgId = new Map(
      interactableCollection.list.map((interactable) => {
        return [interactable.svgId, interactable];
      }),
    );

    const skills = interactableCollection.list
      .map((interactable) => interactable.item)
      .filter((item): item is Skill => item instanceof Skill);

    const getSkillProps = (skill: Skill): Exclude<SkillProps, 'children'> => {
      const upstreamSkills = skills
        .filter((otherSkill) => {
          return skill.prerequisites.includes(otherSkill.id);
        })
        .map((otherSkill) => otherSkill.id);

      const downstreamSkills = skills
        .filter((otherSkill) => {
          return otherSkill.prerequisites.includes(skill.id);
        })
        .map((otherSkill) => otherSkill.id);

      return {
        id: skill.id,
        isUnnecessary: skill.isUnnecessary,
        isRecommended: skill.isRecommended,
        notes: skill.notes,
        title: skill.title,
        upstreamSkills,
        downstreamSkills,
      };
    };

    const getPrerequisiteProps = (
      prerequisite: Prerequisite,
    ): Exclude<PrerequisiteProps, 'children'> => {
      return {
        headId: prerequisite.headId,
        tailId: prerequisite.tailId,
      };
    };

    type WrapperConfiguration = {
      componentName: string;
      props: TypeScriptObject;
    };

    const getWrapperConfiguration = (
      item: Item,
    ): WrapperConfiguration | null => {
      if (item instanceof Skill) {
        return {
          componentName: 'Skill',
          props: getSkillProps(item),
        };
      }

      if (item instanceof Prerequisite) {
        return {
          componentName: 'Prerequisite',
          props: getPrerequisiteProps(item),
        };
      }

      return null;
    };

    const recastItem = (
      id: string,
      childElement: n.JSXElement,
    ): n.JSXElement | n.JSXFragment | null => {
      const parsedId = id.replace(/_edge\d+$/, '');
      const interactable = interactableBySvgId.get(parsedId);

      const wrapperConfiguration =
        interactable !== undefined
          ? getWrapperConfiguration(interactable.item)
          : null;

      if (wrapperConfiguration === null) {
        return b.jsxFragment(b.jsxOpeningFragment(), b.jsxClosingFragment(), [
          childElement,
        ]);
      }

      const { componentName, props } = wrapperConfiguration;

      return b.jsxElement(
        b.jsxOpeningElement(b.jsxIdentifier(componentName), [
          b.jsxSpreadAttribute(treeifyDatum(props)),
        ]),
        b.jsxClosingElement(b.jsxIdentifier(componentName)),
        [childElement],
      );
    };

    const recastElementNode = (
      decodedNode: DecodedElementNode,
    ): n.JSXElement | n.JSXFragment | null => {
      if (decodedNode.tagName === 'title') {
        return null;
      }

      const componentOrElementName =
        componentWrapperByTagName[decodedNode.tagName] ?? decodedNode.tagName;

      type RawAttributeTuple = [string, string | n.JSXExpressionContainer];
      const rawAttributeTupleList: RawAttributeTuple[] =
        decodedNode.attributeTupleList.slice();

      if (decodedNode.tagName === 'svg') {
        rawAttributeTupleList.push(
          ['ref', b.jsxExpressionContainer(b.identifier('ref'))],
          ['width', '100%'],
          ['height', '100%'],
        );
      }

      const deduplicatedAttributeTupleList = [
        ...new Map(rawAttributeTupleList).entries(),
      ];

      const attributeList = deduplicatedAttributeTupleList.map(
        ([name, value]) => {
          const valueNode =
            typeof value === 'string' ? b.literal(value) : value;
          return b.jsxAttribute(b.jsxIdentifier(name), valueNode);
        },
      );

      const childJsxList = decodedNode.childPathList
        .map(getDecodedNodeFromPath)
        .filter(isNotNull)
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        .map(recastNode)
        .filter(isNotNull);

      const element = b.jsxElement(
        b.jsxOpeningElement(
          b.jsxIdentifier(componentOrElementName),
          attributeList,
        ),
        b.jsxClosingElement(b.jsxIdentifier(componentOrElementName)),
        childJsxList,
      );

      const parentElement =
        decodedNode.id !== null
          ? recastItem(decodedNode.id, element) ?? element
          : element;

      return parentElement;
    };

    const recastTextNode = (
      decodedNode: DecodedTextNode,
    ): n.JSXExpressionContainer | null => {
      if (decodedNode.isEmpty) {
        return null;
      }

      const textExpression = b.jsxExpressionContainer(
        b.literal(decodedNode.trimmedText),
      );

      return textExpression;
    };

    const recastNode = (
      decodedNode: DecodedNode,
    ): n.JSXElement | n.JSXFragment | n.JSXExpressionContainer | null => {
      switch (decodedNode.typeName) {
        case NodeTypeName.Element:
          return recastElementNode(decodedNode);
        case NodeTypeName.Text:
          return recastTextNode(decodedNode);
      }
    };

    const jsxNode = recastNode(decodedSvgNode);

    if (jsxNode === null) {
      return {
        [PROGRAM_ERROR_COLLECTION_ID]: [
          {
            name: 'svg-node-decode-error',
            error: new Error(`Unable to decode svg`),
            reporterLocator,
            sourceLocator: {
              typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
              filePath: '',
            },
            context: {
              decodedSvgNode,
              jsxNode,
            },
          },
        ],
        [OUTPUT_FILE_COLLECTION_ID]: [],
        [APP_RENDERER_DELAYER_COLLECTION_ID]: [],
      };
    }

    const filePath = `packages/mdd-engine/src/adapted-programs/programs/render-rocket-league-knowledge-graph/app/generated/graph.tsx`;
    const programCode = [
      'import React, { forwardRef } from "react"',
      'import { SvgWrapperComponent } from "../dynamicComponentTypes"',
      'import { EllipseWrapper } from "../wrappers/ellipseWrapper"',
      'import { GroupWrapper } from "../wrappers/groupWrapper"',
      'import { PathWrapper } from "../wrappers/pathWrapper"',
      'import { PolygonWrapper } from "../wrappers/polygonWrapper"',
      'import { SvgWrapper } from "../wrappers/svgWrapper"',
      'import { TextWrapper } from "../wrappers/textWrapper"',
      'import { Skill } from "../providers/skill"',
      'import { Prerequisite } from "../providers/prerequisite"',
      '',
      `export const RootGraph: SvgWrapperComponent = forwardRef<SVGSVGElement>((props, ref) => { return  (${
        recast.print(jsxNode).code
      })})`,
    ].join('\n');

    const outputFile: OutputFile = {
      filePath,
      text: programCode,
    };

    return {
      [PROGRAM_ERROR_COLLECTION_ID]: unknownNodeList.map((unknownNode) => {
        const error = unknownNode.isElement
          ? new Error(
              `Unhandled element with tagname "${unknownNode.tagName}" for node path: ${unknownNode.path}`,
            )
          : new Error(
              `HTML node type "${unknownNode.nodeType}" is not handled for node path:${unknownNode.path}`,
            );

        return {
          name: 'unknown-svg-document-node',
          error,
          reporterLocator,
          sourceLocator: {
            typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
            filePath: '',
          },
          context: null,
        };
      }),
      [OUTPUT_FILE_COLLECTION_ID]: [outputFile],
      [APP_RENDERER_DELAYER_COLLECTION_ID]: [
        new AppRendererDelayerInstance({
          programmedTransformName: 'decodeAndRecastSvgDocument',
        }),
      ],
    };
  })
  .assemble();
