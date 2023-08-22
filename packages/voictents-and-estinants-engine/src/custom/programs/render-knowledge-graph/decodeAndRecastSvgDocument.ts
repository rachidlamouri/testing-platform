import * as cheerio from 'cheerio';
import { builders as b, namedTypes as n } from 'ast-types';
import * as recast from 'recast';
import _ from 'lodash';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  SVG_DOCUMENT_GEPP,
  SvgDocumentVoque,
} from '../../programmable-units/graph-visualization/svgDocument';
import { isNotNull } from '../../../utilities/isNotNull';
import {
  GenericProgramErrorVoque,
  PROGRAM_ERROR_GEPP,
  ProgramErrorElementLocatorTypeName,
  ReportingEstinantLocator,
} from '../../programmable-units/error/programError';
import {
  OUTPUT_FILE_GEPP,
  OutputFile,
  OutputFileVoque,
} from '../../programmable-units/output-file/outputFile';
import { FILE_FACT_GEPP, FileFact, FileFactVoque } from './file/fileFact';
import {
  INVERTED_DEPENDENCY_GROUP_GEPP,
  InvertedDependencyGroupVoque,
} from './dependency/invertedDependencyGroup';
import { DependencyPathSegmentFact } from './dependency/dependencyPathSegmentFact';

const ESTINANT_NAME = 'decodeAndRecastSvgDocument' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingEstinantLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName: ProgramErrorElementLocatorTypeName.ReportingEstinantLocator,
  name: ESTINANT_NAME,
  filePath: __filename,
};

/**
 * Parses an svg document into an HTML AST and then recasts it to a JSX AST and
 * finally JSX code
 */
export const decodeAndRecastSvgDocument = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromHubblepup2<SvgDocumentVoque>({
    gepp: SVG_DOCUMENT_GEPP,
  })
  .andFromVoictent2<FileFactVoque>({
    gepp: FILE_FACT_GEPP,
  })
  .andFromVoictent2<InvertedDependencyGroupVoque>({
    gepp: INVERTED_DEPENDENCY_GROUP_GEPP,
  })
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .toHubblepupTuple2<OutputFileVoque>({
    gepp: OUTPUT_FILE_GEPP,
  })
  .onPinbe(
    (
      svgDocument,
      fileFactList,
      invertedDependencyGroupList,
      // TODO add more inputs
    ) => {
      const fileFactByNodeId = new Map(
        fileFactList.map((fileFact) => {
          return [fileFact.nodeId, fileFact] as const;
        }),
      );

      const dependencyPathSegmentFactById = new Map(
        invertedDependencyGroupList
          .flatMap((group) => {
            return group.pathFactLists.pathSegmentList;
          })
          .map((segment) => {
            return [`${segment.tailId}:${segment.headId}`, segment];
          }),
      );

      const $ = cheerio.load(svgDocument.grition);

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

        const attributeTupleList: [string, string][] =
          pathedNode.node.attributes
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

              return [_.camelCase(name), attribute.value];
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

      const decodedElementNodeList =
        elementPathedNodeList.map(decodeElementNode);
      const decodedTextNodeList = textPathedNodeList.map(decodeTextNode);

      const decodedNodeByPath = new Map(
        [...decodedElementNodeList, ...decodedTextNodeList].map(
          (decodedNode) => {
            return [decodedNode.path, decodedNode] as const;
          },
        ),
      );

      const getDecodedNodeFromPath = (path: string): DecodedNode | null => {
        const decodedNode = decodedNodeByPath.get(path);

        return decodedNode ?? null;
      };

      const [decodedSvgNode] = decodedElementNodeList;
      if (decodedSvgNode === undefined || decodedSvgNode.tagName !== 'svg') {
        throw Error('Invalid or missing starting node');
      }

      const recastFileFact = (
        fileFact: FileFact,
        childElement: n.JSXElement,
      ): n.JSXElement => {
        const element = b.jsxElement(
          b.jsxOpeningElement(b.jsxIdentifier('FileFact'), [
            b.jsxAttribute(
              b.jsxIdentifier('factId'),
              b.literal(fileFact.nodeId),
            ),
            b.jsxAttribute(
              b.jsxIdentifier('fileName'),
              b.literal(fileFact.file.onDiskFileName.camelCase),
            ),
          ]),
          b.jsxClosingElement(b.jsxIdentifier('FileFact')),
          [childElement],
        );

        return element;
      };

      const recastDependencyPathSegmentFact = (
        id: string,
        fact: DependencyPathSegmentFact,
        childElement: n.JSXElement,
      ): n.JSXElement => {
        const element = b.jsxElement(
          b.jsxOpeningElement(b.jsxIdentifier('DependencyPathSegmentFact'), [
            b.jsxAttribute(b.jsxIdentifier('factId'), b.literal(id)),
            b.jsxAttribute(b.jsxIdentifier('headId'), b.literal(fact.headId)),
            b.jsxAttribute(b.jsxIdentifier('tailId'), b.literal(fact.tailId)),
            b.jsxAttribute(
              b.jsxIdentifier('pathHeadId'),
              b.literal(fact.pathHeadId),
            ),
            b.jsxAttribute(
              b.jsxIdentifier('pathTailIdSet'),
              b.jsxExpressionContainer(
                b.newExpression(b.identifier('Set'), [
                  b.arrayExpression(
                    fact.pathTailIdSet.map((tailId) => b.literal(tailId)),
                  ),
                ]),
              ),
            ),
          ]),
          b.jsxClosingElement(b.jsxIdentifier('DependencyPathSegmentFact')),
          [childElement],
        );

        return element;
      };

      const recastFact = (
        id: string,
        childElement: n.JSXElement,
      ): n.JSXElement | null => {
        const fileFact = fileFactByNodeId.get(id);
        const dependencyPathSegmentFact = dependencyPathSegmentFactById.get(id);

        if (fileFact !== undefined) {
          return recastFileFact(fileFact, childElement);
        }

        if (dependencyPathSegmentFact !== undefined) {
          return recastDependencyPathSegmentFact(
            id,
            dependencyPathSegmentFact,
            childElement,
          );
        }

        // TODO: throw an error here once all fact types are handled
        return null;
      };

      const recastElementNode = (
        decodedNode: DecodedElementNode,
      ): n.JSXElement | null => {
        if (decodedNode.tagName === 'title') {
          return null;
        }

        const componentOrElementName =
          componentWrapperByTagName[decodedNode.tagName] ?? decodedNode.tagName;

        const attributeList = decodedNode.attributeTupleList.map(
          ([name, value]) => {
            return b.jsxAttribute(b.jsxIdentifier(name), b.literal(value));
          },
        );

        if (decodedNode.tagName === 'svg') {
          const refAttribute = b.jsxAttribute(
            b.jsxIdentifier('ref'),
            b.jsxExpressionContainer(b.identifier('ref')),
          );

          const widthAttribute = b.jsxAttribute(
            b.jsxIdentifier('width'),
            b.literal('100%'),
          );

          const heightAttribute = b.jsxAttribute(
            b.jsxIdentifier('height'),
            b.literal('100%'),
          );

          attributeList.push(refAttribute, widthAttribute, heightAttribute);
        }

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
            ? recastFact(decodedNode.id, element) ?? element
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
      ): n.JSXElement | n.JSXExpressionContainer | null => {
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
          [PROGRAM_ERROR_GEPP]: [
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
          [OUTPUT_FILE_GEPP]: [],
        };
      }

      const filePath = `packages/voictents-and-estinants-engine/src/custom/programs/render-knowledge-graph/app/browser/generated/${svgDocument.zorn}.tsx`;
      const programCode = [
        'import React, { forwardRef } from "react"',
        'import { SvgWrapperComponent } from "../dynamicComponentTypes"',
        'import { EllipseWrapper } from "../wrappers/ellipseWrapper"',
        'import { GroupWrapper } from "../wrappers/groupWrapper"',
        'import { PathWrapper } from "../wrappers/pathWrapper"',
        'import { PolygonWrapper } from "../wrappers/polygonWrapper"',
        'import { SvgWrapper } from "../wrappers/svgWrapper"',
        'import { TextWrapper } from "../wrappers/textWrapper"',
        'import { FileFact } from "../providers/fileFact"',
        'import { DependencyPathSegmentFact } from "../providers/dependencyPathSegmentFact"',
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
        [PROGRAM_ERROR_GEPP]: unknownNodeList.map((unknownNode) => {
          const error = unknownNode.isElement
            ? new Error(
                `Unhandled element with tagname "${unknownNode.tagName}" for node path: ${svgDocument.zorn}${unknownNode.path}`,
              )
            : new Error(
                `HTML node type "${unknownNode.nodeType}" is not handled for node path: ${svgDocument.zorn}${unknownNode.path}`,
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
        [OUTPUT_FILE_GEPP]: [outputFile],
      };
    },
  )
  .assemble();
