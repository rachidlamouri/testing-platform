export type UnknownTargetPath = string;

export type PrefixedTargetPath<
  TPrefix extends UnknownTargetPath,
  TSuffix extends UnknownTargetPath,
> = `${TPrefix}/${TSuffix}`;
