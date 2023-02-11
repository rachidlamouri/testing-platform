import { Estinant, Estinant2 } from '../core/estinant';

// TODO: add a wrapper layer that takes TypeScript concerns into consideration
export const blindCastEstinants = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TEstinantTuple extends readonly (Estinant<any, any> | Estinant2<any, any>)[],
>(
  tuple: TEstinantTuple,
): readonly (Estinant | Estinant2)[] => tuple;
