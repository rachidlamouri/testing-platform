import { buildProgrammedTransform } from '../../../adapter/estinant-builder/buildEstinant';
import {
  AST_NODE_LOCATOR_GEPP,
  AstNodeLocatorInstance,
  AstNodeLocatorVoque,
} from './astNodeLocator';
import { FILE_AST_LIST_GEPP, FileAstListVoque } from './fileAstList';

/**
 * Spreads each ast node in a file ast node list into a separate item
 */
export const enumerateNodeLocators = buildProgrammedTransform({
  name: 'enumerateNodeLocators',
})
  .fromItem2<FileAstListVoque>({
    collectionId: FILE_AST_LIST_GEPP,
  })
  .toItemTuple2<AstNodeLocatorVoque>({
    collectionId: AST_NODE_LOCATOR_GEPP,
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
