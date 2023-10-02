import { ImportConfiguration, ScaffoldeeFileMetadata } from './types';

const IMPORT_CONFIGURATION_LIST: ImportConfiguration[] = [
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2.ts',
    identifierList: ['InMemoryOdeshin2ListVoque'],
  },
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/package-agnostic-utilities/constructor-function/buildNamedConstructorFunction.ts',
    identifierList: ['buildNamedConstructorFunction'],
  },
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/package-agnostic-utilities/datastructure/zorn.ts',
    identifierList: ['GenericZorn2Template', 'Zorn2'],
  },
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/package-agnostic-utilities/type/simplify.ts',
    identifierList: ['SimplifyN'],
  },
];

/**
 * Constructs the boilerplate text for a hubblepup file
 */
export const getHubblepupFileContents = ({
  getImportStatement,
  pascalCaseName,
  kebabCaseName,
  screamingSnakeCaseName,
}: ScaffoldeeFileMetadata): string => {
  const serializedImportLines =
    IMPORT_CONFIGURATION_LIST.map(getImportStatement).join('\n');

  const zornTemplateCodeName = `${screamingSnakeCaseName}_ZORN_TEMPLATE`;
  const zornTemplateTypeName = `${pascalCaseName}ZornTemplate`;
  const zornTemplateClassName = `${pascalCaseName}Zorn`;
  const constructorInputTypeName = `${pascalCaseName}ConstructorInput`;
  const hubblepupTypeName = pascalCaseName;
  const constructorCodeName = `${hubblepupTypeName}Instance`;
  const geppCodeName = `${screamingSnakeCaseName}_GEPP`;
  const geppLiteral = kebabCaseName;
  const geppTypeName = `${hubblepupTypeName}Gepp`;
  const voqueTypeName = `${hubblepupTypeName}Voque`;

  const fileContents = `
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

type ${hubblepupTypeName} = SimplifyN<[
  { zorn: ${zornTemplateClassName} },
  ${constructorInputTypeName},
  {
    // TODO: UPDATE_ME
  }
]>

export const { ${constructorCodeName} } = buildNamedConstructorFunction({
  constructorName: '${constructorCodeName}' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
  ] as const satisfies readonly (keyof ${hubblepupTypeName})[],
})
  .withTypes<${constructorInputTypeName}, ${hubblepupTypeName}>({
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
      } satisfies ${hubblepupTypeName}
    },
  })
  .assemble()

  export const ${geppCodeName} = '${geppLiteral}'

  type ${geppTypeName} = typeof ${geppCodeName}

  export type ${voqueTypeName} = InMemoryOdeshin2ListVoque<${geppTypeName}, ${hubblepupTypeName}>
`;

  return fileContents;
};
