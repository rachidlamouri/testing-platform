import { getTextDigest } from '../../package-agnostic-utilities/string/getTextDigest';
import { Zornable } from './zornable';

/**
 * An outdated pattern for getting an alphanumeric id from a string id. Use
 * ComplexId instead
 *
 * @deprecated
 *
 * @readableName getDigestibleId
 */
export const getZornableId = (zornable: Zornable): string => {
  return getTextDigest(zornable.zorn);
};
