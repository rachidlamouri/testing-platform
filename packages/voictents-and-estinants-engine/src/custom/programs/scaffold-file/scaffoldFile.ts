import fs from 'fs';
import { posix } from 'path';
import Case from 'case';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  FileTypeName,
  SCAFFOLD_CONFIGURATION_GEPP,
  ScaffoldConfigurationVoque,
} from './scaffoldConfiguration';
import { ImportConfiguration, ScaffoldeeFileMetadata } from './types';
import { getHubblepupFileContents } from './getHubblepupFileContents';
import { getEstinantFileContents } from './getEstinantFileContents';
import { FILE_GEPP, FileVoque } from '../../programmable-units/file/file';

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
  .andFromHubblepupTuple2<FileVoque, [string]>({
    gepp: FILE_GEPP,
    framate: (configuration) => {
      return [configuration.hubblepup.filePath];
    },
    croard: (file) => {
      return file.hubblepup.filePath.serialized;
    },
  })
  .onPinbe((scaffoldConfiguration, [file]) => {
    const currentContents = fs.readFileSync(
      scaffoldConfiguration.filePath,
      'utf8',
    );

    const relevantFileMetadata: ScaffoldeeFileMetadata = {
      getImportStatement: (importConfiguration: ImportConfiguration) => {
        const identifierText = importConfiguration.identifierList.join(', ');
        const relativePath = posix.relative(
          file.nodePath.parentDirectoryPath,
          importConfiguration.filePath,
        );

        const extensionlessRelativePath = relativePath.replace(/\.[^.]+$/, '');

        return `import { ${identifierText} } from '${extensionlessRelativePath}'`;
      },
      camelCaseName: Case.camel(file.nodePath.name.extensionless),
      pascalCaseName: Case.pascal(file.nodePath.name.extensionless),
      kebabCaseName: Case.kebab(file.nodePath.name.extensionless),
      screamingSnakeCaseName: Case.constant(file.nodePath.name.extensionless),
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
