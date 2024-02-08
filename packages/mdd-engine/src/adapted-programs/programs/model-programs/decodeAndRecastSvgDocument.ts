import * as cheerio from 'cheerio';
import { builders as b, namedTypes as n } from 'ast-types';
import * as recast from 'recast';
import Case from 'case';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { assertNotUndefined } from '../../../package-agnostic-utilities/nil/assertNotUndefined';
import { isNotNull } from '../../../package-agnostic-utilities/nil/isNotNull';
import {
  GenericProgramErrorStreamMetatype,
  PROGRAM_ERROR_COLLECTION_ID,
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
  PROGRAM_MODEL_COLLECTION_ID,
  ProgramModelStreamMetatype,
} from '../../programmable-units/engine-program-model/program/programModel';
import { LocatableError } from '../../programmable-units/error/locatableError';
import { ProgrammedTransformSourceInstance } from '../../programmable-units/linting/source/programmedTransformSource';
import {
  SVG_DOCUMENT_COLLECTION_ID,
  SvgDocumentStreamMetatype,
} from '../../programmable-units/graph-visualization/directed-graph/svg-adapter/svgDocument';

const PROGRAMMED_TRANSFORM_NAME = 'decodeAndRecastSvgDocument' as const;
const programmedTransformSource = new ProgrammedTransformSourceInstance({
  programmedTransformName: PROGRAMMED_TRANSFORM_NAME,
  filePath: __filename,
});

/**
 * Parses an svg document into an HTML AST and then recasts it to a JSX AST and
 * finally JSX code
 */
export const decodeAndRecastSvgDocument = buildProgrammedTransform({
  name: PROGRAMMED_TRANSFORM_NAME,
})
  .fromItem2<SvgDocumentStreamMetatype>({
    collectionId: SVG_DOCUMENT_COLLECTION_ID,
  })
  .andFromCollection2<ProgramModelStreamMetatype>({
    collectionId: PROGRAM_MODEL_COLLECTION_ID,
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
  .onTransform((svgDocument, programModelCollection) => {
    // TODO: centralize this indexing
    const programModelByRootGraphId = new Map(
      programModelCollection.list.map((programModel) => {
        return [programModel.skeleton.graphLocator.localIdDigest, programModel];
      }),
    );

    const programModel = programModelByRootGraphId.get(
      svgDocument.id.forMachine,
    );
    assertNotUndefined(programModel);

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

      return element;
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
          new LocatableError({
            message: 'Unable to decode svg',
            errorSource:
              programModel.skeleton.programLocator.programFile.source,
            reporterSource: programmedTransformSource,
            context: {
              decodedSvgNode,
              jsxNode,
            },
          }),
        ],
        [OUTPUT_FILE_COLLECTION_ID]: [],
        [APP_RENDERER_DELAYER_COLLECTION_ID]: [],
      };
    }

    const fileName = programModel.skeleton.programLocator.programName;
    const filePath = `packages/mdd-engine/src/adapted-programs/programs/model-programs/app/generated/${fileName}.tsx`;
    const programCode = [
      'import React, { forwardRef } from "react"',
      'import { SvgWrapperComponent } from "../dynamicComponentTypes"',
      'import { EllipseWrapper } from "../../../render-knowledge-graph/app/browser/wrappers/ellipseWrapper"',
      'import { GroupWrapper } from "../../../render-knowledge-graph/app/browser/wrappers/groupWrapper"',
      'import { PathWrapper } from "../../../render-knowledge-graph/app/browser/wrappers/pathWrapper"',
      'import { PolygonWrapper } from "../../../render-knowledge-graph/app/browser/wrappers/polygonWrapper"',
      'import { SvgWrapper } from "../../../render-knowledge-graph/app/browser/wrappers/svgWrapper"',
      'import { TextWrapper } from "../../../render-knowledge-graph/app/browser/wrappers/textWrapper"',
      '',
      `export const Main: SvgWrapperComponent = forwardRef<SVGSVGElement>((props, ref) => { return  (${
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
              `Unhandled element with tagname "${unknownNode.tagName}" for node path: ${svgDocument.id.forHuman}${unknownNode.path}`,
            )
          : new Error(
              `HTML node type "${unknownNode.nodeType}" is not handled for node path: ${svgDocument.id.forHuman}${unknownNode.path}`,
            );

        return error;
      }),
      [OUTPUT_FILE_COLLECTION_ID]: [outputFile],
      [APP_RENDERER_DELAYER_COLLECTION_ID]: [
        new AppRendererDelayerInstance({
          programmedTransformName: 'decodeAndRecastSvgDocument',
          distinguisher: svgDocument.id.forHuman,
        }),
      ],
    };
  })
  .assemble();
