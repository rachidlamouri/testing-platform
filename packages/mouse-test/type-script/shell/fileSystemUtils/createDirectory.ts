import fs from 'fs';
import { removeFileSystemObject } from './removeFileSystemObject';

export const USE_CWD = 'USE_CURRENT_WORKING_DIRECTORY' as const;

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export type Root = DirectoryHelper | typeof USE_CWD;

export type DirectoryCreatorParameter<TRoot extends Root> = {
  root: TRoot;
  relativePath: string;
};

export type RootDirectoryHelper = {
  directoryPath: string;
  teardown: () => void;
};

export type NestedDirectoryHelper = {
  directoryPath: string;
};

export type DirectoryHelper = RootDirectoryHelper | NestedDirectoryHelper;

export type DirectoryCreatorResult<TRoot extends Root> =
  TRoot extends typeof USE_CWD ? RootDirectoryHelper : NestedDirectoryHelper;

export const createDirectory = <TRoot extends Root>({
  root,
  relativePath,
}: DirectoryCreatorParameter<TRoot>): DirectoryCreatorResult<TRoot> => {
  const directoryPath =
    root !== USE_CWD ? `${root.directoryPath}/${relativePath}` : relativePath;

  removeFileSystemObject(directoryPath);
  fs.mkdirSync(directoryPath);

  if (root === USE_CWD) {
    const teardown = (): void => {
      removeFileSystemObject(directoryPath);
    };

    return {
      directoryPath,
      teardown,
    } satisfies RootDirectoryHelper as DirectoryCreatorResult<TRoot>;
  }

  return {
    directoryPath,
  } satisfies NestedDirectoryHelper as DirectoryCreatorResult<TRoot>;
};
