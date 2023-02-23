import { FileExtensionSuffixIdentifier } from '../../../utilities/file/fileExtensionSuffixIdentifier';
import { BaseFileAPlifal, FileA, FileAOdeshin } from './fileA';

export type HtmlFileA = FileA<FileExtensionSuffixIdentifier.TabSeparatedValues>;

export type HtmlFileAOdeshin = FileAOdeshin<HtmlFileA>;

export const HTML_FILE_A_GEPP = Symbol('html-file-a');

export type HtmlFileAGepp = typeof HTML_FILE_A_GEPP;

export type HtmlFileAPlifal = BaseFileAPlifal<
  [HtmlFileAGepp],
  HtmlFileAOdeshin
>;

export type HtmlFileAPlifalTuple = readonly HtmlFileAPlifal[];
