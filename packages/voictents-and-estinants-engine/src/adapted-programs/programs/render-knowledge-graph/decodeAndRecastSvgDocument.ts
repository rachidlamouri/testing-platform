import * as cheerio from 'cheerio';
import { builders as b, namedTypes as n } from 'ast-types';
import * as recast from 'recast';
import Case from 'case';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  SVG_DOCUMENT_GEPP,
  SvgDocumentVoque,
} from '../../programmable-units/graph-visualization/svgDocument';
import { isNotNull } from '../../../package-agnostic-utilities/nil/isNotNull';
import {
  GenericProgramErrorStreamMetatype,
  PROGRAM_ERROR_COLLECTION_ID,
  ProgramErrorElementLocatorTypeName,
  ReportingProgrammedTransformLocator,
} from '../../programmable-units/error/programError';
import {
  OUTPUT_FILE_GEPP,
  OutputFile,
  OutputFileVoque,
} from '../../programmable-units/output-file/outputFile';
import {
  APP_RENDERER_DELAYER_GEPP,
  AppRendererDelayerInstance,
  AppRendererDelayerVoque,
} from './appRendererDelayer';
import {
  CustomDatumTypeName,
  getCustomTypedDatum,
} from '../../../package-agnostic-utilities/typed-datum/customTypedDatum';
import { FACT_COLLECTION_ID, Fact, FactStreamMetatype } from './fact/fact';
import { assertNotUndefined } from '../../../package-agnostic-utilities/nil/assertNotUndefined';
import { FactTypeName } from './fact/factTypeName';
import {
  DirectoryFactProps,
  FileDependencyPathNodeFactProps,
  FileDependencyPathSegmentFactProps,
  FileFactProps,
} from './app/browser/factProps';
import { FileFact2 } from './file/fileFact2';
import { TypeScriptObject } from '../../../package-agnostic-utilities/object/typeScriptObject';
import { FileDependencyPathSegmentFact } from './dependency/dependency-path/fileDependencyPathSegmentFact';
import { DirectoryFact2 } from './directory/directoryFact2';
import { FileDependencyPathNodeFact } from './dependency/dependency-path/fileDependencyPathNodeFact';

const ESTINANT_NAME = 'decodeAndRecastSvgDocument' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingProgrammedTransformLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName:
    ProgramErrorElementLocatorTypeName.ReportingProgrammedTransformLocator,
  name: ESTINANT_NAME,
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
 * Parses an svg document into an HTML AST and then recasts it to a JSX AST and
 * finally JSX code
 */
export const decodeAndRecastSvgDocument = buildProgrammedTransform({
  name: ESTINANT_NAME,
})
  .fromItem2<SvgDocumentVoque>({
    collectionId: SVG_DOCUMENT_GEPP,
  })
  .andFromCollection2<FactStreamMetatype>({
    collectionId: FACT_COLLECTION_ID,
  })
  .toItemTuple2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
  })
  .toItemTuple2<OutputFileVoque>({
    collectionId: OUTPUT_FILE_GEPP,
  })
  .toItemTuple2<AppRendererDelayerVoque>({
    collectionId: APP_RENDERER_DELAYER_GEPP,
  })
  .onTransform((svgDocument, factVoictent) => {
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

    const getDirectoryFactProps = (
      fact: DirectoryFact2,
    ): Exclude<DirectoryFactProps, 'children'> => {
      return {
        factId: fact.graphElement.oldId,
        directoryPath: fact.directory.directory.directoryPath.serialized,
        boundaryId: fact.directory.boundary.id.forMachine,
        isBoundaryDirectory: fact.directory.isBoundaryDirectory,
      };
    };

    const getFileFactProps = (
      fact: FileFact2,
    ): Exclude<FileFactProps, 'children'> => {
      return {
        factId: fact.graphElement.oldId,
        boundaryId: fact.boundedFile.boundary.id.forMachine,
        fileName: fact.boundedFile.file.nodePath.name.serialized,
        importedNodeIdSet: fact.importedNodeIdSet,
        importingNodeIdSet: fact.importingNodeIdSet,
      };
    };

    const getFileDependencyPathSegmentFactProps = (
      fact: FileDependencyPathSegmentFact,
    ): Exclude<FileDependencyPathSegmentFactProps, 'children'> => {
      return {
        factId: fact.graphElement.oldId,
        pathHeadId: fact.pathHeadId,
        pathTailIdSet: fact.pathTailIdSet,
      };
    };

    const getFileDependencyPathNodeFactProps = (
      fact: FileDependencyPathNodeFact,
    ): Exclude<FileDependencyPathNodeFactProps, 'children'> => {
      return {
        factId: fact.graphElement.oldId,
        pathHeadId: fact.pathNode.pathHeadId,
        pathTailIdSet: fact.pathNode.pathTailIdSet,
      };
    };

    type WrapperConfiguration = {
      componentName: string;
      props: TypeScriptObject;
    };

    const getWrapperConfiguration = (
      fact: Fact,
    ): WrapperConfiguration | null => {
      switch (fact.typeName) {
        case FactTypeName.PartitionFact:
          return null;
        case FactTypeName.DirectoryFact2:
          return {
            componentName: 'DirectoryFact',
            props: getDirectoryFactProps(fact),
          };
        case FactTypeName.FileDependencyPathNodeFact:
          return {
            componentName: 'FileDependencyPathNodeFact',
            props: getFileDependencyPathNodeFactProps(fact),
          };
        case FactTypeName.FileFact2:
          return {
            componentName: 'FileFact',
            props: getFileFactProps(fact),
          };
        case FactTypeName.FileDependencyPathSegmentFact:
          return {
            componentName: 'DependencyPathSegmentFact',
            props: getFileDependencyPathSegmentFactProps(fact),
          };
      }
    };

    const recastFact = (
      id: string,
      childElement: n.JSXElement,
    ): n.JSXElement | n.JSXFragment | null => {
      const fact = factVoictent.byLocalGraphElementId.get(id);
      assertNotUndefined(fact);

      const wrapperConfiguration = getWrapperConfiguration(fact);

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
        [OUTPUT_FILE_GEPP]: [],
        [APP_RENDERER_DELAYER_GEPP]: [],
      };
    }

    // TODO: remove the need for this `graph:` logic by adding more metadata to svgDocument
    const fileName = svgDocument.id.replace(/^graph:/, '');
    const filePath = `packages/voictents-and-estinants-engine/src/adapted-programs/programs/render-knowledge-graph/app/browser/generated/${fileName}.tsx`;
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
      'import { DirectoryFact } from "../providers/directoryFact"',
      'import { DependencyPathSegmentFact } from "../providers/dependencyPathSegmentFact"',
      'import { FileDependencyPathNodeFact } from "../providers/fileDependencyPathNodeFact"',
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
              `Unhandled element with tagname "${unknownNode.tagName}" for node path: ${svgDocument.id}${unknownNode.path}`,
            )
          : new Error(
              `HTML node type "${unknownNode.nodeType}" is not handled for node path: ${svgDocument.id}${unknownNode.path}`,
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
      [APP_RENDERER_DELAYER_GEPP]: [
        new AppRendererDelayerInstance({
          estinantName: 'decodeAndRecastSvgDocument',
          distinguisher: svgDocument.id,
        }),
      ],
    };
  })
  .assemble();
