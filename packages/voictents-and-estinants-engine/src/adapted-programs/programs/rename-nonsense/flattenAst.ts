import { TSESTree } from '@typescript-eslint/typescript-estree';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  FILE_AST_LIST_GEPP,
  FileAstListInstance,
  FileAstListVoque,
  AstListEntry,
} from './fileAstList';
import {
  PARSED_TYPE_SCRIPT_FILE_GEPP,
  ParsedTypeScriptFileVoque,
} from '../../programmable-units/type-script-file/parsedTypeScriptFile';
import {
  CustomDatumTypeName,
  getCustomTypedDatum,
} from '../../../package-agnostic-utilities/typed-datum/customTypedDatum';

const isAstNode = (datum: unknown): datum is TSESTree.Node =>
  typeof datum === 'object' && datum !== null && 'type' in datum;

const recursivelyFlattenASt = (
  pathPrefix: string,
  datum: unknown,
  accumulator: AstListEntry[],
): void => {
  const typedDatum = getCustomTypedDatum(datum);
  switch (typedDatum.typeName) {
    case CustomDatumTypeName.Array: {
      typedDatum.datum.forEach((value, index) => {
        recursivelyFlattenASt(`${pathPrefix}/${index}`, value, accumulator);
      });
      return;
    }
    case CustomDatumTypeName.RootObjectInstance:
    case CustomDatumTypeName.CustomObjectInstance: {
      let nextPathPrefix: string;
      if (isAstNode(typedDatum.datum)) {
        accumulator.push({
          astPath: pathPrefix,
          node: typedDatum.datum,
        });

        nextPathPrefix = `${pathPrefix}/${typedDatum.datum.type}`;
      } else {
        nextPathPrefix = pathPrefix;
      }

      Object.entries(typedDatum.datum).forEach(([key, value]) => {
        recursivelyFlattenASt(`${nextPathPrefix}/${key}`, value, accumulator);
      });
      return;
    }
    case CustomDatumTypeName.Boolean:
    case CustomDatumTypeName.String:
    case CustomDatumTypeName.Symbol:
    case CustomDatumTypeName.Undefined:
    case CustomDatumTypeName.BigInteger:
    case CustomDatumTypeName.Null:
    case CustomDatumTypeName.Number:
      return;
    case CustomDatumTypeName.Function:
    case CustomDatumTypeName.Map:
    case CustomDatumTypeName.Set: {
      throw new Error(`Unsupported case: ${typedDatum.typeName}`);
    }
  }
};

const flattenAstRoot = (rootNode: TSESTree.Node): AstListEntry[] => {
  const accumulator: AstListEntry[] = [];
  recursivelyFlattenASt('', rootNode, accumulator);
  return accumulator;
};

/**
 * Traverses a TypeScript AST to enumerate all nodes and their ast paths in one
 * list
 */
export const flattenAst = buildProgrammedTransform({
  name: 'flattenAst',
})
  .fromItem2<ParsedTypeScriptFileVoque>({
    collectionId: PARSED_TYPE_SCRIPT_FILE_GEPP,
  })
  .toItem2<FileAstListVoque>({
    collectionId: FILE_AST_LIST_GEPP,
  })
  .onTransform((parsedFile) => {
    const flattenedAst = flattenAstRoot(parsedFile.program);

    return new FileAstListInstance({
      filePath: parsedFile.filePathObject,
      flattenedAst,
    });
  })
  .assemble();
