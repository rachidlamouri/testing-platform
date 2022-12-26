import fs from 'fs';
import { DirectoryHelper } from './createDirectory';

export type FileCreatorParameter = {
  root: DirectoryHelper;
  relativePath: string;
  contents: string;
}

export type FileHelper = {
  filePath: string;
  contents: string;
}

export const createFile = ({
  root,
  relativePath,
  contents,
}: FileCreatorParameter): FileHelper => {
  const filePath = `${root.directoryPath}/${relativePath}`;
  fs.writeFileSync(filePath, contents)

  return {
    filePath,
    contents,
  }
}
