import { FILE_GEPP, FileVoque } from './file';
import {
  TypeScriptFile,
  TYPE_SCRIPT_FILE_GEPP,
  TypeScriptFileVoque,
} from '../type-script-file/typeScriptFile';
import { YAML_FILE_GEPP, YamlFile, YamlFileVoque } from '../yaml-file/yamlFile';
import { FileExtensionSuffixIdentifier } from './fileExtensionSuffixIdentifier';
import { HtmlFile, HTML_FILE_GEPP, HtmlFileVoque } from '../html-file/htmlFile';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';

/**
 * Places a file into zero or more collections without modifying the file
 */
export const categorizeFiles = buildEstinant({
  name: 'categorizeFiles',
})
  .fromHubblepup2<FileVoque>({
    gepp: FILE_GEPP,
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
  .toHubblepupOnCondition<HtmlFileVoque>({
    gepp: HTML_FILE_GEPP,
    pinbe: (file): file is HtmlFile =>
      file.extension.suffixIdentifier === FileExtensionSuffixIdentifier.Html,
  })
  .assemble();
