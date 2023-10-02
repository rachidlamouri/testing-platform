import { ImportConfiguration, ScaffoldeeFileMetadata } from './types';

const IMPORT_CONFIGURATION_LIST: ImportConfiguration[] = [
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/adapter/engine/digikikify.ts',
    identifierList: ['digikikify', 'buildVoictentByGepp'],
  },
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/core/engine/inMemoryVoictent.ts',
    identifierList: ['InMemoryVoictent'],
  },
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/file/fileSystemObjectEnumeratorConfiguration.ts',
    identifierList: [
      'FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP',
      'VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION',
      'FileSystemObjectEnumeratorConfigurationVoque',
    ],
  },
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/file/defaultFileGeppCombination.ts',
    identifierList: ['defaultFileGeppCombination'],
  },
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/error/programError.ts',
    identifierList: ['PROGRAM_ERROR_GEPP'],
  },
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/error/programErrorVoictent.ts',
    identifierList: ['ProgramErrorVoictent'],
  },
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/file/enumerateFileSystemObjects.ts',
    identifierList: ['enumerateFileSystemObjects'],
  },
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/file/categorizeFiles.ts',
    identifierList: ['categorizeFiles'],
  },
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/error/reportErrors.ts',
    identifierList: ['reportErrors'],
  },
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/error/reportErrorCount.ts',
    identifierList: ['reportErrorCount'],
  },
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/error/signalError.ts',
    identifierList: ['signalError'],
  },
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/layer-agnostic-utilities/program/programFileCache.ts',
    identifierList: ['ProgramFileCache'],
  },
  {
    filePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programs/categorize-files/assertFileExtensionIsKnown.ts',
    identifierList: ['assertFileExtensionIsKnown'],
  },
];

/**
 * Constructs the boilerplate text for an engine program file
 */
export const getProgramFileContents = ({
  getImportStatement,
  kebabCaseName,
}: ScaffoldeeFileMetadata): string => {
  const serializedImportLines =
    IMPORT_CONFIGURATION_LIST.map(getImportStatement).join('\n');

  const namespaceCodeName = kebabCaseName;

  const fileContents = `
${serializedImportLines}

const programFileCache = new ProgramFileCache({
  namespace: '${namespaceCodeName}',
});

/**
 *
 */
digikikify({
  explicitVoictentTuple: [
    new InMemoryVoictent<FileSystemObjectEnumeratorConfigurationVoque>({
      gepp: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
      initialHubblepupPelueTuple: [
        VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
      ],
    }),
  ] as const,
  fileSystemNodeGeppCombination: defaultFileGeppCombination,
  uninferableVoictentByGepp: buildVoictentByGepp([
    new ProgramErrorVoictent({
      programFileCache,
    }),
  ] as const),
  errorGepp: PROGRAM_ERROR_GEPP,
  estinantTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    assertFileExtensionIsKnown,

    reportErrors,
    reportErrorCount,
    signalError,
  ] as const,
  serializeeGeppList: [
    // keep this as a multi-line list for easier debugging
  ],
  programFileCache,
});
`;

  return fileContents;
};
