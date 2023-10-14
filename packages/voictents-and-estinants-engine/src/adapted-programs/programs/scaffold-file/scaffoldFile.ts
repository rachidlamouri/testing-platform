import fs from 'fs';
import { posix } from 'path';
import Case from 'case';
import { buildProgrammedTransform } from '../../../adapter/estinant-builder/buildEstinant';
import {
  FileTypeName,
  SCAFFOLD_CONFIGURATION_GEPP,
  ScaffoldConfigurationVoque,
} from './scaffoldConfiguration';
import { ImportConfiguration, ScaffoldeeFileMetadata } from './types';
import { getHubblepupFileContents } from './getHubblepupFileContents';
import { getEstinantFileContents } from './getEstinantFileContents';
import { FILE_GEPP, FileVoque } from '../../programmable-units/file/file';
import { getProgramFileContents } from './getProgramFileContents';

/**
 * Populates export declarations for a collection and all related types. It uses
 * the file name to derive the reference names/
 */
export const scaffoldFile = buildProgrammedTransform({
  name: 'scaffoldFile',
})
  .fromItem2<ScaffoldConfigurationVoque>({
    collectionId: SCAFFOLD_CONFIGURATION_GEPP,
  })
  .andFromItemTuple2<FileVoque, [string]>({
    collectionId: FILE_GEPP,
    getRightKeyTuple: (configuration) => {
      return [configuration.item.filePath];
    },
    getRightKey: (file) => {
      return file.item.filePath.serialized;
    },
  })
  .onTransform((scaffoldConfiguration, [file]) => {
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
        case FileTypeName.ProgrammedTransform:
        case FileTypeName.Estinant:
          return getEstinantFileContents(relevantFileMetadata);
        case FileTypeName.Streamable:
        case FileTypeName.Hubblepup:
          return getHubblepupFileContents(relevantFileMetadata);
        case FileTypeName.Program:
          return getProgramFileContents(relevantFileMetadata);
      }
    })();

    const outputContents = `${prependedContent}\n${currentContents}`;

    fs.writeFileSync(scaffoldConfiguration.filePath, outputContents);

    // eslint-disable-next-line no-console
    console.log('PREPENDED:', scaffoldConfiguration.filePath);
  })
  .assemble();
