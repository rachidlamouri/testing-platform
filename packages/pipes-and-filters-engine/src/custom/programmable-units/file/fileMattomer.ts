import { buildMattomer } from '../../adapter/estinant/mattomer';
import { FileVoictent, FILE_GEPP } from './file';
import {
  TypeScriptFile,
  TypeScriptFileVoictent,
  TYPE_SCRIPT_FILE_GEPP,
} from '../type-script-file/typeScriptFile';
import {
  YamlFileVoictent,
  YAML_FILE_GEPP,
  YamlFile,
} from '../yaml-file/yamlFile';
import { FileExtensionSuffixIdentifier } from './fileExtensionSuffixIdentifier';

export const fileAMattomer = buildMattomer<
  FileVoictent,
  [TypeScriptFileVoictent, YamlFileVoictent]
>({
  inputGepp: FILE_GEPP,
  kerzTuple: [
    {
      gepp: TYPE_SCRIPT_FILE_GEPP,
      pinbe: (input): input is TypeScriptFile =>
        input.extension.suffixIdentifier ===
        FileExtensionSuffixIdentifier.TypeScript,
    },
    {
      gepp: YAML_FILE_GEPP,
      pinbe: (input): input is YamlFile =>
        input.extension.suffixIdentifier === FileExtensionSuffixIdentifier.Yaml,
    },
  ],
});
