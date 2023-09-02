import { File2 } from '../file/file2';
import { FileExtensionSuffixIdentifier } from '../file/fileExtensionSuffixIdentifier';
import { FileSystemNodeVoque } from '../file/fileSystemNodeVoictent';

/**
 * A File object with the extension narrowed down to an yaml file
 */
export type YamlFile = File2<FileExtensionSuffixIdentifier.Yaml>;

export const YAML_FILE_GEPP = 'yaml-file-a';

type YamlFileGepp = typeof YAML_FILE_GEPP;

export type YamlFileVoque = FileSystemNodeVoque<YamlFileGepp, YamlFile>;
