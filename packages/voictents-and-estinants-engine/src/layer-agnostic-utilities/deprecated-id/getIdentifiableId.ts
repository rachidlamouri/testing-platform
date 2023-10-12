import { getTextDigest } from '../../package-agnostic-utilities/string/getTextDigest';
import { Identifiable } from './identifiable';

/**
 * An outdated pattern for getting an alphanumeric id from a string id. Use
 * ComplexId instead
 *
 * @deprecated
 *
 * @readableName getDigestibleId
 */
export const getIdentifiableId = (identifiable: Identifiable): string => {
  return getTextDigest(identifiable.id);
};
