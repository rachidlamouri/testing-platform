import { ValueOf } from 'type-fest';
import { Gepp, GeppCombination } from '../../../core/types/voictent/gepp';
import { buildGeppCombination } from '../../../adapter/engine/digikikify';
import { BASH_FILE_GEPP } from '../bash-file/bashFile';
import { HTML_FILE_GEPP } from '../html-file/htmlFile';
import { YAML_FILE_GEPP } from '../yaml-file/yamlFile';
import { FileExtensionSuffixIdentifier } from '../../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import { FILE_GEPP } from './file';
import { TYPE_SCRIPT_FILE_GEPP } from '../type-script-file/typeScriptFile';
import { DIRECTORY_GEPP } from './directory';

type FileExtensionSuffixIdentifierOfInterest =
  | Exclude<
      FileExtensionSuffixIdentifier,
      | FileExtensionSuffixIdentifier.Unknown
      | FileExtensionSuffixIdentifier.Text
      | FileExtensionSuffixIdentifier.TypeScriptXml
      | FileExtensionSuffixIdentifier.Json
      | FileExtensionSuffixIdentifier.Gitignore
    >
  | 'BaseFile'
  | 'Directory';

type DefaultGeppByFileExtensionSuffixIdentifier = Record<
  FileExtensionSuffixIdentifierOfInterest,
  Gepp
>;

const defaultFileGeppByFileExtensionSuffixIdentifier = {
  [FileExtensionSuffixIdentifier.Bash]: BASH_FILE_GEPP,
  [FileExtensionSuffixIdentifier.Html]: HTML_FILE_GEPP,
  [FileExtensionSuffixIdentifier.TypeScript]: TYPE_SCRIPT_FILE_GEPP,
  [FileExtensionSuffixIdentifier.Yaml]: YAML_FILE_GEPP,
  BaseFile: FILE_GEPP,
  Directory: DIRECTORY_GEPP,
} as const satisfies DefaultGeppByFileExtensionSuffixIdentifier;

const defaultFileGeppList = Object.values(
  defaultFileGeppByFileExtensionSuffixIdentifier,
);

type DefaultFileGepp = ValueOf<
  typeof defaultFileGeppByFileExtensionSuffixIdentifier
>;

/**
 * The set of collection ids for streamable metatypes that use the
 * FileSystemNodeVoque
 *
 * @todo remove this so that the adapted engine doesn't have to know about FileSystemNode collections and instead provide a builder for a default set of collections
 *
 * @readableName defaultFileCollectionIdCombination
 */
export const defaultFileGeppCombination: GeppCombination<DefaultFileGepp> =
  buildGeppCombination(defaultFileGeppList);
