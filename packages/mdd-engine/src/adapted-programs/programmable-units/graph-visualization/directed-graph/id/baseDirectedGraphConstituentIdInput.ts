import { IdLike } from '../../../../../package-agnostic-utilities/data-structure/id';
import { Source } from '../../../linting/source/source';

/**
 * Input object type for a graph constituent constructor
 */
export type BaseDirectedGraphConstituentIdInput = {
  source: Source;
  distinguisher: IdLike;
};
