import { CustomDatumTypeName } from '../typed-datum/customTypedDatum';
import {
  SerializeableNode,
  SerializeableNodeName,
  SimpleSerializeableObjectEntry,
} from './serializeableNode';

const isCommentLine = (line: string): boolean => /^ *#/.test(line);

const indentLine = (line: string): string => `  ${line}`;

type LineListMetadata = {
  isOneLine: boolean;
  firstLine: string;
  middleLineList: string[];
  lastLine: string;
};

// TODO: move this to a utility file and account for empty lists
const getLineListMetadata = (lineList: string[]): LineListMetadata => {
  const firstIndex = 0;
  const lineCount = lineList.length;
  const lastIndex = lineCount - 1;

  let firstLine = '';
  const middleLineList: string[] = [];
  let lastLine = '';

  lineList.forEach((line, index) => {
    if (index === firstIndex) {
      firstLine = line;
    }

    if (index === lastIndex) {
      lastLine = line;
    }

    if (index > firstIndex && index < lastIndex) {
      middleLineList.push(line);
    }
  });

  return {
    isOneLine: lineCount === 1,
    firstLine,
    middleLineList,
    lastLine,
  };
};

export const getSerializeableNodeLineList = (
  node: SerializeableNode,
): string[] => {
  switch (node.nodeName) {
    case SerializeableNodeName.Boolean: {
      return [node.metadata.value.toString()];
    }
    case SerializeableNodeName.List: {
      const lineList: string[] = [];

      if (node.metadata.typeName === CustomDatumTypeName.Set) {
        lineList.push('# Set');
      }

      node.metadata.valueTuple.forEach((subnode) => {
        const sublist = getSerializeableNodeLineList(subnode);

        const hasCommentLine = isCommentLine(sublist[0]);

        const sublistMetadata = hasCommentLine
          ? getLineListMetadata(sublist.slice(1))
          : getLineListMetadata(sublist);

        if (hasCommentLine) {
          lineList.push(indentLine(sublist[0]));
        }

        lineList.push(`- ${sublistMetadata.firstLine}`);

        if (!sublistMetadata.isOneLine) {
          lineList.push(
            ...[
              ...sublistMetadata.middleLineList,
              sublistMetadata.lastLine,
            ].map(indentLine),
          );
        }
      });

      return lineList;
    }
    case SerializeableNodeName.Null: {
      switch (node.metadata.typeName) {
        case CustomDatumTypeName.Null:
          return ['null'];
        case CustomDatumTypeName.Undefined:
          return ['~'];
      }
    }
    // eslint-disable-next-line no-fallthrough
    case SerializeableNodeName.Number: {
      switch (node.metadata.typeName) {
        case CustomDatumTypeName.BigInteger:
          return ['# bigint', `${node.metadata.value}`];
        case CustomDatumTypeName.Number:
          return [`${node.metadata.value}`];
      }
    }
    // eslint-disable-next-line no-fallthrough
    case SerializeableNodeName.Object: {
      const lineList: string[] = [];

      if (node.metadata.typeName !== CustomDatumTypeName.Function) {
        // All objects extend "Object", so trim the end for simplicity
        const prototypeNameTuple = node.metadata.prototypeNameTuple.slice(
          0,
          -1,
        );
        const prototypeNameTupleText = prototypeNameTuple.join(',');

        if (prototypeNameTuple.length > 0) {
          lineList.push(`# ${prototypeNameTupleText}`);
        }
      }

      if (node.metadata.isSimple) {
        node.metadata.entryList.forEach(
          ([key, value]: SimpleSerializeableObjectEntry) => {
            const serializeableKeyLineList = getSerializeableNodeLineList(key);
            const serializeableValueLineList =
              getSerializeableNodeLineList(value);

            const keyLineListMetadata = getLineListMetadata(
              serializeableKeyLineList,
            );
            const valueLineListMetadata = getLineListMetadata(
              serializeableValueLineList,
            );

            if (
              keyLineListMetadata.isOneLine &&
              valueLineListMetadata.isOneLine
            ) {
              lineList.push(
                `${keyLineListMetadata.firstLine}: ${valueLineListMetadata.firstLine}`,
              );
            } else if (keyLineListMetadata.isOneLine) {
              lineList.push(
                `${keyLineListMetadata.firstLine}:`,
                ...serializeableValueLineList.map(indentLine),
              );
            } else if (valueLineListMetadata.isOneLine) {
              lineList.push(
                keyLineListMetadata.firstLine,
                ...keyLineListMetadata.middleLineList,
                `${keyLineListMetadata.lastLine}: ${valueLineListMetadata.firstLine}`,
              );
            } else {
              lineList.push(
                keyLineListMetadata.firstLine,
                ...keyLineListMetadata.middleLineList,
                `${keyLineListMetadata.lastLine}:`,
                ...serializeableValueLineList.map(indentLine),
              );
            }
          },
        );
      } else {
        const entryListLineList = getSerializeableNodeLineList(
          node.metadata.entryList,
        );

        lineList.push(...entryListLineList);
      }

      return lineList;
    }
    // eslint-disable-next-line no-fallthrough
    case SerializeableNodeName.String: {
      switch (node.metadata.typeName) {
        case CustomDatumTypeName.String:
          if (node.metadata.isMultiline) {
            return ['"---', ...node.metadata.lineList, '---"'];
          }

          return [`"${node.metadata.value}"`];
        case CustomDatumTypeName.Symbol:
          return [
            `# symbol: "${node.metadata.description}"`,
            `${node.metadata.referenceId}`,
          ];
      }
    }
  }
};
