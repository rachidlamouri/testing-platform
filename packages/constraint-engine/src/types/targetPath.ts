import { CustomSet } from '../utils/customSet';

export const ROOT_TARGET_PATH = '' as const;
export type RootTargetPath = typeof ROOT_TARGET_PATH;
export type UnknownTargetPath = string;

export type UnkownTargetPathSet = CustomSet<UnknownTargetPath>;

export type UnknownTargetPathTuple = readonly UnknownTargetPath[];

export type PrefixedTargetPath<
  TPrefix extends UnknownTargetPath,
  TSuffix extends UnknownTargetPath,
> = `${TPrefix}/${TSuffix}`;

export type UnknownDerivedTargetPath = PrefixedTargetPath<
  UnknownTargetPath,
  UnknownTargetPath
>;

// TODO: figure out what to do so we don't have to make an extraneous export
export type TargetPath = symbol;
