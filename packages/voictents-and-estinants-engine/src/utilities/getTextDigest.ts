import crypto from 'crypto';

export const getTextDigest = (text: string): string => {
  const hash = crypto.createHash('sha1');
  hash.write(text);
  const digest = hash.digest('hex');
  return digest;
};
