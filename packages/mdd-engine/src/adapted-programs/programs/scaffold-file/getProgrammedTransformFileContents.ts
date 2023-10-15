import { ImportConfiguration, ScaffoldeeFileMetadata } from './types';

const IMPORT_CONFIGURATION_LIST: ImportConfiguration[] = [
  {
    filePath:
      'packages/mdd-engine/src/adapter/programmed-transform-builder/buildProgrammedTransform.ts',
    identifierList: ['buildProgrammedTransform'],
  },
  {
    filePath:
      'packages/mdd-engine/src/core/types/stream-metatype/streamMetatype.ts',
    identifierList: ['UnsafeStreamMetatype'],
  },
];

/**
 * Constructs the boilerplate text for an estinant file
 *
 * @readableName getProgrammedTransformFileContents
 */
export const getProgrammedTransformFileContents = ({
  getImportStatement,
  camelCaseName,
}: ScaffoldeeFileMetadata): string => {
  const serializedImportLines =
    IMPORT_CONFIGURATION_LIST.map(getImportStatement).join('\n');

  const programmedTransformCodeName = camelCaseName;

  const fileContents = `
${serializedImportLines}

export const ${programmedTransformCodeName} = buildEstinant({
  name: '${programmedTransformCodeName}',
})
  .fromHubblepup2<UnsafeVoque>({
    gepp: ''
  })
  .toHubblepup2<UnsafeVoque>({
    gepp: ''
  })
  .onPinbe((RENAME_ME) => {
    // TODO: implement me
  })
  .assemble();
  `;

  return fileContents;
};
