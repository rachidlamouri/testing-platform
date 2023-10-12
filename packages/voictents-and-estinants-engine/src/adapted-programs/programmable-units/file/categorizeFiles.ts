import {
  TypeScriptFile,
  TYPE_SCRIPT_FILE_GEPP,
  TypeScriptFileVoque,
} from '../type-script-file/typeScriptFile';
import { YAML_FILE_GEPP, YamlFile, YamlFileVoque } from '../yaml-file/yamlFile';
import { FileExtensionSuffixIdentifier } from '../../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import { HtmlFile, HTML_FILE_GEPP, HtmlFileVoque } from '../html-file/htmlFile';
import { buildProgrammedTransform } from '../../../adapter/estinant-builder/buildEstinant';
import { BASH_FILE_GEPP, BashFile, BashFileVoque } from '../bash-file/bashFile';
import { FILE_GEPP, FileVoque } from './file';

/**
 * Places a file into zero or more collections without modifying the file. Uses
 * the object pattern with shareable getters
 */
export const categorizeFiles = buildProgrammedTransform({
  name: 'categorizeFiles',
})
  .fromItem2<FileVoque>({
    collectionId: FILE_GEPP,
  })
  .toHubblepupOnCondition<BashFileVoque>({
    gepp: BASH_FILE_GEPP,
    pinbe: (file): file is BashFile =>
      file.nodePath.name.extension.suffixIdentifier ===
      FileExtensionSuffixIdentifier.Bash,
  })
  .toHubblepupOnCondition<HtmlFileVoque>({
    gepp: HTML_FILE_GEPP,
    pinbe: (file): file is HtmlFile =>
      file.nodePath.name.extension.suffixIdentifier ===
      FileExtensionSuffixIdentifier.Html,
  })
  .toHubblepupOnCondition<TypeScriptFileVoque>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
    pinbe: (file): file is TypeScriptFile =>
      file.nodePath.name.extension.suffixIdentifier ===
        FileExtensionSuffixIdentifier.TypeScript ||
      file.nodePath.name.extension.suffixIdentifier ===
        FileExtensionSuffixIdentifier.TypeScriptXml,
  })
  .toHubblepupOnCondition<YamlFileVoque>({
    gepp: YAML_FILE_GEPP,
    pinbe: (file): file is YamlFile =>
      file.nodePath.name.extension.suffixIdentifier ===
      FileExtensionSuffixIdentifier.Yaml,
  })
  .assemble();
