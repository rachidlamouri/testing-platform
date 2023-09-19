import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  LINT_ASSERTION_GEPP,
  LintAssertion,
  LintAssertionVoque,
} from '../../linting/lintAssertion';
import { TypedRule } from '../../linting/rule';
import { EstinantSourceInstance } from '../../linting/source/estinantSource';
import { FileSourceInstance } from '../../linting/source/fileSource';
import {
  FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_GEPP,
  FileCommentedProgramBodyDeclarationGroupVoque,
} from '../fileCommentedProgramBodyDeclarationGroup';

const ESTINANT_NAME = 'assertTypeScriptFileHasCanonicalDeclaration' as const;

type TypeScriptFileHasCanonicalDeclarationMessageContext = {
  filePath: string;
  hasMultipleCanonicalDeclarations: boolean;
  hasMultipleDerivativeDeclarations: boolean;
};
export const typeScriptFileHasCanonicalDeclarationRule =
  new TypedRule<TypeScriptFileHasCanonicalDeclarationMessageContext>({
    name: 'typescript-file-has-canonical-declaration',
    source: new EstinantSourceInstance({
      filePath: __filename,
      estinantName: ESTINANT_NAME,
    }),
    description:
      'All TypeScript files must have at least one top level declaration whose name matches the file name regardless of casing',
    getErrorMessage: ({
      filePath,
      hasMultipleCanonicalDeclarations,
      hasMultipleDerivativeDeclarations,
    }): string => {
      if (hasMultipleCanonicalDeclarations) {
        return `File ${filePath} has more than on canonical declaration. Remediation for this scenario is currently not handled.`;
      }

      if (hasMultipleDerivativeDeclarations) {
        return `File ${filePath} does not have a canonical declaration, but has multiple derivative declarations. Remediation for this scenario is currently not handled.`;
      }

      return `File ${filePath} does not have a canonical declaration, nor any derivative declarations. Create a top level declaration whose name corresponds to the file name regardless of casing.`;
    },
  });

// TODO: add description
export const assertTypeScriptFileHasCanonicalDeclaration = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromHubblepup2<FileCommentedProgramBodyDeclarationGroupVoque>({
    gepp: FILE_COMMENTED_PROGRAM_BODY_DECLARATION_GROUP_GEPP,
  })
  .toHubblepup2<LintAssertionVoque>({
    gepp: LINT_ASSERTION_GEPP,
  })
  .onPinbe((group) => {
    return new LintAssertion({
      rule: typeScriptFileHasCanonicalDeclarationRule,
      lintSource: new FileSourceInstance({
        filePath: group.filePath,
      }),
      isValid: group.canonicalDeclaration !== null,
      errorMessageContext: {
        filePath: group.filePath,
        hasMultipleCanonicalDeclarations:
          group.canonicalDeclarationList.length > 1,
        hasMultipleDerivativeDeclarations:
          group.derivativeDeclarationList.length > 1,
      },
      context: {
        group,
      },
    });
  })
  .assemble();
