import { MentursectionEstinant } from '../../../core/estinant';
import { TropoignantTypeName } from '../../../core/tropoignant';
import { FileExtensionSuffixIdentifier } from '../../../utilities/file/fileExtensionSuffixIdentifier';
import { FileAOdeshin, FILE_A_GEPP } from './fileA';
import { TYPE_SCRIPT_FILE_A_GEPP } from './typeScriptFileA';
import { YAML_FILE_A_GEPP } from './yamlFileA';

export const fileAMentursection: MentursectionEstinant<FileAOdeshin> = {
  inputGepp: FILE_A_GEPP,
  tropoignant: {
    typeName: TropoignantTypeName.Mentursection,
    process: function categorizeFileA(inputOdeshin) {
      switch (inputOdeshin.grition.extension.suffixIdentifier) {
        case FileExtensionSuffixIdentifier.TypeScript:
          return [TYPE_SCRIPT_FILE_A_GEPP];
        case FileExtensionSuffixIdentifier.Yaml:
          return [YAML_FILE_A_GEPP];
        case FileExtensionSuffixIdentifier.Json:
          return [];
        case FileExtensionSuffixIdentifier.Unknown:
          return [];
      }
    },
  },
};
