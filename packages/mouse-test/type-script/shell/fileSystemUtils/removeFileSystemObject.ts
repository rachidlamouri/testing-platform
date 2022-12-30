import fs from 'fs';

export const removeFileSystemObject = (objectPath: string): void => {
  if (fs.existsSync(objectPath)) {
    fs.rmSync(objectPath, { recursive: true });
  }
};
