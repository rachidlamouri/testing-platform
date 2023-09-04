import fs from 'fs';
import { posix } from 'path';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { getFileMetadata } from '../../programmable-units/file/getFileMetadata';
import {
  FileTypeName,
  SCAFFOLD_CONFIGURATION_GEPP,
  ScaffoldConfigurationVoque,
} from './scaffoldConfiguration';
import { ImportConfiguration, ScaffoldeeFileMetadata } from './types';
import { getHubblepupFileContents } from './getHubblepupFileContents';
import { getEstinantFileContents } from './getEstinantFileContents';

const partsToCamel = (x: string[]): string => {
  return x
    .map((word, index) => {
      if (index === 0) {
        return word;
      }

      return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
    })
    .join('');
};

const partsToPascal = (x: string[]): string => {
  return x
    .map((word) => {
      return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
    })
    .join('');
};

const partsToScreamingSnake = (x: string[]): string => {
  return x
    .map((word) => {
      return word.toUpperCase();
    })
    .join('_');
};

const partsToKebab = (x: string[]): string => {
  return x.join('-');
};

/**
 * Populates export declarations for a collection and all related types. It uses
 * the file name to derive the reference names/
 */
export const scaffoldFile = buildEstinant({
  name: 'scaffoldFile',
})
  .fromHubblepup2<ScaffoldConfigurationVoque>({
    gepp: SCAFFOLD_CONFIGURATION_GEPP,
  })
  .onPinbe((scaffoldConfiguration) => {
    const fileMetadata = getFileMetadata(scaffoldConfiguration.filePath);
    const currentContents = fs.readFileSync(
      scaffoldConfiguration.filePath,
      'utf8',
    );
    const directoryPath = posix.dirname(fileMetadata.filePath);

    const relevantFileMetadata: ScaffoldeeFileMetadata = {
      getImportStatement: (importConfiguration: ImportConfiguration) => {
        const identifierText = importConfiguration.identifierList.join(', ');
        const relativePath = posix.relative(
          directoryPath,
          importConfiguration.filePath,
        );

        const extensionlessRelativePath = relativePath.replace(/\.[^.]+$/, '');

        return `import { ${identifierText} } from '${extensionlessRelativePath}'`;
      },
      camelCaseName: partsToCamel(fileMetadata.inMemoryFileNameParts),
      pascalCaseName: partsToPascal(fileMetadata.inMemoryFileNameParts),
      kebabCaseName: partsToKebab(fileMetadata.inMemoryFileNameParts),
      screamingSnakeCaseName: partsToScreamingSnake(
        fileMetadata.inMemoryFileNameParts,
      ),
    };

    const prependedContent = ((): string => {
      switch (scaffoldConfiguration.typeName) {
        case FileTypeName.Estinant:
          return getEstinantFileContents(relevantFileMetadata);
        case FileTypeName.Hubblepup:
          return getHubblepupFileContents(relevantFileMetadata);
      }
    })();

    const outputContents = `${prependedContent}\n${currentContents}`;

    fs.writeFileSync(scaffoldConfiguration.filePath, outputContents);
  })
  .assemble();
