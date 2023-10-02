import crypto from 'crypto';

/**
 * A function to create alphanumeric text out of any text. This was primarily
 * added to make simpler ids for Graphviz objects since serialized complex ids
 * have characters that don't work well with HTML. This utility is not
 * constrained to that use case.
 *
 * @todo make sure no file other than Zorn is using this for zorn purposes.
 * [future me here] Why? I don't remember :shrug:
 */
export const getTextDigest = (text: string): string => {
  const hash = crypto.createHash('sha1');
  hash.write(text);
  const digest = hash.digest('hex');
  return digest;
};
