import { ikariaAssertUtil } from 'ikaria-test/type-script/agnostic/assertUtil';

export type AssertUtil = {
  isStrictEqual: <T = unknown>(actual: T, expected: T) => void;
  isDeepEqual: <T = unknown>(actual: T, expected: T) => void;
  isTrue: (actual: boolean) => void;
};

export const assertUtil: AssertUtil = {
  isStrictEqual: ikariaAssertUtil.strictEqual,
  isDeepEqual: ikariaAssertUtil.deepStrictEqual,
  isTrue: ikariaAssertUtil.ok,
};
