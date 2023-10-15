import { File } from '../file/file';
import { FileExtensionSuffixIdentifier } from '../../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import { FileSystemNodeStreamMetatype } from '../file/fileSystemNodeVoictent';

/**
 * A File object with the extension narrowed down to an yaml file
 */
export type YamlFile = File<FileExtensionSuffixIdentifier.Yaml>;

export const YAML_FILE_COLLECTION_ID = 'yaml-file-a';

type YamlFileCollectionId = typeof YAML_FILE_COLLECTION_ID;

export type YamlFileStreamMetatype = FileSystemNodeStreamMetatype<
  YamlFileCollectionId,
  YamlFile
>;
