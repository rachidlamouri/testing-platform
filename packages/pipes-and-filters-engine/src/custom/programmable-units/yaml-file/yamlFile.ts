import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';
import { File } from '../file/file';
import { FileExtensionSuffixIdentifier } from '../file/fileExtensionSuffixIdentifier';

export type YamlFile = File<FileExtensionSuffixIdentifier.Yaml>;

export type YamlFileGrition = Grition<YamlFile>;

export type YamlFileOdeshin = OdeshinFromGrition<YamlFileGrition>;

export const YAML_FILE_GEPP = 'yaml-file-a';

export type YamlFileGepp = typeof YAML_FILE_GEPP;

export type YamlFileVoictent = Voictent<YamlFileGepp, YamlFileOdeshin>;
