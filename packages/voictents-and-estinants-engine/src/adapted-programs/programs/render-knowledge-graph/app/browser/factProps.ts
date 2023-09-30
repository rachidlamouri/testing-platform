/**
 * Component prop types used by both the fact components, and the
 * decodeAndRecastSvgDocument transform
 *
 * @noCanonicalDeclaration
 */

import { PropsWithChildren } from 'react';

export type DirectoryFactProps = PropsWithChildren<{
  factId: string;
  boundaryId: string;
  directoryPath: string;
  isBoundaryDirectory: boolean;
}>;

export type FileFactProps = PropsWithChildren<{
  factId: string;
  boundaryId: string;
  fileName: string;
  importedNodeIdSet: Set<string>;
  importingNodeIdSet: Set<string>;
}>;

export type FileDependencyPathSegmentFactProps = PropsWithChildren<{
  factId: string;
  pathHeadId: string;
  pathTailIdSet: Set<string>;
}>;

export type FileDependencyPathNodeFactProps = PropsWithChildren<{
  factId: string;
  pathHeadId: string;
}>;
