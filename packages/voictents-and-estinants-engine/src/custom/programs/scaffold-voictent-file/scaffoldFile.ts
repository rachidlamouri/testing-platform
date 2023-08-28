import fs from 'fs';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { getFileMetadata } from '../../programmable-units/file/getFileMetadata';
import {
  SCAFFOLD_CONFIGURATION_GEPP,
  ScaffoldConfigurationVoque,
} from './scaffoldConfiguration';

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
    const metadata = getFileMetadata(scaffoldConfiguration.filePath);

    const camelCaseName = partsToCamel(metadata.inMemoryFileNameParts);
    const pascalCaseName = partsToPascal(metadata.inMemoryFileNameParts);
    const kebabCaseName = partsToKebab(metadata.inMemoryFileNameParts);
    const screamingSnakeCaseName = partsToScreamingSnake(
      metadata.inMemoryFileNameParts,
    );

    const currentContents = fs.readFileSync(
      scaffoldConfiguration.filePath,
      'utf8',
    );

    const zornTemplateCodeName = `${screamingSnakeCaseName}_ZORN_TEMPLATE`;
    const zornTemplateTypeName = `${pascalCaseName}ZornTemplate`;
    const zornTemplateClassName = `${pascalCaseName}Zorn`;
    const hubblepupBaseTypeName = `Base${pascalCaseName}`;
    const hubblepupPrototypeTypeName = `${pascalCaseName}Prototype`;
    const hubblepupTypename = pascalCaseName;
    const constructorCodeName = `${hubblepupTypename}Instance`;
    const getterInstanceCodeName = camelCaseName;
    const geppCodeName = `${screamingSnakeCaseName}_GEPP`;
    const geppLiteral = kebabCaseName;
    const geppTypeName = `${hubblepupTypename}Gepp`;
    const voqueTypeName = `${hubblepupTypename}Voque`;

    const prependedContent = [
      `const ${zornTemplateCodeName} = [`,
      '  // TODO: add keys',
      '] as const satisfies GenericZorn2Template',
      `type ${zornTemplateTypeName} = typeof ${zornTemplateCodeName}`,
      `class ${zornTemplateClassName} extends Zorn2<${zornTemplateTypeName}> {`,
      `  get rawTemplate(): ${zornTemplateTypeName} {`,
      `    return ${zornTemplateCodeName}`,
      '  }',
      '}',
      '',
      `type ${hubblepupBaseTypeName} = {`,
      '  // TODO: add properties',
      '}',
      '',
      `type ${hubblepupPrototypeTypeName} = {`,
      `  get zorn(): ${zornTemplateClassName}`,
      '}',
      '',
      `type ${hubblepupTypename} = ObjectWithPrototype<${hubblepupBaseTypeName}, ${hubblepupPrototypeTypeName}>`,
      '',
      `export const { ${constructorCodeName} } = buildConstructorFunctionWithName('${constructorCodeName}')<${hubblepupBaseTypeName}, ${hubblepupPrototypeTypeName}, ${hubblepupTypename}>({`,
      `  zorn: memoizeGetter((${getterInstanceCodeName}) => {`,
      `    return new ${zornTemplateClassName}({`,
      '      // TODO: add key/value pairs',
      `    })`,
      `  }),`,
      '})',
      '',
      `export const ${geppCodeName} = '${geppLiteral}'`,
      '',
      `type ${geppTypeName} = typeof ${geppCodeName}`,
      '',
      `export type ${voqueTypeName} = InMemoryOdeshin2Voque<${geppTypeName}, ${hubblepupTypename}>`,
      '',
    ].join('\n');

    const outputContents = `${prependedContent}${currentContents}`;

    fs.writeFileSync(scaffoldConfiguration.filePath, outputContents);
  })
  .assemble();
