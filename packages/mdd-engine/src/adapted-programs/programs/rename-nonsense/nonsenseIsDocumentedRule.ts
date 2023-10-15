import { posix } from 'path';
import { FileSourceInstance } from '../../programmable-units/linting/source/fileSource';
import {
  TypedRule,
  EmptyMessageContext,
} from '../../programmable-units/linting/rule';

const ruleSource = new FileSourceInstance({
  filePath: posix.relative('', __filename),
});

/**
 * Nonsense should be documented for automatic renaming and for posterity
 *
 * @todo exempt rules from canonical comments because they have descriptions
 */
export const nonsenseIsDocumentedRule = new TypedRule<EmptyMessageContext>({
  name: 'nonsense-is-documented',
  description:
    'Nonsense should be documented for automatic renaming and for posterity',
  source: ruleSource,
  getErrorMessage: (): string => {
    return 'One or more nonsense words were not found in the nonsense dictionary';
  },
});
