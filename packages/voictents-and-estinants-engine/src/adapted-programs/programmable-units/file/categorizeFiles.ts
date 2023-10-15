import {
  TypeScriptFile,
  TYPE_SCRIPT_FILE_COLLECTION_ID,
  TypeScriptFileStreamMetatype,
} from '../type-script-file/typeScriptFile';
import {
  YAML_FILE_COLLECTION_ID,
  YamlFile,
  YamlFileStreamMetatype,
} from '../yaml-file/yamlFile';
import { FileExtensionSuffixIdentifier } from '../../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import {
  HtmlFile,
  HTML_FILE_COLLECTION_ID,
  HtmlFileStreamMetatype,
} from '../html-file/htmlFile';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  BASH_FILE_COLLECTION_ID,
  BashFile,
  BashFileStreamMetatype,
} from '../bash-file/bashFile';
import { FILE_COLLECTION_ID, FileStreamMetatype } from './file';

/**
 * Places a file into zero or more collections without modifying the file. Uses
 * the object pattern with shareable getters
 */
export const categorizeFiles = buildProgrammedTransform({
  name: 'categorizeFiles',
})
  .fromItem2<FileStreamMetatype>({
    collectionId: FILE_COLLECTION_ID,
  })
  .toItemOnCondition<BashFileStreamMetatype>({
    collectionId: BASH_FILE_COLLECTION_ID,
    transform: (file): file is BashFile =>
      file.nodePath.name.extension.suffixIdentifier ===
      FileExtensionSuffixIdentifier.Bash,
  })
  .toItemOnCondition<HtmlFileStreamMetatype>({
    collectionId: HTML_FILE_COLLECTION_ID,
    transform: (file): file is HtmlFile =>
      file.nodePath.name.extension.suffixIdentifier ===
      FileExtensionSuffixIdentifier.Html,
  })
  .toItemOnCondition<TypeScriptFileStreamMetatype>({
    collectionId: TYPE_SCRIPT_FILE_COLLECTION_ID,
    transform: (file): file is TypeScriptFile =>
      file.nodePath.name.extension.suffixIdentifier ===
        FileExtensionSuffixIdentifier.TypeScript ||
      file.nodePath.name.extension.suffixIdentifier ===
        FileExtensionSuffixIdentifier.TypeScriptXml,
  })
  .toItemOnCondition<YamlFileStreamMetatype>({
    collectionId: YAML_FILE_COLLECTION_ID,
    transform: (file): file is YamlFile =>
      file.nodePath.name.extension.suffixIdentifier ===
      FileExtensionSuffixIdentifier.Yaml,
  })
  .assemble();
