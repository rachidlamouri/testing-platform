import { getTextDigest } from './getTextDigest';
import { Zornable } from '../custom/programmable-units/in-memory-cache/zornable';

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export const getZornableId = (zornable: Zornable): string => {
  return getTextDigest(zornable.zorn);
};
