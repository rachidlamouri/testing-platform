/**
 * Encapsulates how to tell if a file path is relative
 *
 * @todo this is a predicate-like function. exempt those from needing a canonial comment as well
 */
export const isRelativeFilePath = (filePathLike: string): boolean => {
  const result =
    filePathLike.startsWith('./') || filePathLike.startsWith('../');

  return result;
};
