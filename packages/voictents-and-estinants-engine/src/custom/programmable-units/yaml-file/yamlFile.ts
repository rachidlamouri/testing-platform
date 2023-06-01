import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../../adapter/voictent';
import { File } from '../file/file';
import { FileExtensionSuffixIdentifier } from '../file/fileExtensionSuffixIdentifier';

/**
 * A File object with the extension narrowed down to an yaml file
 */
export type YamlFile = File<FileExtensionSuffixIdentifier.Yaml>;

export const YAML_FILE_GEPP = 'yaml-file-a';

export type YamlFileGepp = typeof YAML_FILE_GEPP;

export type YamlFileVoictent = Voictent<YamlFileGepp, YamlFile>;

export type YamlFileVoque = InMemoryOdeshin2Voque<YamlFileGepp, YamlFile>;
