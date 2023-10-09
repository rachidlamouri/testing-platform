import { buildEstinant } from '../../../adapter/estinant-builder/buildEstinant';
import {
  AST_NODE_LOCATOR_GEPP,
  AstNodeLocatorInstance,
  AstNodeLocatorVoque,
} from './astNodeLocator';
import { FILE_AST_LIST_GEPP, FileAstListVoque } from './fileAstList';

/**
 * Spreads each ast node in a file ast node list into a separate item
 */
export const enumerateNodeLocators = buildEstinant({
  name: 'enumerateNodeLocators',
})
  .fromHubblepup2<FileAstListVoque>({
    gepp: FILE_AST_LIST_GEPP,
  })
  .toHubblepupTuple2<AstNodeLocatorVoque>({
    gepp: AST_NODE_LOCATOR_GEPP,
  })
  .onPinbe((fileAstList) => {
    const outputList = fileAstList.flattenedAst.map((entry) => {
      return new AstNodeLocatorInstance({
        filePath: fileAstList.filePath,
        ...entry,
      });
    });

    return outputList;
  })
  .assemble();
