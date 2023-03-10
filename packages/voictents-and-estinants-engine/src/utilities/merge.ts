import { SimplifyObject } from './simplifyObject';

export type Merge<
  TObject1 extends object,
  TObject2 extends object,
> = SimplifyObject<TObject1 & TObject2>;
