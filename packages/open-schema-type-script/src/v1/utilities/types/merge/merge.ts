import { SimplifyObject } from '../simplify/simplifyObject';
import { UnknownObject } from '../unknownHelpers';

export type Merge<
  TObject1 extends UnknownObject,
  TObject2 extends UnknownObject,
> = SimplifyObject<TObject1 & TObject2>;
