import { TSESTree } from '@typescript-eslint/typescript-estree';
import { AdaptedProgramFileParserInput } from '../adaptedProgramFileParserInput';
import { ProgrammedTransformLocator } from '../../../programmed-transform/programmedTransformLocator';

type ParseProgrammedTransformInstanceReferenceInput = {
  adaptedParserContext: AdaptedProgramFileParserInput;
  node: TSESTree.Identifier;
};

/**
 * Parses a reference to a programmed transform within an adapted program
 */
export const parseProgrammedTransformInstanceReference = ({
  adaptedParserContext,
  node,
}: ParseProgrammedTransformInstanceReferenceInput): ProgrammedTransformLocator | null => {
  const { fileImportGroup, bodyStatementGroup } = adaptedParserContext;
  const identifierName = node.name;

  const importGroup =
    fileImportGroup.fileImportByIdentifier.get(identifierName);

  const bodyStatement =
    bodyStatementGroup.declarationByIdentifier.get(identifierName);

  let filePath: string | null;
  if (importGroup !== undefined) {
    filePath = importGroup.sourcePath;
  } else if (bodyStatement !== undefined) {
    filePath =
      adaptedParserContext.programLocator.programFile.filePath.serialized;
  } else {
    filePath = null;
  }

  if (filePath === null) {
    return null;
  }

  return new ProgrammedTransformLocator({
    filePath,
    identifierName,
  });
};
