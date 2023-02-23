import {
  buildMentursectionHamletive,
  Paraker,
} from '../../../type-script-adapter/hamletive/mentursection';
import { FileExtensionSuffixIdentifier } from '../../../utilities/file/fileExtensionSuffixIdentifier';
import { QuirmOptionTuple } from '../../../type-script-adapter/quirmOptionTuple';
import { FileAPlifal, FILE_A_GEPP } from './fileA';
import {
  TypeScriptFileAOdeshin,
  TypeScriptFileAPlifal,
  TYPE_SCRIPT_FILE_A_GEPP,
} from './typeScriptFileA';
import {
  YamlFileAOdeshin,
  YamlFileAPlifal,
  YAML_FILE_A_GEPP,
} from './yamlFileA';
import { TsvFileAOdeshin, TsvFileAPlifal, TSV_FILE_A_GEPP } from './tsvFileA';
import {
  HtmlFileA,
  HtmlFileAOdeshin,
  HtmlFileAPlifal,
  HTML_FILE_A_GEPP,
} from './htmlFileA';

type InputPlifal = FileAPlifal;
type OutputPlifalOptionTuple = QuirmOptionTuple<
  [TypeScriptFileAPlifal, YamlFileAPlifal, TsvFileAPlifal, HtmlFileAPlifal]
>;

const isTypeScriptFileA: Paraker<
  InputPlifal,
  OutputPlifalOptionTuple,
  TypeScriptFileAPlifal
> = (input): input is TypeScriptFileAOdeshin =>
  input.grition.extension.suffixIdentifier ===
  FileExtensionSuffixIdentifier.TypeScript;

const isYamlFileA: Paraker<
  InputPlifal,
  OutputPlifalOptionTuple,
  YamlFileAPlifal
> = (input): input is YamlFileAOdeshin =>
  input.grition.extension.suffixIdentifier ===
  FileExtensionSuffixIdentifier.Yaml;

const isTsvFileA: Paraker<
  InputPlifal,
  OutputPlifalOptionTuple,
  TsvFileAPlifal
> = (input): input is TsvFileAOdeshin =>
  input.grition.extension.suffixIdentifier ===
  FileExtensionSuffixIdentifier.TabSeparatedValues;

const isHtmlFileA: Paraker<
  InputPlifal,
  OutputPlifalOptionTuple,
  TsvFileAPlifal
> = (input): input is HtmlFileAOdeshin =>
  input.grition.extension.suffixIdentifier ===
  FileExtensionSuffixIdentifier.Html;

export const fileAMentursection = buildMentursectionHamletive<
  InputPlifal,
  OutputPlifalOptionTuple
>({
  inputGepp: FILE_A_GEPP,
  kerzTuple: [
    {
      outputGeppTuple: [TYPE_SCRIPT_FILE_A_GEPP],
      parak: isTypeScriptFileA,
    },
    {
      outputGeppTuple: [YAML_FILE_A_GEPP],
      parak: isYamlFileA,
    },
    {
      outputGeppTuple: [TSV_FILE_A_GEPP],
      parak: isTsvFileA,
    },
    {
      outputGeppTuple: [HTML_FILE_A_GEPP],
      parak: isHtmlFileA,
    },
  ],
});
