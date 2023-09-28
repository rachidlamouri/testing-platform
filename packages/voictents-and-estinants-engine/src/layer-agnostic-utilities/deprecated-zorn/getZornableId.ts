import { getTextDigest } from '../../package-agnostic-utilities/string/getTextDigest';
import { Zornable } from './zornable';

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export const getZornableId = (zornable: Zornable): string => {
  return getTextDigest(zornable.zorn);
};
