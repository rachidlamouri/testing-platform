import { ImportConfiguration, ScaffoldeeFileMetadata } from './types';

const IMPORT_CONFIGURATION_LIST: ImportConfiguration[] = [
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2.ts',
    identifierList: ['InMemoryOdeshin2ListVoque'],
  },
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/package-agnostic-utilities/constructor-function/buildNamedConstructorFunction.ts',
    identifierList: ['buildNamedConstructorFunction'],
  },
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/package-agnostic-utilities/data-structure/id.ts',
    identifierList: ['GenericComplexIdTemplate', 'ComplexId'],
  },
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/package-agnostic-utilities/type/simplify.ts',
    identifierList: ['SimplifyN'],
  },
];

/**
 * Constructs the boilerplate text for a hubblepup file
 *
 * @readableName getStreamableFileContents
 */
export const getItemFileContents = ({
  getImportStatement,
  pascalCaseName,
  kebabCaseName,
  screamingSnakeCaseName,
}: ScaffoldeeFileMetadata): string => {
  const serializedImportLines =
    IMPORT_CONFIGURATION_LIST.map(getImportStatement).join('\n');

  const idTemplateCodeName = `${screamingSnakeCaseName}_ZORN_TEMPLATE`;
  const idTemplateTypeName = `${pascalCaseName}ZornTemplate`;
  const idTemplateClassName = `${pascalCaseName}Zorn`;
  const constructorInputTypeName = `${pascalCaseName}ConstructorInput`;
  const itemTypeName = pascalCaseName;
  const constructorCodeName = `${itemTypeName}Instance`;
  const collectionIdCodeName = `${screamingSnakeCaseName}_GEPP`;
  const collectionIdLiteral = kebabCaseName;
  const collectionIdTypeName = `${itemTypeName}Gepp`;
  const streamMetatypeTypeName = `${itemTypeName}Voque`;

  const fileContents = `
${serializedImportLines}

const ${idTemplateCodeName} = [
  'UPDATE_ME'
] as const satisfies GenericComplexIdTemplate
type ${idTemplateTypeName} = typeof ${idTemplateCodeName}
class ${idTemplateClassName} extends ComplexId<${idTemplateTypeName}> {
  get rawTemplate(): ${idTemplateTypeName} {
    return ${idTemplateCodeName}
  }
}

type ${constructorInputTypeName} = {
  placeholderInputProperty: never;
}

type ${itemTypeName} = SimplifyN<[
  { id: ${idTemplateClassName} },
  ${constructorInputTypeName},
  {
    // TODO: UPDATE_ME
  }
]>

export const { ${constructorCodeName} } = buildNamedConstructorFunction({
  constructorName: '${constructorCodeName}' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'id',
    'placeholderInputProperty',
  ] as const satisfies readonly (keyof ${itemTypeName})[],
})
  .withTypes<${constructorInputTypeName}, ${itemTypeName}>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { placeholderInputProperty } = input;

      const id = new ${idTemplateClassName}({
        UPDATE_ME: placeholderInputProperty,
      });

      return {
        id,
        ...input,
      } satisfies ${itemTypeName}
    },
  })
  .assemble()

  export const ${collectionIdCodeName} = '${collectionIdLiteral}'

  type ${collectionIdTypeName} = typeof ${collectionIdCodeName}

  export type ${streamMetatypeTypeName} = InMemoryOdeshin2ListVoque<${collectionIdTypeName}, ${itemTypeName}>
`;

  return fileContents;
};
