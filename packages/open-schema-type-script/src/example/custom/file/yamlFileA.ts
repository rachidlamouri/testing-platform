import { FileExtensionSuffixIdentifier } from '../../../utilities/file/fileExtensionSuffixIdentifier';
import { FileA, FileAOdeshin, FileAPlifal } from './fileA';

export type YamlFileA = FileA<FileExtensionSuffixIdentifier.Yaml>;

export type YamlFileAOdeshin = FileAOdeshin<YamlFileA>;

export const YAML_FILE_A_GEPP = Symbol('yaml-file-a');

export type YamlFileAGepp = typeof YAML_FILE_A_GEPP;

export type YamlFileAPlifal = FileAPlifal<[YamlFileAGepp]>;

export type YamlFileAPlifalTuple = readonly YamlFileAPlifal[];
