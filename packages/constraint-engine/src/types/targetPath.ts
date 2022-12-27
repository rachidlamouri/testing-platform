export type RootTargetPath = '';
export type UnknownTargetPath = string;

export type PrefixedTargetPath<
  TPrefix extends UnknownTargetPath,
  TSuffix extends UnknownTargetPath,
> = `${TPrefix}/${TSuffix}`;

export type NormalizedTargetPath<TTargetPath extends UnknownTargetPath> =
  TTargetPath extends PrefixedTargetPath<infer TPrefix, infer TSuffix>
    ? `${TPrefix}/:${TSuffix}`
    : TTargetPath;
