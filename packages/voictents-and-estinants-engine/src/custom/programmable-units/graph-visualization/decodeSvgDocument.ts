import * as cheerio from 'cheerio';
import { ElementType } from 'react';
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
      EmptyText = 'EmptyText',
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

    const isEmptyTextNode = (childNode: ChildNode): childNode is TextNode =>
      isTextNode(childNode) && childNode.data.trim() === '';

    const isCommentNode = (childNode: ChildNode): childNode is CommentNode =>
      childNode.nodeType === 8;

    type ElementTypedNode = {
      typeName: NodeTypeName.Element;
      node: cheerio.Element;
      hasChildren: boolean;
    };

    type EmptyTextTypedNode = {
      typeName: NodeTypeName.EmptyText;
      node: TextNode;
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
      | EmptyTextTypedNode
      | CommentTypedNode
      | TypedUnknownTypedNode;

    type KnownTypedNode = Exclude<TypedNode, TypedUnknownTypedNode>;

    const isElementTypedNode = (
      typedNode: TypedNode,
    ): typedNode is ElementTypedNode =>
      typedNode.typeName === NodeTypeName.Element;

    const classifyChildNode = (childNode: ChildNode): TypedNode => {
      if (isElementNode(childNode)) {
        return {
          typeName: NodeTypeName.Element,
          node: childNode,
          hasChildren: childNode.childNodes.length > 0,
        };
      }

      if (isEmptyTextNode(childNode)) {
        return {
          typeName: NodeTypeName.EmptyText,
          node: childNode,
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

    const isKnownTypedNode = (
      typedNode: TypedNode,
    ): typedNode is KnownTypedNode =>
      typedNode.typeName !== NodeTypeName.Unknown;

    const isKnownTypedNodeList = (
      list: TypedNode[],
    ): list is KnownTypedNode[] => list.every(isKnownTypedNode);

    const list1 = svgNode.childNodes.map(classifyChildNode);

    if (!isKnownTypedNodeList(list1)) {
      return {
        [PROGRAM_ERROR_GEPP]: [
          {
            name: 'invalid-root-child-list',
            error: new Error(
              'The top level svg has one or more children that are unknown',
            ),
            reporterLocator,
            sourceLocator: {
              typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
              filePath: '',
            },
            context: {
              nodeTypeNameList: list1.map((typedNode) => typedNode.typeName),
            },
          },
        ],
        [DECODED_SVG_DOCUMENT_GEPP]: [],
      };
    }

    const list2 = list1.filter(isElementTypedNode).map(({ node }, index) => {
      const sublist = node.childNodes.map(classifyChildNode);
      return {
        sublist,
        index,
      };
    });

    const problemList = list2.filter(
      ({ sublist }) => !isKnownTypedNodeList(sublist),
    );

    if (problemList.length > 0) {
      return {
        [PROGRAM_ERROR_GEPP]: problemList.map(({ sublist, index }) => {
          return {
            name: 'invalid-subnode-child-list',
            error: new Error(
              `A subnode has unknown children: ${svgDocument.zorn}/svg/${index}/g`,
            ),
            reporterLocator,
            sourceLocator: {
              typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
              filePath: '',
            },
            context: {
              sublist: sublist.map((typedNode) => {
                if (isKnownTypedNode(typedNode)) {
                  return typedNode.typeName;
                }

                return {
                  nodeType: typedNode.node.nodeType,
                };
              }),
            },
          };
        }),
        [DECODED_SVG_DOCUMENT_GEPP]: [],
      };
    }

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

    return {
      [PROGRAM_ERROR_GEPP]: [],
      [DECODED_SVG_DOCUMENT_GEPP]: [],
    };
  })
  .assemble();
