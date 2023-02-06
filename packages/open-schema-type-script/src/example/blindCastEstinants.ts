import { EstinantTuple } from '../core/estinant';

// TODO: add a wrapper layer that takes TypeScript concerns into consideration
export const blindCastEstinants = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TEstinantTuple extends EstinantTuple<any, any>,
>(
  tuple: TEstinantTuple,
): EstinantTuple => tuple;
