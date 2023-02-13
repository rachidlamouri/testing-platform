import fs from 'fs';
import yaml from 'yaml';
import { OnamaEstinant } from '../../core/estinant';
import { TropoignantTypeName } from '../../core/tropoignant';
import { File } from '../../utilities/file/file';
import { FileExtensionSuffixIdentifier } from '../../utilities/file/fileExtensionSuffixIdentifier';
import { Grition } from '../custom-constructs/grition';
import { Odeshin, ODESHIN_GEPP } from '../custom-constructs/odeshin';
import { Plifal } from '../custom-constructs/plifal';
import { YamlFileAOdeshin, YAML_FILE_A_GEPP } from './yamlFileA';

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

export const yamlFileBEstinant: OnamaEstinant<
  YamlFileAOdeshin,
  YamlFileBPlifalTuple
> = {
  inputGepp: YAML_FILE_A_GEPP,
  tropoignant: {
    typeName: TropoignantTypeName.Onama,
    process: function createYamlFileB(input) {
      const fileContents = fs.readFileSync(input.grition.filePath, 'utf8');

      const parsedContents: unknown = yaml.parse(fileContents);

      const output: YamlFileBPlifal = {
        geppTuple: [ODESHIN_GEPP, YAML_FILE_B_GEPP],
        hubblepup: {
          identifier: `yaml-file-b:${input.grition.filePath}`,
          grition: {
            ...input.grition,
            additionalMetadata: {
              parsedContents,
            },
          },
        },
      };

      return [output];
    },
  },
};
