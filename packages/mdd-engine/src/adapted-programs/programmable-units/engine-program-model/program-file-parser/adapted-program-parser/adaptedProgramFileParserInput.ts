import { IdentifiableProperty } from '../../../../../package-agnostic-utilities/type-script-ast/isObjectExpressionWithIdentifiableProperties';
import { FileCommentedProgramBodyDeclarationGroup } from '../../../type-script-file/fileCommentedProgramBodyDeclarationGroup';
import { TypeScriptFileImportList } from '../../../type-script-file/typeScriptFileImportList';
import { EngineCallDeclaration } from '../../engine-call-expression/engineCallExpression';
import { AdaptedProgramLocator } from '../../program/programLocator';

/**
 * The cumulative context that all adapted program parser functions need
 */
export type AdaptedProgramFileParserInput = {
  programLocator: AdaptedProgramLocator;
  fileImportGroup: TypeScriptFileImportList;
  engineCallExpression: EngineCallDeclaration;
  engineCallParameterList: IdentifiableProperty[];
  bodyStatementGroup: FileCommentedProgramBodyDeclarationGroup;
};
