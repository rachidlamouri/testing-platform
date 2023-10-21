import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import {
  EngineStreamMetatypeLocator2,
  getStreamMetatypeDisplayName,
  oldGetStreamMetatypeLocatorId,
  getStreamMetatypeLocatorId,
} from './engineStreamMetatypeLocator2';

type BaseEngineStreamMetatype2 = {
  filePath: string;
  identifierName: string;
  commentText: string;
  locator: EngineStreamMetatypeLocator2;
};

type EngineStreamMetatype2Prototype = {
  get id(): string;
  get oldId(): string;
  get displayName(): string;
  get isCoreStreamMetatype(): boolean;
};

/**
 * Represents a metacollection used by an engine program
 *
 * @todo this should be an EngineHubblepup now. It should go EngineVoqueLocator -> EngineHubblepup
 *
 * @readableName StreamMetatypeModel
 */
type EngineStreamMetatype2 = ObjectWithPrototype<
  BaseEngineStreamMetatype2,
  EngineStreamMetatype2Prototype
>;

export const { EngineStreamMetatype2Instance } =
  buildConstructorFunctionWithName('EngineVoque2Instance')<
    BaseEngineStreamMetatype2,
    EngineStreamMetatype2Prototype
  >({
    id: getStreamMetatypeLocatorId,
    oldId: oldGetStreamMetatypeLocatorId,
    displayName: getStreamMetatypeDisplayName,
    isCoreStreamMetatype: (engineStreamMetatype) =>
      engineStreamMetatype.locator.isCoreStreamMetatype,
  });

export const ENGINE_STREAM_METATYPE_2_COLLECTION_ID = 'engine-voque-2';

type EngineStreamMetatype2CollectionId =
  typeof ENGINE_STREAM_METATYPE_2_COLLECTION_ID;

export type EngineStreamMetatype2StreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    EngineStreamMetatype2CollectionId,
    EngineStreamMetatype2
  >;
