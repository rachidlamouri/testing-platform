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
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .toHubblepupTuple2<OutputFileVoque>({
    gepp: OUTPUT_FILE_GEPP,
  })
  .onPinbe((svgDocument) => {
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

    const isElementNode = (
      childNode: ChildNode,
    ): childNode is cheerio.Element => 'tagName' in childNode;

    const isTextNode = (childNode: ChildNode): childNode is TextNode =>
      childNode.nodeType === 3;

    const isCommentNode = (childNode: ChildNode): childNode is CommentNode =>
      childNode.nodeType === 8;

    type DecodedElementNode = {
      typeName: NodeTypeName.Element;
      node: cheerio.Element;
      pathPrefix: string;
      path: string;
      isRoot: boolean;
      id: string | null;
      tagName: string;
      hasChildren: boolean;
      childPathPrefixList: string[];
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      children: DecodedNode[];
    };

    type DecodedTextNode = {
      typeName: NodeTypeName.Text;
      node: TextNode;
      pathPrefix: string;
      isEmpty: boolean;
      trimmedText: string;
    };

    type DecodedNode = DecodedElementNode | DecodedTextNode;

    type UnknownDecodedNode = {
      pathPrefix: string;
      nodeType: number;
    };

    const unknownNodeInfoList: UnknownDecodedNode[] = [];

    const decodeNode = (
      pathPrefix: string,
      node: ChildNode,
    ): DecodedNode | null => {
      if (isElementNode(node)) {
        const { tagName } = node;
        const currentPath = `${pathPrefix}/${tagName}`;

        const isRoot = pathPrefix === '';
        const id = node.attribs.id ?? null;

        const pathedChildNodeList = node.childNodes.map(
          (subchildNode, index) => {
            const nextPathPrefix = `${currentPath}/${index}`;
            return {
              nextPathPrefix,
              subchildNode,
            };
          },
        );

        return {
          typeName: NodeTypeName.Element,
          node,
          pathPrefix,
          path: currentPath,
          isRoot,
          id,
          tagName,
          hasChildren: node.childNodes.length > 0,
          childPathPrefixList: pathedChildNodeList.map(
            ({ nextPathPrefix }) => nextPathPrefix,
          ),
          children: pathedChildNodeList
            .map(({ nextPathPrefix, subchildNode }) => {
              return decodeNode(nextPathPrefix, subchildNode);
            })
            .filter(isNotNull),
        };
      }

      if (isTextNode(node)) {
        return {
          typeName: NodeTypeName.Text,
          node,
          pathPrefix,
          isEmpty: node.data.trim() === '',
          trimmedText: node.data.trim(),
        };
      }

      if (isCommentNode(node)) {
        return null;
      }

      unknownNodeInfoList.push({
        pathPrefix,
        nodeType: node.nodeType,
      });

      return null;
    };

    const decodedSvgNode = decodeNode('', svgNode);

    const recastNode = (
      node: DecodedNode,
    ): n.JSXElement | n.JSXExpressionContainer | null => {
      if (node.typeName === NodeTypeName.Element) {
        if (node.tagName === 'title') {
          return null;
        }

        const elementName = node.tagName;

        const attributeList = node.node.attributes
          .map((attribute) => {
            let name: string;
            if (attribute.name === 'class') {
              name = 'className';
            } else if (attribute.name === 'xlink') {
              return null;
            } else {
              name = attribute.name;
            }

            return [_.camelCase(name), attribute.value];
          })
          .filter(isNotNull)
          .map(([name, value]) => {
            return b.jsxAttribute(b.jsxIdentifier(name), b.literal(value));
          });

        if (node.tagName === 'svg') {
          const refAttribute = b.jsxAttribute(
            b.jsxIdentifier('ref'),
            b.jsxExpressionContainer(b.identifier('ref')),
          );
          attributeList.push(refAttribute);
        }

        const element = b.jsxElement(
          b.jsxOpeningElement(b.jsxIdentifier(elementName), attributeList),
          b.jsxClosingElement(b.jsxIdentifier(elementName)),
          node.children
            .map((childNode) => recastNode(childNode))
            .filter(isNotNull),
        );

        return element;
      }

      if (node.typeName === NodeTypeName.Text && node.isEmpty) {
        return null;
      }

      const textExpression = b.jsxExpressionContainer(
        b.literal(node.trimmedText),
      );
      return textExpression;
    };

    const jsxNode = decodedSvgNode !== null ? recastNode(decodedSvgNode) : null;

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
      'import { GeneratedComponent } from "../generatedTypes"',
      // 'import { File } from "./providers/file"',
      `export const Main: GeneratedComponent = forwardRef<SVGSVGElement>((props, ref) => { return  (${
        recast.print(jsxNode).code
      })})`,
    ].join('\n');

    const outputFile: OutputFile = {
      filePath,
      text: programCode,
    };

    return {
      [PROGRAM_ERROR_GEPP]: unknownNodeInfoList.map(
        ({ pathPrefix, nodeType }) => {
          return {
            name: 'unknown-svg-document-node',
            error: new Error(
              `HTML node type "${nodeType}" is not handled for node path: ${svgDocument.zorn}${pathPrefix}`,
            ),
            reporterLocator,
            sourceLocator: {
              typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
              filePath: '',
            },
            context: null,
          };
        },
      ),
      [OUTPUT_FILE_GEPP]: [outputFile],
    };
  })
  .assemble();
