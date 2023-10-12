import { ImportConfiguration, ScaffoldeeFileMetadata } from './types';

const IMPORT_CONFIGURATION_LIST: ImportConfiguration[] = [
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/adapter/estinant-builder/buildEstinant.ts',
    identifierList: ['buildEstinant'],
  },
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/core/types/stream-metatype/streamMetatype.ts',
    identifierList: ['UnsafeStreamMetatype'],
  },
];

/**
 * Constructs the boilerplate text for an estinant file
 *
 * @readableName getProgrammedTransformFileContents
 */
export const getEstinantFileContents = ({
  getImportStatement,
  camelCaseName,
}: ScaffoldeeFileMetadata): string => {
  const serializedImportLines =
    IMPORT_CONFIGURATION_LIST.map(getImportStatement).join('\n');

  const estinantCodeName = camelCaseName;

  const fileContents = `
${serializedImportLines}

export const ${estinantCodeName} = buildEstinant({
  name: '${estinantCodeName}',
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
