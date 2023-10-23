import { IdLike } from '../../../../../package-agnostic-utilities/data-structure/id';
import { Source } from '../../../linting/source/source';

export type BaseDirectedGraphConstituentIdInput = {
  source: Source;
  distinguisher: IdLike;
};
