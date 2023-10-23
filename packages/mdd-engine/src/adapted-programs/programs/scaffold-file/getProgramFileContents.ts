import { ImportConfiguration, ScaffoldeeFileMetadata } from './types';

const IMPORT_CONFIGURATION_LIST: ImportConfiguration[] = [
  {
    filePath: 'packages/mdd-engine/src/adapter/engine/runEngine.ts',
    identifierList: ['runEngine', 'buildCollectionByCollectionId'],
  },
  {
    filePath:
      'packages/mdd-engine/src/layer-agnostic-utilities/collection/inMemoryCollection.ts',
    identifierList: ['InMemoryCollection'],
  },
  {
    filePath:
      'packages/mdd-engine/src/adapted-programs/programmable-units/file/fileSystemObjectEnumeratorConfiguration.ts',
    identifierList: [
      'FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID',
      'ENGINE_PACKAGE_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION',
      'FileSystemObjectEnumeratorConfigurationStreamMetatype',
    ],
  },
  {
    filePath:
      'packages/mdd-engine/src/adapted-programs/programmable-units/error/programError.ts',
    identifierList: ['PROGRAM_ERROR_COLLECTION_ID'],
  },
  {
    filePath:
      'packages/mdd-engine/src/adapted-programs/programmable-units/error/programErrorCollection.ts',
    identifierList: ['ProgramErrorCollection'],
  },
  {
    filePath:
      'packages/mdd-engine/src/adapted-programs/programmable-units/file/enumerateFileSystemObjects.ts',
    identifierList: ['enumerateFileSystemObjects'],
  },
  {
    filePath:
      'packages/mdd-engine/src/adapted-programs/programmable-units/file/categorizeFiles.ts',
    identifierList: ['categorizeFiles'],
  },
  {
    filePath:
      'packages/mdd-engine/src/adapted-programs/programmable-units/error/reportErrors.ts',
    identifierList: ['reportErrors'],
  },
  {
    filePath:
      'packages/mdd-engine/src/adapted-programs/programmable-units/error/reportErrorCount.ts',
    identifierList: ['reportErrorCount'],
  },
  {
    filePath:
      'packages/mdd-engine/src/adapted-programs/programmable-units/error/signalError.ts',
    identifierList: ['signalError'],
  },
  {
    filePath:
      'packages/mdd-engine/src/layer-agnostic-utilities/program/programFileCache.ts',
    identifierList: ['ProgramFileCache'],
  },
  {
    filePath:
      'packages/mdd-engine/src/adapted-programs/programs/categorize-files/assertFileExtensionIsKnown.ts',
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
runEngine({
  explicitCollectionTuple: [
    new InMemoryCollection<FileSystemObjectEnumeratorConfigurationStreamMetatype>({
      collectionId: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
      initialItemEggTuple: [
        ENGINE_PACKAGE_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
      ],
    }),
  ] as const,
  uninferableCollectionByCollectionId: buildCollectionByCollectionId([
    ...buildDefaultFileCollectionTuple(),
    new ProgramErrorCollection({
      programFileCache,
    }),
  ] as const),
  errorCollectionId: PROGRAM_ERROR_COLLECTION_ID,
  programmedTransformTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    assertFileExtensionIsKnown,

    reportErrors,
    reportErrorCount,
    signalError,
  ] as const,
  serializeeCollectionIdList: [
    // keep this as a multi-line list for easier debugging
  ],
  programFileCache,
});
`;

  return fileContents;
};
