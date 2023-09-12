import { PropsWithChildren } from 'react';

export type FileFactProps = PropsWithChildren<{
  factId: string;
  fileName: string;
  // importedNodeIdSet: Set<string>;
  // importingNodeIdSet: Set<string>;
}>;
