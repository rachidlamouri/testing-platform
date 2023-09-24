import { PropsWithChildren } from 'react';

export type DirectoryFactProps = PropsWithChildren<{
  factId: string;
  boundaryId: string;
  directoryPath: string;
  isBoundaryDirectory: boolean;
}>;

export type FileFactProps = PropsWithChildren<{
  factId: string;
  fileName: string;
  importedNodeIdSet: Set<string>;
  importingNodeIdSet: Set<string>;
}>;

export type FileDependencyPathSegmentFactProps = PropsWithChildren<{
  factId: string;
  pathHeadId: string;
  pathTailIdSet: Set<string>;
}>;