import { Grition } from '../../../custom-adapter/grition';
import { Odeshin } from '../../../custom-adapter/odeshin';
import { Plifal } from '../../../custom-adapter/plifal';

export type PlifalFileConfiguration = {
  filePath: string;
};

export type PlifalFileConfigurationGrition = Grition<PlifalFileConfiguration>;

export type PlifalFileConfigurationIdentifier =
  `plifal-file-configuration:${string}`;

export type PlifalFileConfigurationOdeshin = Odeshin<
  PlifalFileConfigurationIdentifier,
  PlifalFileConfigurationGrition
>;

export const PLIFAL_FILE_CONFIGURATION_GEPP = Symbol(
  'plifal-file-configuration',
);

export type PlifalFileConfigurationGepp = typeof PLIFAL_FILE_CONFIGURATION_GEPP;

export type PlifalFileConfigurationPlifal = Plifal<
  [PlifalFileConfigurationGepp],
  PlifalFileConfigurationOdeshin
>;

export const createPlifalFileConfigurationPlifal = (
  filePath: string,
): PlifalFileConfigurationPlifal => ({
  geppTuple: [PLIFAL_FILE_CONFIGURATION_GEPP],
  hubblepup: {
    identifier: `plifal-file-configuration:${filePath}`,
    grition: {
      filePath,
    },
  },
});
