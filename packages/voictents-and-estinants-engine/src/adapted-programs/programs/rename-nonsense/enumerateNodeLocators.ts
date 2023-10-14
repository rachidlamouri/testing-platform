import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  AST_NODE_LOCATOR_COLLECTION_ID,
  AstNodeLocatorInstance,
  AstNodeLocatorStreamMetatype,
} from './astNodeLocator';
import {
  FILE_AST_LIST_COLLECTION_ID,
  FileAstListStreamMetatype,
} from './fileAstList';

/**
 * Spreads each ast node in a file ast node list into a separate item
 */
export const enumerateNodeLocators = buildProgrammedTransform({
  name: 'enumerateNodeLocators',
})
  .fromItem2<FileAstListStreamMetatype>({
    collectionId: FILE_AST_LIST_COLLECTION_ID,
  })
  .toItemTuple2<AstNodeLocatorStreamMetatype>({
    collectionId: AST_NODE_LOCATOR_COLLECTION_ID,
  })
  .onTransform((fileAstList) => {
    const outputList = fileAstList.flattenedAst.map((entry) => {
      return new AstNodeLocatorInstance({
        filePath: fileAstList.filePath,
        ...entry,
      });
    });

    return outputList;
  })
  .assemble();
