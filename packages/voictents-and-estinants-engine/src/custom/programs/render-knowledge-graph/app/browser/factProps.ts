import { PropsWithChildren } from 'react';

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
