import { ImportConfiguration, ScaffoldeeFileMetadata } from './types';

const IMPORT_CONFIGURATION_LIST: ImportConfiguration[] = [
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/adapter/estinant-builder/estinantBuilder.ts',
    identifierList: ['buildEstinant'],
  },
];

export const getEstinantFileContents = ({
  getImportStatement,
  camelCaseName,
}: ScaffoldeeFileMetadata): string => {
  const serializedImportLines =
    IMPORT_CONFIGURATION_LIST.map(getImportStatement).join('\n');

  const estinantCodeName = camelCaseName;

  const fileContents = `
${serializedImportLines}

const UPDATE_ME_INPUT_GEPP: any = 'UPDATE_ME';
type UpdateMeInputVoque = any;

const UPDATE_ME_OUTPUT_GEPP: any = 'UPDATE_ME_TOO';
type UpdateMeOutputVoque = any;

export const ${estinantCodeName} = buildEstinant({
  name: '${estinantCodeName}',
})
  .fromHubblepup2<UpdateMeInputVoque>({
    gepp: UPDATE_ME_INPUT_GEPP
  })
  .toHubblepup2<UpdateMeOutputVoque>({
    gepp: UPDATE_ME_OUTPUT_GEPP
  })
  .onPinbe((RENAME_ME) => {
    // TODO: implement me
  })
  .assemble();
  `;

  return fileContents;
};
