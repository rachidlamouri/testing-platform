import * as cheerio from 'cheerio';
import { ElementType } from 'react';
import { builders as b, namedTypes as n } from 'ast-types';
import * as recast from 'recast';
import fs from 'fs';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  DECODED_SVG_DOCUMENT_GEPP,
  DecodedSvgDocumentVoque,
  DecodedSvgNode,
} from './decodedSvgDocument';
import { SVG_DOCUMENT_GEPP, SvgDocumentVoque } from './svgDocument';
import { isNotNull } from '../../../utilities/isNotNull';
import {
  GenericProgramErrorVoque,
  PROGRAM_ERROR_GEPP,
  ProgramErrorElementLocatorTypeName,
  ReportingEstinantLocator,
} from '../error/programError';

const ESTINANT_NAME = 'decodeSvgDocument' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingEstinantLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName: ProgramErrorElementLocatorTypeName.ReportingEstinantLocator,
  name: ESTINANT_NAME,
  filePath: __filename,
};

export const decodeSvgDocument = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromHubblepup2<SvgDocumentVoque>({
    gepp: SVG_DOCUMENT_GEPP,
  })
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .toHubblepupTuple2<DecodedSvgDocumentVoque>({
    gepp: DECODED_SVG_DOCUMENT_GEPP,
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

    // TODO: find a better way to get these types
    type ChildNode = typeof svgNode.children[number];
    type TextNode = Extract<ChildNode, { nodeType: 3 }>;
    type CommentNode = Extract<ChildNode, { nodeType: 8 }>;

    const isElementNode = (
      childNode: ChildNode,
    ): childNode is cheerio.Element => 'tagName' in childNode;

    const isTextNode = (childNode: ChildNode): childNode is TextNode =>
      childNode.nodeType === 3;

    // const isEmptyTextNode = (childNode: ChildNode): childNode is TextNode =>
    //   isTextNode(childNode) && childNode.data.trim() === '';

    const isCommentNode = (childNode: ChildNode): childNode is CommentNode =>
      childNode.nodeType === 8;

    type ElementTypedNode = {
      typeName: NodeTypeName.Element;
      node: cheerio.Element;
      hasChildren: boolean;
    };

    type TextTypedNode = {
      typeName: NodeTypeName.Text;
      node: TextNode;
      isEmpty: boolean;
      trimmedText: string;
    };

    type CommentTypedNode = {
      typeName: NodeTypeName.Comment;
      node: CommentNode;
    };

    type TypedUnknownTypedNode = {
      typeName: NodeTypeName.Unknown;
      node: ChildNode;
    };

    type TypedNode =
      | ElementTypedNode
      | TextTypedNode
      | CommentTypedNode
      | TypedUnknownTypedNode;

    // type KnownTypedNode = Exclude<TypedNode, TypedUnknownTypedNode>;

    // const isElementTypedNode = (
    //   typedNode: TypedNode,
    // ): typedNode is ElementTypedNode =>
    //   typedNode.typeName === NodeTypeName.Element;

    const classifyChildNode = (childNode: ChildNode): TypedNode => {
      if (isElementNode(childNode)) {
        return {
          typeName: NodeTypeName.Element,
          node: childNode,
          hasChildren: childNode.childNodes.length > 0,
        };
      }

      if (isTextNode(childNode)) {
        const trimmedText = childNode.data.trim();
        return {
          typeName: NodeTypeName.Text,
          node: childNode,
          isEmpty: trimmedText === '',
          trimmedText,
        };
      }

      if (isCommentNode(childNode)) {
        return {
          typeName: NodeTypeName.Comment,
          node: childNode,
        };
      }

      return {
        typeName: NodeTypeName.Unknown,
        node: childNode,
      };
    };

    // const isKnownTypedNode = (
    //   typedNode: TypedNode,
    // ): typedNode is KnownTypedNode =>
    //   typedNode.typeName !== NodeTypeName.Unknown;

    // const isKnownTypedNodeList = (
    //   list: TypedNode[],
    // ): list is KnownTypedNode[] => list.every(isKnownTypedNode);

    // const list1 = svgNode.childNodes.map(classifyChildNode);

    // if (!isKnownTypedNodeList(list1)) {
    //   return {
    //     [PROGRAM_ERROR_GEPP]: [
    //       {
    //         name: 'invalid-root-child-list',
    //         error: new Error(
    //           'The top level svg has one or more children that are unknown',
    //         ),
    //         reporterLocator,
    //         sourceLocator: {
    //           typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
    //           filePath: '',
    //         },
    //         context: {
    //           nodeTypeNameList: list1.map((typedNode) => typedNode.typeName),
    //         },
    //       },
    //     ],
    //     [DECODED_SVG_DOCUMENT_GEPP]: [],
    //   };
    // }

    // const list2 = list1.filter(isElementTypedNode).map(({ node }, index) => {
    //   const sublist = node.childNodes.map(classifyChildNode);
    //   return {
    //     sublist,
    //     index,
    //   };
    // });

    // const problemList1 = list2.filter(
    //   ({ sublist }) =>
    //     !isKnownTypedNodeList(sublist) ||
    //     sublist.some(
    //       (typedNode) =>
    //         typedNode.typeName === NodeTypeName.Element &&
    //         typedNode.hasChildren,
    //     ),
    // );

    // if (problemList1.length > 0) {
    //   return {
    //     [PROGRAM_ERROR_GEPP]: problemList1.map(({ sublist, index }) => {
    //       return {
    //         name: 'invalid-subnode-child-list',
    //         error: new Error(
    //           `A subnode has unknown children: ${svgDocument.zorn}/svg/${index}/g`,
    //         ),
    //         reporterLocator,
    //         sourceLocator: {
    //           typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
    //           filePath: '',
    //         },
    //         context: {
    //           sublist: sublist.map((typedNode) => {
    //             if (
    //               typedNode.typeName === NodeTypeName.Element &&
    //               typedNode.hasChildren
    //             ) {
    //               return {
    //                 e: typedNode.node.tagName,
    //                 c: [typedNode.node.childNodes.map((c) => c?.tagName)],
    //               };
    //             }

    //             if (isKnownTypedNode(typedNode)) {
    //               return typedNode.typeName;
    //             }

    //             return {
    //               nodeType: typedNode.node.nodeType,
    //             };
    //           }),
    //         },
    //       };
    //     }),
    //     [DECODED_SVG_DOCUMENT_GEPP]: [],
    //   };
    // }

    // const accumulator: any[] = [];
    // const errorAccumulator: any[] = [];
    // const idk = (
    //   previousPath: string,
    //   parentId: string | null,
    //   node: ChildNode,
    // ): void => {
    //   const typedNode = classifyChildNode(node);

    //   if (typedNode.typeName === NodeTypeName.Unknown) {
    //     errorAccumulator.push({
    //       currentPath: previousPath,
    //       nodeType: node.type,
    //     });
    //     return;
    //   }

    //   if (typedNode.typeName === NodeTypeName.Element) {
    //     const { id } = typedNode.node.attribs;
    //     const { tagName } = typedNode.node;
    //     if (tagName !== 'svg' && id === undefined) {
    //       return;
    //     }

    //     const currentPath = `${previousPath}${typedNode.node.tagName}`;

    //     accumulator.push({
    //       isRoot: previousPath === '',
    //       tagName,
    //       id,
    //       children: typedNode.node.childNodes
    //         .map((subnode) => {
    //           return classifyChildNode(subnode);
    //         })
    //         .filter(isKnownTypedNode)
    //         .map((typedSubnode) => {
    //           if (
    //             typedSubnode.typeName === NodeTypeName.Element &&
    //             typedSubnode.node.attribs.id !== undefined
    //           ) {
    //             return { id: typedSubnode.node.attribs.id } as const;
    //           }

    //           return typedSubnode;
    //         }),
    //       path: currentPath,
    //       parentId,
    //     });

    //     typedNode.node.childNodes.forEach((subnode, index) => {
    //       idk(`${currentPath}/${index}`, id ?? null, subnode);
    //     });

    //     // no op
    //   }
    // };

    // idk('', null, svgNode);

    // if (errorAccumulator.length > 0) {
    //   return {
    //     [PROGRAM_ERROR_GEPP]: errorAccumulator.map(
    //       ({ currentPath, nodeType }) => {
    //         return {
    //           name: 'idk-error',
    //           error: new Error(
    //             `Something went wrong at ${currentPath}:${nodeType}`,
    //           ),
    //           reporterLocator,
    //           sourceLocator: {
    //             typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
    //             filePath: '',
    //           },
    //           context: null,
    //         };
    //       },
    //     ),
    //     [DECODED_SVG_DOCUMENT_GEPP]: [],
    //   };
    // }

    // console.log(
    //   accumulator.map(({ path, id, tagName, parentId }) => {
    //     return {
    //       id,
    //       parentId,
    //       tagName,
    //       path,
    //     };
    //   }),
    // );

    // const invalidEntries = accumulator.filter(
    //   ({ tagName }) => tagName !== 'g' && tagName !== 'svg',
    // );
    // if (invalidEntries.length > 0) {
    //   return {
    //     [PROGRAM_ERROR_GEPP]: errorAccumulator.map(
    //       ({ currentPath, nodeType }) => {
    //         return {
    //           name: 'idk-error-2',
    //           error: new Error(`Invalid parent entries`),
    //           reporterLocator,
    //           sourceLocator: {
    //             typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
    //             filePath: '',
    //           },
    //           context: {
    //             invalidEntries: invalidEntries.map(({ id, path, tagName }) => ({
    //               id,
    //               path,
    //               tagName,
    //             })),
    //           },
    //         };
    //       },
    //     ),
    //     [DECODED_SVG_DOCUMENT_GEPP]: [],
    //   };
    // }

    // TODO: FIGURE OUT WHAT TO DO WITH THE NEXT LAYER OF CHILDREN

    // console.log(list2);
    // console.log('---');

    // const decodeGroup = (groupNode: cheerio.group) => {};

    // if (
    //   !svgNode.childNodes.every((cheerioNode) => {
    //     const childNode = cheerioNode as unknown as ChildNode;

    //     return isElement(childNode) || isEmptyComment(childNode);
    //   })
    // ) {
    //   const x = svgNode.childNodes.map((c) => c.data?.trim());

    //   console.log('INVALID', x);
    //   return;
    //   // throw Error('Invalid root children');
    // }

    // const x = svgNode.childNodes
    //   .filter((c) => c.nodeType === 1)
    //   .map((c: cheerio.Element) => c.tagName);
    // console.log(x);

    // const foo = (q: ChildNode) => {
    //   if ('tagName' in q) {
    //     q.
    //   }
    // };

    // const decodeNode = (nextNode: cheerio.Element): DecodedSvgNode => {
    //   const children = nextNode.childNodes
    //     .map((childNode) => {
    //       if ('tagName' in childNode) {
    //         return decodeNode(childNode);
    //       }

    //       if (childNode.type === 'text') {
    //         return childNode.data;
    //       }

    //       if (childNode.type === 'comment') {
    //         // ignore automatically generated comments since we can get that metadata from elsewhere (I've only seen comments for the graph element id)
    //         return null;
    //       }

    //       throw Error('Unhandled child node');
    //     })
    //     .filter(
    //       (decodedChild) =>
    //         typeof decodedChild !== 'string' || decodedChild.trim() !== '',
    //     )
    //     .filter(isNotNull);

    //   return {
    //     elementName: nextNode.tagName,
    //     attributeByKey: Object.fromEntries(
    //       nextNode.attributes.map((attribute) => {
    //         return [attribute.name, attribute.value] as const;
    //       }),
    //     ),
    //     children,
    //   };
    // };

    // const decodedSvgNode = decodeNode(svgNode);

    // return {
    //   zorn: svgDocument.zorn,
    //   grition: decodedSvgNode,
    // };

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

    // const normalizedNodeList: NormalizedNode[] = [];
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

    const upperFirst = (text: string): string => {
      if (text === '') {
        return text;
      }

      const [firstCharacter, ...rest] = text.split('');
      return [firstCharacter.toUpperCase(), ...rest].join('');
    };

    const recastNode = (
      node: DecodedNode,
    ): n.JSXElement | n.JSXExpressionContainer | null => {
      if (node.typeName === NodeTypeName.Element) {
        if (node.tagName === 'title') {
          return null;
        }

        // const elementName =
        //   node.id !== null
        //     ? 'CustomWrapper'
        //     : `${upperFirst(node.tagName)}Wrapper`;
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

            return [name, attribute.value];
          })
          .filter(isNotNull)
          .map(([name, value]) => {
            return b.jsxAttribute(b.jsxIdentifier(name), b.literal(value));
          });

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

    const idk = recastNode(decodedSvgNode) as n.JSXElement;
    const fileName = `debug/example/${svgDocument.zorn}.tsx`;
    fs.writeFileSync(
      fileName,
      [
        'import React from "react"',
        `export const Main: React.FunctionComponent = () => { return  (${
          recast.print(idk).code
        })}`,
      ].join('\n'),
    );

    if (unknownNodeInfoList.length > 0) {
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
        [DECODED_SVG_DOCUMENT_GEPP]: [],
      };
    }

    return {
      [PROGRAM_ERROR_GEPP]: [],
      [DECODED_SVG_DOCUMENT_GEPP]: [],
    };
  })
  .assemble();
