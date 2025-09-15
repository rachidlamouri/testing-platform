/**
 * Component prop types used by both the model part components, and the
 * decodeAndRecastSvgDocument transform
 *
 * @noCanonicalDeclaration
 */

import { PropsWithChildren } from 'react';

export type RenderablePartProps = PropsWithChildren<{
  partId: string;
  proxyId?: string;
  source: string;
  upstreamIdSet: Set<string>;
  downstreamIdSet: Set<string>;
  isStartOrEnd: boolean;
  isCollection: boolean;
  isTransform: boolean;
  isEdge: boolean;
  isProxyNode: boolean;
  info?: {
    title: string;
    description: string;
  };
}>;
