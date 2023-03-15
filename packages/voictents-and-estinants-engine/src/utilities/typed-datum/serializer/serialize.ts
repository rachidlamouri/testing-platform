import { buildSerializeableNode } from './buildSerializeableNode';
import { getSerializeableNodeLineList } from './getSerializeableNodeLineList';

export const serialize = (datum: unknown): string => {
  const rootNode = buildSerializeableNode(datum);
  const rootNodeLineList = getSerializeableNodeLineList(rootNode);
  const text = rootNodeLineList.join('\n');
  return text;
};
