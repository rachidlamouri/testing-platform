export const ROOT_TARGET_PATH = '' as const;
export type RootTargetPath = typeof ROOT_TARGET_PATH;
export type UnknownTargetPath = string;

export type PrefixedTargetPath<
  TPrefix extends UnknownTargetPath,
  TSuffix extends UnknownTargetPath,
> = `${TPrefix}/${TSuffix}`;

export type NormalizedTargetPath<TTargetPath extends UnknownTargetPath> =
  TTargetPath extends PrefixedTargetPath<infer TPrefix, infer TSuffix>
    ? `${TPrefix}/:${TSuffix}`
    : TTargetPath;
