import fs from 'fs';
import { posix } from 'path';
import Case from 'case';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  FileTypeName,
  SCAFFOLD_CONFIGURATION_COLLECTION_ID,
  ScaffoldConfigurationStreamMetatype,
} from './scaffoldConfiguration';
import { ImportConfiguration, ScaffoldeeFileMetadata } from './types';
import { getItemFileContents } from './getItemFileContents';
import { getProgrammedTransformFileContents } from './getProgrammedTransformFileContents';
import {
  FILE_COLLECTION_ID,
  FileStreamMetatype,
} from '../../programmable-units/file/file';
import { getProgramFileContents } from './getProgramFileContents';

/**
 * Populates export declarations for a collection and all related types. It uses
 * the file name to derive the reference names/
 */
export const scaffoldFile = buildProgrammedTransform({
  name: 'scaffoldFile',
})
  .fromItem2<ScaffoldConfigurationStreamMetatype>({
    collectionId: SCAFFOLD_CONFIGURATION_COLLECTION_ID,
  })
  .andFromItemTuple2<FileStreamMetatype, [string]>({
    collectionId: FILE_COLLECTION_ID,
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
          return getProgrammedTransformFileContents(relevantFileMetadata);
        case FileTypeName.Item:
          return getItemFileContents(relevantFileMetadata);
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
