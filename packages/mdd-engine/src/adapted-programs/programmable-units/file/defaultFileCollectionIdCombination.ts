import { ValueOf } from 'type-fest';
import {
  CollectionId,
  CollectionIdCombination,
} from '../../../core/types/collection/collectionId';
import { buildCollectionIdCombination } from '../../../adapter/engine/runEngine';
import { BASH_FILE_COLLECTION_ID } from '../bash-file/bashFile';
import { HTML_FILE_COLLECTION_ID } from '../html-file/htmlFile';
import { YAML_FILE_COLLECTION_ID } from '../yaml-file/yamlFile';
import { FileExtensionSuffixIdentifier } from '../../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import { FILE_COLLECTION_ID } from './file';
import { TYPE_SCRIPT_FILE_COLLECTION_ID } from '../type-script-file/typeScriptFile';
import { DIRECTORY_COLLECTION_ID } from './directory';

type FileExtensionSuffixIdentifierOfInterest =
  | Exclude<
      FileExtensionSuffixIdentifier,
      | FileExtensionSuffixIdentifier.Unknown
      | FileExtensionSuffixIdentifier.Text
      | FileExtensionSuffixIdentifier.TypeScriptXml
      | FileExtensionSuffixIdentifier.Json
      | FileExtensionSuffixIdentifier.Gitignore
    >
  | 'BaseFile'
  | 'Directory';

type DefaultCollectionIdByFileExtensionSuffixIdentifier = Record<
  FileExtensionSuffixIdentifierOfInterest,
  CollectionId
>;

const defaultFileCollectionIdByFileExtensionSuffixIdentifier = {
  [FileExtensionSuffixIdentifier.Bash]: BASH_FILE_COLLECTION_ID,
  [FileExtensionSuffixIdentifier.Html]: HTML_FILE_COLLECTION_ID,
  [FileExtensionSuffixIdentifier.TypeScript]: TYPE_SCRIPT_FILE_COLLECTION_ID,
  [FileExtensionSuffixIdentifier.Yaml]: YAML_FILE_COLLECTION_ID,
  BaseFile: FILE_COLLECTION_ID,
  Directory: DIRECTORY_COLLECTION_ID,
} as const satisfies DefaultCollectionIdByFileExtensionSuffixIdentifier;

const defaultFileCollectionIdList = Object.values(
  defaultFileCollectionIdByFileExtensionSuffixIdentifier,
);

type DefaultFileCollectionId = ValueOf<
  typeof defaultFileCollectionIdByFileExtensionSuffixIdentifier
>;

/**
 * The set of collection ids for item metatypes that use the
 * FileSystemNodeVoque
 *
 * @todo remove this so that the adapted engine doesn't have to know about FileSystemNode collections and instead provide a builder for a default set of collections
 *
 * @readableName defaultFileCollectionIdCombination
 *
 * @canonicalDeclaration
 */
export const defaultFileCollectionIdCombination: CollectionIdCombination<DefaultFileCollectionId> =
  buildCollectionIdCombination(defaultFileCollectionIdList);
