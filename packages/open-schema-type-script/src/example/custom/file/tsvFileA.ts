import { FileExtensionSuffixIdentifier } from '../../../utilities/file/fileExtensionSuffixIdentifier';
import { BaseFileAPlifal, FileA, FileAOdeshin } from './fileA';

export type TsvFileA = FileA<FileExtensionSuffixIdentifier.TabSeparatedValues>;

export type TsvFileAOdeshin = FileAOdeshin<TsvFileA>;

export const TSV_FILE_A_GEPP = Symbol('tsv-file-a');

export type TSVFileAGepp = typeof TSV_FILE_A_GEPP;

export type TsvFileAPlifal = BaseFileAPlifal<[TSVFileAGepp], TsvFileAOdeshin>;

export type TsvFileAPlifalTuple = readonly TsvFileAPlifal[];
