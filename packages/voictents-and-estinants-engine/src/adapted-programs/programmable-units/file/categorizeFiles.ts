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
  .toItemOnCondition<BashFileVoque>({
    collectionId: BASH_FILE_GEPP,
    transform: (file): file is BashFile =>
      file.nodePath.name.extension.suffixIdentifier ===
      FileExtensionSuffixIdentifier.Bash,
  })
  .toItemOnCondition<HtmlFileVoque>({
    collectionId: HTML_FILE_GEPP,
    transform: (file): file is HtmlFile =>
      file.nodePath.name.extension.suffixIdentifier ===
      FileExtensionSuffixIdentifier.Html,
  })
  .toItemOnCondition<TypeScriptFileVoque>({
    collectionId: TYPE_SCRIPT_FILE_GEPP,
    transform: (file): file is TypeScriptFile =>
      file.nodePath.name.extension.suffixIdentifier ===
        FileExtensionSuffixIdentifier.TypeScript ||
      file.nodePath.name.extension.suffixIdentifier ===
        FileExtensionSuffixIdentifier.TypeScriptXml,
  })
  .toItemOnCondition<YamlFileVoque>({
    collectionId: YAML_FILE_GEPP,
    transform: (file): file is YamlFile =>
      file.nodePath.name.extension.suffixIdentifier ===
      FileExtensionSuffixIdentifier.Yaml,
  })
  .assemble();
