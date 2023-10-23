import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { ItemDefinitionId } from '../item-definition/itemDefinitionId';
import { ProgramId } from '../program/programId';

const COLLECTION_INSTANCE_ID_TEMPLATE = [
  ['program', ProgramId],
  // ['collection', CollectionDefinitionId],
  ['item', ItemDefinitionId, ['']],
] as const satisfies GenericComplexIdTemplate;
type CollectionInstanceIdTemplate = typeof COLLECTION_INSTANCE_ID_TEMPLATE;

export class CollectionInstanceId extends ComplexId<CollectionInstanceIdTemplate> {
  get rawTemplate(): CollectionInstanceIdTemplate {
    return COLLECTION_INSTANCE_ID_TEMPLATE;
  }
}
