import { TSESTree } from '@typescript-eslint/typescript-estree';
import { InMemoryOdeshin2ListVoque } from '../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
import { AstNodeLocator } from './astNodeLocator';

export type IdentifierNodeLocator = AstNodeLocator<TSESTree.Identifier>;

export const IDENTIFIER_NODE_LOCATOR_GEPP = 'identifier-node-locator';

type IdentifierNodeLocatorGepp = typeof IDENTIFIER_NODE_LOCATOR_GEPP;

export type IdentifierNodeLocatorVoque = InMemoryOdeshin2ListVoque<
  IdentifierNodeLocatorGepp,
  IdentifierNodeLocator
>;
