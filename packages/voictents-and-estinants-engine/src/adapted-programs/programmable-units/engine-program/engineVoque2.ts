import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import {
  EngineStreamMetatypeLocator2,
  getVoqueDisplayName,
  getVoqueLocatorId,
  getVoqueLocatorZorn,
} from './engineVoqueLocator2';

type BaseEngineVoque2 = {
  filePath: string;
  identifierName: string;
  commentText: string;
  locator: EngineStreamMetatypeLocator2;
};

type EngineVoque2Prototype = {
  get id(): string;
  get oldId(): string;
  get displayName(): string;
  get isCoreVoque(): boolean;
};

/**
 * Represents a metacollection used by an engine program
 *
 * @todo this should be an EngineHubblepup now. It should go EngineVoqueLocator -> EngineHubblepup
 *
 * @readableName StreamMetatypeModel
 */
type EngineVoque2 = ObjectWithPrototype<
  BaseEngineVoque2,
  EngineVoque2Prototype
>;

export const { EngineVoque2Instance } = buildConstructorFunctionWithName(
  'EngineVoque2Instance',
)<BaseEngineVoque2, EngineVoque2Prototype>({
  id: getVoqueLocatorZorn,
  oldId: getVoqueLocatorId,
  displayName: getVoqueDisplayName,
  isCoreVoque: (engineVoque) => engineVoque.locator.isCoreVoque,
});

export const ENGINE_STREAM_METATYPE_2_COLLECTION_ID = 'engine-voque-2';

type EngineVoque2Gepp = typeof ENGINE_STREAM_METATYPE_2_COLLECTION_ID;

export type EngineStreamMetatype2StreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<EngineVoque2Gepp, EngineVoque2>;
