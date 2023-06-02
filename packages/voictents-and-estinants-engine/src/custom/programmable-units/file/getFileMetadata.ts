import { posix } from 'path';

const getCamelCaseNameParts = (camelCaseName: string): string[] => {
  const letters = camelCaseName.split('');

  const segmentIndicies: number[] = [0];
  letters.forEach((letter, index) => {
    const isUpperCase = letter === letter.toUpperCase();
    if (isUpperCase) {
      segmentIndicies.push(index);
    }
  });
  segmentIndicies.push(letters.length);

  const thingyPairs = segmentIndicies
    .slice(0, segmentIndicies.length - 1)
    .map((someIndex, someIndiciesIndex): [number, number] => {
      return [someIndex, segmentIndicies[someIndiciesIndex + 1]];
    });

  const stuff = thingyPairs.map(([start, end]) =>
    letters.slice(start, end).join(''),
  );

  const normalizedStuff = stuff.map((x) => x.toLowerCase());

  return normalizedStuff;
};

type FileMetadata = {
  filePath: string;
  parentDirectoryNameParts: string[];
  onDiskFileNameParts: string[];
  inMemoryFileNameParts: string[];
  extensionParts: string[];
  extensionSuffix: string;
};

// TODO: update this so we don't have to assume that files are in camel case and directories are in kebab case
export const getFileMetadata = (filePath: string): FileMetadata => {
  const { dir: parentDirectoryNodePath, base: legalFileName } =
    posix.parse(filePath);

  const parentDirectoryPathParts = parentDirectoryNodePath.split('/');
  const parentDirectoryName =
    parentDirectoryPathParts[parentDirectoryPathParts.length - 1];
  const parentDirectoryNameParts = parentDirectoryName
    .split('-')
    .map((x) => x.toLowerCase());

  const [onDiskFileName, ...fileExtensionParts] = legalFileName.split('.');
  const normalizedFileExtensionParts = fileExtensionParts.map((x) =>
    x.toLowerCase(),
  );
  const fileExtensionSuffix: string =
    fileExtensionParts[fileExtensionParts.length - 1];

  const onDiskFileNameParts = getCamelCaseNameParts(onDiskFileName);

  const isIndexFile = onDiskFileName === 'index';
  const inMemoryFileNameParts = isIndexFile
    ? parentDirectoryNameParts
    : onDiskFileNameParts;

  return {
    filePath,
    parentDirectoryNameParts,
    onDiskFileNameParts,
    inMemoryFileNameParts,
    extensionParts: normalizedFileExtensionParts,
    extensionSuffix: fileExtensionSuffix,
  } satisfies FileMetadata;
};
