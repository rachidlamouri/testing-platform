import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/buildConstructorFunction';
import {
  EngineVoqueLocator,
  getVoqueDisplayName,
  getVoqueLocatorId,
  getVoqueLocatorZorn,
} from './engineVoqueLocator';

type BaseEngineVoque = {
  filePath: string;
  identifierName: string;
  commentText: string;
  locator: EngineVoqueLocator;
};

type EngineVoquePrototype = {
  get zorn(): string;
  get id(): string;
  get displayName(): string;
};

/**
 * Represents a metacollection used by an engine program
 *
 * @todo this should be an EngineHubblepup now. It should go EngineVoqueLocator -> EngineHubblepup
 */
export type EngineVoque = ObjectWithPrototype<
  BaseEngineVoque,
  EngineVoquePrototype
>;

export const { EngineVoqueInstance } = buildConstructorFunctionWithName(
  'EngineVoqueInstance',
)<BaseEngineVoque, EngineVoquePrototype>({
  zorn: getVoqueLocatorZorn,
  id: getVoqueLocatorId,
  displayName: getVoqueDisplayName,
});

export const ENGINE_VOQUE_GEPP = 'engine-voque';

type EngineVoqueGepp = typeof ENGINE_VOQUE_GEPP;

export type EngineVoqueVoque = InMemoryOdeshin2Voque<
  EngineVoqueGepp,
  EngineVoque
>;
