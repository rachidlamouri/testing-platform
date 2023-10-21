import { ImportConfiguration, ScaffoldeeFileMetadata } from './types';

const IMPORT_CONFIGURATION_LIST: ImportConfiguration[] = [
  {
    filePath:
      'packages/mdd-engine/src/layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2.ts',
    identifierList: ['InMemoryIdentifiableItem3StreamMetatype'],
  },
  {
    filePath:
      'packages/mdd-engine/src/package-agnostic-utilities/constructor-function/buildNamedConstructorFunction.ts',
    identifierList: ['buildNamedConstructorFunction'],
  },
  {
    filePath:
      'packages/mdd-engine/src/package-agnostic-utilities/data-structure/id.ts',
    identifierList: ['GenericComplexIdTemplate', 'ComplexId'],
  },
  {
    filePath:
      'packages/mdd-engine/src/package-agnostic-utilities/type/simplify.ts',
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

  const idTemplateCodeName = `${screamingSnakeCaseName}_ID_TEMPLATE`;
  const idTemplateTypeName = `${pascalCaseName}IdTemplate`;
  const idTemplateClassName = `${pascalCaseName}Id`;
  const constructorInputTypeName = `${pascalCaseName}Input`;
  const itemTypeName = pascalCaseName;
  const collectionIdCodeName = `${screamingSnakeCaseName}_COLLECTION_ID`;
  const collectionIdLiteral = kebabCaseName;
  const collectionIdTypeName = `${itemTypeName}CollectionId`;
  const streamMetatypeTypeName = `${itemTypeName}StreamMetatype`;

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
  // TODO: define constructor input
}

export class ${itemTypeName} implements ${constructorInputTypeName} {
  id: ${idTemplateClassName}

  constructor(input: ${constructorInputTypeName}) {
    // TODO: define class

    this.id = new ${idTemplateClassName}({
      // TODO: define id
    })
  }
}

  export const ${collectionIdCodeName} = '${collectionIdLiteral}'

  type ${collectionIdTypeName} = typeof ${collectionIdCodeName}

  export type ${streamMetatypeTypeName} = InMemoryIdentifiableItem3StreamMetatype<${collectionIdTypeName}, ${itemTypeName}>
`;

  return fileContents;
};
