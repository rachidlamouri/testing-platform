import fs from 'fs';
import { posix } from 'path';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { getFileMetadata } from '../../programmable-units/file/getFileMetadata';
import {
  SCAFFOLD_CONFIGURATION_GEPP,
  ScaffoldConfigurationVoque,
} from './scaffoldConfiguration';

type ImportConfiguration = {
  filePath: string;
  identifierList: string[];
};

const IMPORT_CONFIGURATION_LIST: ImportConfiguration[] = [
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/core/engine/inMemoryOdeshinVoictent2.ts',
    identifierList: ['InMemoryOdeshin2ListVoque'],
  },
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/utilities/constructor-function/namedConstructorFunctionBuilder.ts',
    identifierList: ['buildNamedConstructorFunction'],
  },
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/utilities/semantic-types/zorn.ts',
    identifierList: ['GenericZorn2Template', 'Zorn2'],
  },
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/utilities/simplify.ts',
    identifierList: ['Simplify'],
  },
];

// TODO: replace these in-file functions with a utility. They probably have duplicate definitions elsewhere
// const partsToCamel = (x: string[]): string => {
//   return x
//     .map((word, index) => {
//       if (index === 0) {
//         return word;
//       }

//       return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
//     })
//     .join('');
// };

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

    const serializedImportLines = IMPORT_CONFIGURATION_LIST.map(
      ({ filePath: importedFilePath, identifierList }) => {
        const identifierText = identifierList.join(', ');
        const relativePath = posix.relative(
          posix.dirname(scaffoldConfiguration.filePath),
          importedFilePath,
        );

        const extensionlessRelativePath = relativePath.replace(/\.[^.]+$/, '');

        return `import { ${identifierText} } from '${extensionlessRelativePath}'`;
      },
    ).join('\n');

    const zornTemplateCodeName = `${screamingSnakeCaseName}_ZORN_TEMPLATE`;
    const zornTemplateTypeName = `${pascalCaseName}ZornTemplate`;
    const zornTemplateClassName = `${pascalCaseName}Zorn`;
    const constructorInputTypeName = `${pascalCaseName}ConstructorInput`;
    const hubblepupTypename = pascalCaseName;
    const constructorCodeName = `${hubblepupTypename}Instance`;
    const geppCodeName = `${screamingSnakeCaseName}_GEPP`;
    const geppLiteral = kebabCaseName;
    const geppTypeName = `${hubblepupTypename}Gepp`;
    const voqueTypeName = `${hubblepupTypename}Voque`;

    const prependedContent = `
  ${serializedImportLines}

  const ${zornTemplateCodeName} = [
    'UPDATE_ME'
  ] as const satisfies GenericZorn2Template
  type ${zornTemplateTypeName} = typeof ${zornTemplateCodeName}
  class ${zornTemplateClassName} extends Zorn2<${zornTemplateTypeName}> {
    get rawTemplate(): ${zornTemplateTypeName} {
      return ${zornTemplateCodeName}
    }
  }

  type ${constructorInputTypeName} = {
    UPDATE_ME: any;
  }

  type ${hubblepupTypename} = Simplify<
    ${constructorInputTypeName},
    {
      zorn: ${zornTemplateClassName}
    }
  >

  export const { ${constructorCodeName} } = buildNamedConstructorFunction({
    constructorName: '${constructorCodeName}',
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'zorn',
    ],
  } as const)
    .withTypes<${constructorInputTypeName}, ${hubblepupTypename}>({
      typeCheckErrorMesssages: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { UPDATE_ME } = input;

        const zorn = new ${zornTemplateClassName}({
          UPDATE_ME: UPDATE_ME,
        });

        return {
          zorn,
          ...input,
        }
      },
    })
    .assemble()

    export const ${geppCodeName} = '${geppLiteral}'

    type ${geppTypeName} = typeof ${geppCodeName}

    export type ${voqueTypeName} = InMemoryOdeshin2ListVoque<${geppTypeName}, ${hubblepupTypename}>
`;

    const outputContents = `${prependedContent}${currentContents}`;

    fs.writeFileSync(scaffoldConfiguration.filePath, outputContents);
  })
  .assemble();
