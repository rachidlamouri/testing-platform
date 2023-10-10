import { TSESTree } from '@typescript-eslint/typescript-estree';
import { InMemoryOdeshin2ListVoque } from '../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
import { AstNodeLocator } from '../rename-nonsense/astNodeLocator';

/**
 * The information needed to find a string literal node
 */
export type StringLiteralNodeLocator = AstNodeLocator<TSESTree.StringLiteral>;

export const STRING_LITERAL_NODE_LOCATOR_GEPP = 'string-literal-node-locator';

type StringLiteralNodeLocatorGepp = typeof STRING_LITERAL_NODE_LOCATOR_GEPP;

export type StringLiteralNodeLocatorVoque = InMemoryOdeshin2ListVoque<
  StringLiteralNodeLocatorGepp,
  StringLiteralNodeLocator
>;
