import fs from 'fs';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { getFileMetadata } from '../../programmable-units/file/getFileMetadata';
import {
  SCAFFOLD_CONFIGURATION_GEPP,
  ScaffoldConfigurationVoque,
} from './scaffoldConfiguration';

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
    const metadata = getFileMetadata(scaffoldConfiguration.filePath);

    const pascalCaseName = partsToPascal(metadata.inMemoryFileNameParts);
    const kebabCaseName = partsToKebab(metadata.inMemoryFileNameParts);
    const screamingSnakeCaseName = partsToScreamingSnake(
      metadata.inMemoryFileNameParts,
    );

    const currentContents = fs.readFileSync(
      scaffoldConfiguration.filePath,
      'utf8',
    );

    const customTypeName = pascalCaseName;
    const geppCodeName = `${screamingSnakeCaseName}_GEPP`;
    const geppLiteral = kebabCaseName;
    const geppTypeName = `${customTypeName}Gepp`;
    const voictentTypeName = `${customTypeName}Voictent`;
    const voqueTypeName = `${customTypeName}Voque`;

    const prependedContent = [
      `export type ${customTypeName} = {`,
      '  zorn: string;',
      '}',
      '',
      `export const ${geppCodeName} = '${geppLiteral}'`,
      '',
      `export type ${geppTypeName} = typeof ${geppCodeName}`,
      '',
      `export type ${voictentTypeName} = Voictent<${geppTypeName}, ${customTypeName}>`,
      '',
      `export type ${voqueTypeName} = InMemoryOdeshin2Voque<${geppTypeName}, ${customTypeName}>`,
      '',
    ].join('\n');

    const outputContents = `${prependedContent}${currentContents}`;

    fs.writeFileSync(scaffoldConfiguration.filePath, outputContents);
  })
  .assemble();
