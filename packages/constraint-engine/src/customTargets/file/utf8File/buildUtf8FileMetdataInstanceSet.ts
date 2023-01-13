import glob from 'glob';
import { InstanceBuilder } from '../../../types/builders/instanceBuilder';
import { Utf8FileMetadataTarget } from './utf8FileTarget';

export const buildUtf8FileMetadataInstanceSet: InstanceBuilder<
  { fileGlob: string },
  Utf8FileMetadataTarget[]
> = ({ fileGlob }) => {
  return glob.sync(fileGlob).map((filePath) => {
    return {
      filePath,
      isOnDisk: true,
    };
  });
};
