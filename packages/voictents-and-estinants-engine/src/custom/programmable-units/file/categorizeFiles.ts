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
import {
  HtmlFile,
  HtmlFileVoictent,
  HTML_FILE_GEPP,
} from '../html-file/htmlFile';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';

export const categorizeFiles = buildEstinant({
  name: 'categorizeFiles',
})
  .fromGrition<FileVoictent>({
    gepp: FILE_GEPP,
  })
  .toGritionOnCondition<TypeScriptFileVoictent>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
    pinbe: (file): file is TypeScriptFile =>
      file.extension.suffixIdentifier ===
      FileExtensionSuffixIdentifier.TypeScript,
  })
  .toGritionOnCondition<YamlFileVoictent>({
    gepp: YAML_FILE_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
    pinbe: (file): file is YamlFile =>
      file.extension.suffixIdentifier === FileExtensionSuffixIdentifier.Yaml,
  })
  .toGritionOnCondition<HtmlFileVoictent>({
    gepp: HTML_FILE_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
    pinbe: (file): file is HtmlFile =>
      file.extension.suffixIdentifier === FileExtensionSuffixIdentifier.Html,
  })
  .assemble();
