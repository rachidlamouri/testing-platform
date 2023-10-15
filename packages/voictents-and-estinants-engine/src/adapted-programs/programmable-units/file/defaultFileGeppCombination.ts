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

type DefaultGeppByFileExtensionSuffixIdentifier = Record<
  FileExtensionSuffixIdentifierOfInterest,
  CollectionId
>;

const defaultFileGeppByFileExtensionSuffixIdentifier = {
  [FileExtensionSuffixIdentifier.Bash]: BASH_FILE_COLLECTION_ID,
  [FileExtensionSuffixIdentifier.Html]: HTML_FILE_COLLECTION_ID,
  [FileExtensionSuffixIdentifier.TypeScript]: TYPE_SCRIPT_FILE_COLLECTION_ID,
  [FileExtensionSuffixIdentifier.Yaml]: YAML_FILE_COLLECTION_ID,
  BaseFile: FILE_COLLECTION_ID,
  Directory: DIRECTORY_COLLECTION_ID,
} as const satisfies DefaultGeppByFileExtensionSuffixIdentifier;

const defaultFileGeppList = Object.values(
  defaultFileGeppByFileExtensionSuffixIdentifier,
);

type DefaultFileGepp = ValueOf<
  typeof defaultFileGeppByFileExtensionSuffixIdentifier
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
export const defaultFileCollectionIdCombination: CollectionIdCombination<DefaultFileGepp> =
  buildCollectionIdCombination(defaultFileGeppList);
