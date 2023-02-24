import { Grition } from '../../../custom-adapter/grition';
import { Odeshin } from '../../../custom-adapter/odeshin';
import { Plifal } from '../../../custom-adapter/plifal';
import { buildCortmumHamletive } from '../../../type-script-adapter/hamletive/cortmum';
import {
  TypeScriptFileB,
  TypeScriptFileBPlifal,
  TYPE_SCRIPT_FILE_B_GEPP,
} from '../file/typeScriptFileB';
import {
  PlifalFileConfigurationPlifal,
  PLIFAL_FILE_CONFIGURATION_GEPP,
} from './plifalFileConfiguration';

export type BasePlifalFileAMetadata = {
  identifierNames: {
    baseType: string;
    gritionType: string;
    geppConstant: string;
    geppType: string;
    identifierType: string;
    odeshinType: string;
    plifalType: string;
  };
};

export type PlifalFileA = TypeScriptFileB;

export type PlifalFileAGrition = Grition<PlifalFileA>;

export type PlifalFileAIdentifier = `plifal-file-a:${string}`;

export type PlifalFileAOdeshin = Odeshin<
  PlifalFileAIdentifier,
  PlifalFileAGrition
>;

export const PLIFAL_FILE_A_GEPP = Symbol('plifal-file-a');

export type PlifalFileAGepp = typeof PLIFAL_FILE_A_GEPP;

export type PlifalFileAPlifal = Plifal<[PlifalFileAGepp], PlifalFileAOdeshin>;

export const buildPlifalFileA = buildCortmumHamletive<
  [TypeScriptFileBPlifal, PlifalFileConfigurationPlifal],
  [PlifalFileAPlifal],
  string
>({
  inputGeppTuple: [TYPE_SCRIPT_FILE_B_GEPP, PLIFAL_FILE_CONFIGURATION_GEPP],
  croard: (input) => input.hubblepup.grition.filePath,
  tropoig: (inputTypeScriptFile) => {
    const output: PlifalFileAPlifal = {
      geppTuple: [PLIFAL_FILE_A_GEPP],
      hubblepup: {
        identifier: `plifal-file-a:${inputTypeScriptFile.hubblepup.grition.filePath}`,
        grition: inputTypeScriptFile.hubblepup.grition,
      },
    };

    return [output];
  },
});
