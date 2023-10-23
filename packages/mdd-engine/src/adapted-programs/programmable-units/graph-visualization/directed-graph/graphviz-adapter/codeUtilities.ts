import { PartialElementAttributeByKey } from './element-attribute-by-key/derived/partialElementAttributeByKey';

type QuotedText = `"${string}"`;

type AttributeStatement = `${QuotedText}=${string};`;

// This should be a recursive template literal of "AttributeStatement", but that feature is not supported
type AttributeListStatement = `[ ${AttributeStatement} ]`;

export const quote = (text: string): QuotedText => `"${text}"`;

export const getAttributeStatementList = (
  attributeByKey: PartialElementAttributeByKey,
): AttributeStatement[] => {
  const result = Object.entries(attributeByKey)
    .filter(([, value]) => value !== undefined)
    .map<AttributeStatement>(([key, value]) => {
      const textValue = String(value);

      const quotedKey = quote(key);
      const quotedValue = quote(textValue);

      return `${quotedKey}=${quotedValue};`;
    });

  return result;
};

export const joinAttributeListSingleLine = (
  list: string[],
): AttributeListStatement => `[ ${list.join(' ')} ]` as AttributeListStatement;

export type EdgeRelationshipStatement = `${QuotedText} -> ${QuotedText}`;

export type EdgeStatement =
  `${EdgeRelationshipStatement} ${AttributeListStatement}`;

export type NodeStatement = `${QuotedText} ${AttributeListStatement}`;
