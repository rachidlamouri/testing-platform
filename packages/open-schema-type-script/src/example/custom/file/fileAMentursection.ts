import {
  buildMentursectionHamletive,
  Paraker,
} from '../../../type-script-adapter/hamletive/mentursection';
import { FileExtensionSuffixIdentifier } from '../../../utilities/file/fileExtensionSuffixIdentifier';
import { OptionTuple } from '../../../utilities/optionTuple';
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

type InputOptionTuple = OptionTuple<[FileAPlifal]>;
type OutputOptionTuple = OptionTuple<[TypeScriptFileAPlifal, YamlFileAPlifal]>;

const isTypeScriptFileA: Paraker<
  InputOptionTuple,
  OutputOptionTuple,
  TypeScriptFileAPlifal
> = (input): input is TypeScriptFileAOdeshin =>
  input.grition.extension.suffixIdentifier ===
  FileExtensionSuffixIdentifier.TypeScript;

const isYamlFileA: Paraker<
  InputOptionTuple,
  OutputOptionTuple,
  YamlFileAPlifal
> = (input): input is YamlFileAOdeshin =>
  input.grition.extension.suffixIdentifier ===
  FileExtensionSuffixIdentifier.Yaml;

export const fileAMentursection = buildMentursectionHamletive<
  InputOptionTuple,
  OutputOptionTuple
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
  ],
});
