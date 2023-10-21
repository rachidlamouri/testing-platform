import { TupleToUnion, UnionToIntersection } from 'type-fest';
import { GenericCollection2 } from '../../../core/types/collection/collection2';
import { FileExtensionSuffixIdentifier } from '../../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import {
  BASH_FILE_COLLECTION_ID,
  BashFileStreamMetatype,
} from '../bash-file/bashFile';
import {
  HTML_FILE_COLLECTION_ID,
  HtmlFileStreamMetatype,
} from '../html-file/htmlFile';
import {
  TYPE_SCRIPT_FILE_COLLECTION_ID,
  TypeScriptFileStreamMetatype,
} from '../type-script-file/typeScriptFile';
import {
  YAML_FILE_COLLECTION_ID,
  YamlFileStreamMetatype,
} from '../yaml-file/yamlFile';
import { DIRECTORY_COLLECTION_ID, DirectoryStreamMetatype } from './directory';
import { FILE_COLLECTION_ID, FileStreamMetatype } from './file';
import { FileSystemNodeCollection } from './fileSystemNodeCollection';

type FileIdentifierOfInterest =
  | 'Directory'
  | 'BaseFile'
  | Exclude<
      FileExtensionSuffixIdentifier,
      | FileExtensionSuffixIdentifier.Unknown
      | FileExtensionSuffixIdentifier.Text
      | FileExtensionSuffixIdentifier.TypeScriptXml
      | FileExtensionSuffixIdentifier.Json
      | FileExtensionSuffixIdentifier.Gitignore
    >;

type CollectionEntry<
  TFileIdentifierOfInterest extends FileIdentifierOfInterest,
> = readonly [TFileIdentifierOfInterest, GenericCollection2];

type CollectionEntryTuple<T extends Tuple<FileIdentifierOfInterest>> = {
  [TIndex in keyof T]: CollectionEntry<T[TIndex]>;
};

type CollectionCombination<
  T extends CollectionEntryTuple<Tuple<FileIdentifierOfInterest>>,
> = UnionToIntersection<
  TupleToUnion<{
    [TIndex in keyof T]: { [TKey in T[TIndex][0]]: T[TIndex][1] };
  }>
>;

const getCollectionCombination = <
  TCollectionEntryTuple extends CollectionEntryTuple<
    Tuple<FileIdentifierOfInterest>
  >,
>(
  collectionEntryTuple: TCollectionEntryTuple,
): CollectionCombination<TCollectionEntryTuple> => {
  return Object.fromEntries(
    collectionEntryTuple,
  ) as CollectionCombination<TCollectionEntryTuple>;
};

type CollectionTuple<
  TCollectionEntryTuple extends CollectionEntryTuple<
    Tuple<FileIdentifierOfInterest>
  >,
> = {
  [TIndex in keyof TCollectionEntryTuple]: TCollectionEntryTuple[TIndex][1];
};

/**
 * Creates a unique set of the most commonly used file system node collections
 */
export const buildDefaultFileCollectionTuple = (): CollectionTuple<
  typeof configurationTuple
> => {
  const configurationTuple = [
    [
      'Directory',
      new FileSystemNodeCollection<DirectoryStreamMetatype>({
        collectionId: DIRECTORY_COLLECTION_ID,
        continueOnDuplicate: false,
      }),
    ],
    [
      'BaseFile',
      new FileSystemNodeCollection<FileStreamMetatype>({
        collectionId: FILE_COLLECTION_ID,
        continueOnDuplicate: false,
      }),
    ],
    [
      FileExtensionSuffixIdentifier.Bash,
      new FileSystemNodeCollection<BashFileStreamMetatype>({
        collectionId: BASH_FILE_COLLECTION_ID,
        continueOnDuplicate: false,
      }),
    ],
    [
      FileExtensionSuffixIdentifier.Html,
      new FileSystemNodeCollection<HtmlFileStreamMetatype>({
        collectionId: HTML_FILE_COLLECTION_ID,
        continueOnDuplicate: false,
      }),
    ],
    [
      FileExtensionSuffixIdentifier.TypeScript,
      new FileSystemNodeCollection<TypeScriptFileStreamMetatype>({
        collectionId: TYPE_SCRIPT_FILE_COLLECTION_ID,
        continueOnDuplicate: false,
      }),
    ],
    [
      FileExtensionSuffixIdentifier.Yaml,
      new FileSystemNodeCollection<YamlFileStreamMetatype>({
        collectionId: YAML_FILE_COLLECTION_ID,
        continueOnDuplicate: false,
      }),
    ],
  ] as const;

  // This step may look unnecessary, but the "satisfies" clause keeps it in sync with new file types
  const configurationCombination = getCollectionCombination(
    configurationTuple,
  ) satisfies Record<FileIdentifierOfInterest, GenericCollection2>;

  const defaultList = Object.values(configurationCombination);

  return defaultList as unknown as CollectionTuple<typeof configurationTuple>;
};
