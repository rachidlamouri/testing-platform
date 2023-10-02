import { buildSerializeableNode } from './buildSerializeableNode';
import { getSerializeableNodeLineList } from './getSerializeableNodeLineList';

/**
 * A custom one way serializer that writes to a yaml file, but right now the
 * output isn't exactly yaml. This utility makes it easier to view entire
 * objects when debugging including annotations for all prototypes for an
 * object, annotations for symbols, annotations for circular references, all
 * enumerable properties (symbols too!), and it can render multiline text in a
 * readable way.
 *
 * If you need to serialize data to read it back into memory later, don't use
 * this. Use JSON or something else.
 *
 * @todo make this actually output yaml
 */
export const serialize = (datum: unknown): string => {
  const rootNode = buildSerializeableNode(datum);
  const rootNodeLineList = getSerializeableNodeLineList(rootNode);
  const text = rootNodeLineList.join('\n');
  return text;
};
