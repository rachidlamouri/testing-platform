import { isNotNull } from './isNotNull';
import { isNotUndefined } from './isNotUndefined';

type Nullish = null | undefined;

export const isNotNullish = <T>(datum: T): datum is Exclude<T, Nullish> => {
  return isNotNull(datum) && isNotUndefined(datum);
};
