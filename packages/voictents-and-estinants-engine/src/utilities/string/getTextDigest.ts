import crypto from 'crypto';

// TODO: make sure no file other than Zorn is using this for zorn purposes
export const getTextDigest = (text: string): string => {
  const hash = crypto.createHash('sha1');
  hash.write(text);
  const digest = hash.digest('hex');
  return digest;
};
