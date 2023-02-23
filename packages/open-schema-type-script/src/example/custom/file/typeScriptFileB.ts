import { TSESTree } from '@typescript-eslint/typescript-estree';
import * as parser from '@typescript-eslint/typescript-estree';
import { posix } from 'path';
import fs from 'fs';
import { File } from '../../../utilities/file/file';
import { FileExtensionSuffixIdentifier } from '../../../utilities/file/fileExtensionSuffixIdentifier';
import { Grition } from '../../../custom-adapter/grition';
import { Odeshin } from '../../../custom-adapter/odeshin';
import { Plifal } from '../../../custom-adapter/plifal';
import {
  TypeScriptFileAPlifal,
  TYPE_SCRIPT_FILE_A_GEPP,
} from './typeScriptFileA';
import {
  Ankeler,
  buildOnamaHamletive,
} from '../../../type-script-adapter/hamletive/onama';

export type TypeScriptFileB = Grition<
  File<
    FileExtensionSuffixIdentifier.TypeScript,
    {
      program: TSESTree.Program;
      configFilePath: string;
      tsconfigRootDir: string;
    }
  >
>;

export type TypeScriptFileBIdentifier = `type-script-file-b:${string}`;

export type TypeScriptFileBOdeshin = Odeshin<
  TypeScriptFileBIdentifier,
  TypeScriptFileB
>;

export const TYPE_SCRIPT_FILE_B_GEPP = Symbol('type-script-file-b');

export type TypeScriptFileBGepp = typeof TYPE_SCRIPT_FILE_B_GEPP;

export type TypeScriptFileBPlifal = Plifal<
  [TypeScriptFileBGepp],
  TypeScriptFileBOdeshin
>;

export type TypeScriptFileBPlifalTuple = readonly TypeScriptFileBPlifal[];

const getConfigFilePath = (filePath: string): string => {
  let configFilePath: string | null = null;

  let nextPath = filePath;
  while (configFilePath === null && nextPath !== '.') {
    nextPath = posix.dirname(nextPath);

    const files = fs.readdirSync(nextPath);
    configFilePath = files.find((x) => x === 'tsconfig.json') ?? null;
    if (configFilePath !== null) {
      configFilePath = posix.join(nextPath, configFilePath);
    }
  }

  if (configFilePath === null) {
    throw Error('No config found');
  }

  return configFilePath;
};

const createTypeScriptFileB: Ankeler<
  TypeScriptFileAPlifal,
  TypeScriptFileBPlifal
> = (input) => {
  const fileContents = fs.readFileSync(
    input.hubblepup.grition.filePath,
    'utf8',
  );

  const typeScriptConfigurationFilePath = getConfigFilePath(
    input.hubblepup.grition.filePath,
  );
  const typeScriptConfigurationRootDirectoryPath = posix.dirname(
    typeScriptConfigurationFilePath,
  );

  const program: TSESTree.Program = parser.parse(fileContents, {
    project: './tsconfig.json',
    tsconfigRootDir: typeScriptConfigurationRootDirectoryPath,
    comment: true,
  });

  const output: TypeScriptFileBPlifal = {
    geppTuple: [TYPE_SCRIPT_FILE_B_GEPP],
    hubblepup: {
      identifier: `type-script-file-b:${input.hubblepup.grition.filePath}`,
      grition: {
        ...input.hubblepup.grition,
        additionalMetadata: {
          program,
          tsconfigRootDir: typeScriptConfigurationRootDirectoryPath,
          configFilePath: typeScriptConfigurationFilePath,
        },
      },
    },
  };

  return output;
};

export const typeScriptFileBEstinant = buildOnamaHamletive<
  TypeScriptFileAPlifal,
  TypeScriptFileBPlifal
>({
  inputGepp: TYPE_SCRIPT_FILE_A_GEPP,
  ankel: createTypeScriptFileB,
});
