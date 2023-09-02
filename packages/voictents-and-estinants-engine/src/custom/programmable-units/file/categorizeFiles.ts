import {
  TypeScriptFile,
  TYPE_SCRIPT_FILE_GEPP,
  TypeScriptFileVoque,
} from '../type-script-file/typeScriptFile';
import { YAML_FILE_GEPP, YamlFile, YamlFileVoque } from '../yaml-file/yamlFile';
import { FileExtensionSuffixIdentifier } from './fileExtensionSuffixIdentifier';
import { HtmlFile, HTML_FILE_GEPP, HtmlFileVoque } from '../html-file/htmlFile';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { BASH_FILE_GEPP, BashFile, BashFileVoque } from '../bash-file/bashFile';
import { FILE_2_GEPP, File2Voque } from './file2';

/**
 * Places a file into zero or more collections without modifying the file. Uses
 * the object pattern with shareable getters
 */
export const categorizeFiles = buildEstinant({
  name: 'categorizeFiles',
})
  .fromHubblepup2<File2Voque>({
    gepp: FILE_2_GEPP,
  })
  .toHubblepupOnCondition<BashFileVoque>({
    gepp: BASH_FILE_GEPP,
    pinbe: (file): file is BashFile =>
      file.extension.suffixIdentifier === FileExtensionSuffixIdentifier.Bash,
  })
  .toHubblepupOnCondition<HtmlFileVoque>({
    gepp: HTML_FILE_GEPP,
    pinbe: (file): file is HtmlFile =>
      file.extension.suffixIdentifier === FileExtensionSuffixIdentifier.Html,
  })
  .toHubblepupOnCondition<TypeScriptFileVoque>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
    pinbe: (file): file is TypeScriptFile =>
      file.extension.suffixIdentifier ===
      FileExtensionSuffixIdentifier.TypeScript,
  })
  .toHubblepupOnCondition<YamlFileVoque>({
    gepp: YAML_FILE_GEPP,
    pinbe: (file): file is YamlFile =>
      file.extension.suffixIdentifier === FileExtensionSuffixIdentifier.Yaml,
  })
  .assemble();
