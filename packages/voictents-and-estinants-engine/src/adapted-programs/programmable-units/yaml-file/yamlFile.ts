import { File } from '../file/file';
import { FileExtensionSuffixIdentifier } from '../../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import { FileSystemNodeStreamMetatype } from '../file/fileSystemNodeVoictent';

/**
 * A File object with the extension narrowed down to an yaml file
 */
export type YamlFile = File<FileExtensionSuffixIdentifier.Yaml>;

export const YAML_FILE_GEPP = 'yaml-file-a';

type YamlFileGepp = typeof YAML_FILE_GEPP;

export type YamlFileVoque = FileSystemNodeStreamMetatype<
  YamlFileGepp,
  YamlFile
>;
