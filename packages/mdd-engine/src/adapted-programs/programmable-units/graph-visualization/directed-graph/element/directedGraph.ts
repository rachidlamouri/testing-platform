import { PartialGraphAttributeByKey } from '../directedGraph';
import { GlobalDirectedGraphId } from '../id/derived/global/globalDirectedGraph';
import { DirectedGraphId } from '../id/directedGraphId';
import { DirectedGraphElementLocator } from '../locator/directedGraphElementLocator';
import { DirectedGraphLocator } from '../locator/directedGraphLocator';

type DirectedGraphInput = {
  locator: DirectedGraphLocator;
  inputAttributeByKey: Omit<PartialGraphAttributeByKey, 'id'>;
  outputFileName?: string;
};

export class DirectedGraph extends DirectedGraphElementLocator<
  DirectedGraphId,
  DirectedGraphId,
  GlobalDirectedGraphId
> {
  inputAttributeByKey: Omit<PartialGraphAttributeByKey, 'id'>;

  outputFileName?: string;

  constructor(input: DirectedGraphInput) {
    super(input.locator);

    this.outputFileName = input.outputFileName;
    this.inputAttributeByKey = input.inputAttributeByKey;
  }
}
