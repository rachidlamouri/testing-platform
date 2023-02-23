import fs from 'fs';
import yaml from 'yaml';
import { File } from '../../../utilities/file/file';
import { FileExtensionSuffixIdentifier } from '../../../utilities/file/fileExtensionSuffixIdentifier';
import { Grition } from '../../../custom-adapter/grition';
import { Odeshin } from '../../../custom-adapter/odeshin';
import { Plifal } from '../../../custom-adapter/plifal';
import { YamlFileAPlifal, YAML_FILE_A_GEPP } from './yamlFileA';
import { buildOnamaHamletive } from '../../../type-script-adapter/hamletive/onama';

export type YamlFileB<TParsedContents = unknown> = File<
  FileExtensionSuffixIdentifier.Yaml,
  { parsedContents: TParsedContents }
>;

export type YamlFileBGrition = Grition<YamlFileB>;

export type YamlFileBIdentifier = `yaml-file-b:${string}`;

export type YamlFileBOdeshin = Odeshin<YamlFileBIdentifier, YamlFileB>;

export const YAML_FILE_B_GEPP = Symbol('yaml-file-b');

export type YamlFileBGepp = typeof YAML_FILE_B_GEPP;

export type YamlFileBPlifal = Plifal<[YamlFileBGepp], YamlFileBOdeshin>;

export type YamlFileBPlifalTuple = readonly YamlFileBPlifal[];

export const yamlFileBEstinant = buildOnamaHamletive<
  YamlFileAPlifal,
  YamlFileBPlifal
>({
  inputGepp: YAML_FILE_A_GEPP,
  ankel: function createYamlFileB(input: YamlFileAPlifal): YamlFileBPlifal {
    const fileContents = fs.readFileSync(
      input.hubblepup.grition.filePath,
      'utf8',
    );

    const parsedContents: unknown = yaml.parse(fileContents);

    const output: YamlFileBPlifal = {
      geppTuple: [YAML_FILE_B_GEPP],
      hubblepup: {
        identifier: `yaml-file-b:${input.hubblepup.grition.filePath}`,
        grition: {
          ...input.hubblepup.grition,
          additionalMetadata: {
            parsedContents,
          },
        },
      },
    };

    return output;
  },
});
