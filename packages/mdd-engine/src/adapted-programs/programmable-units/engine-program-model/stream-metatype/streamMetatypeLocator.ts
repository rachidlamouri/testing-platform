import { ExportLocatorSubclassInput, ExportLocator } from '../exportLocator';
import { StreamMetatypeId } from './streamMetatypeId';

type StreamMetatypeLocatorInput = ExportLocatorSubclassInput;

/**
 * The information needed to find the type definition of a StreamMetatype
 */
export class StreamMetatypeLocator extends ExportLocator {
  constructor(input: StreamMetatypeLocatorInput) {
    super({
      IdConstructor: StreamMetatypeId,
      distinguisher: 'StreamMetatype',
      ...input,
    });
  }
}
