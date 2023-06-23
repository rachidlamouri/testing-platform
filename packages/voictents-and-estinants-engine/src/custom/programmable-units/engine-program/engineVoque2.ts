import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/buildConstructorFunction';
import {
  EngineVoqueLocator2,
  getVoqueDisplayName,
  getVoqueLocatorId,
  getVoqueLocatorZorn,
} from './engineVoqueLocator2';

type BaseEngineVoque2 = {
  filePath: string;
  identifierName: string;
  commentText: string;
  locator: EngineVoqueLocator2;
};

type EngineVoque2Prototype = {
  get zorn(): string;
  get id(): string;
  get displayName(): string;
  get isCoreVoque(): boolean;
};

/**
 * Represents a metacollection used by an engine program
 *
 * @todo this should be an EngineHubblepup now. It should go EngineVoqueLocator -> EngineHubblepup
 */
type EngineVoque2 = ObjectWithPrototype<
  BaseEngineVoque2,
  EngineVoque2Prototype
>;

export const { EngineVoque2Instance } = buildConstructorFunctionWithName(
  'EngineVoque2Instance',
)<BaseEngineVoque2, EngineVoque2Prototype>({
  zorn: getVoqueLocatorZorn,
  id: getVoqueLocatorId,
  displayName: getVoqueDisplayName,
  isCoreVoque: (engineVoque) => engineVoque.locator.isCoreVoque,
});

export const ENGINE_VOQUE_2_GEPP = 'engine-voque-2';

type EngineVoque2Gepp = typeof ENGINE_VOQUE_2_GEPP;

export type EngineVoque2Voque = InMemoryOdeshin2Voque<
  EngineVoque2Gepp,
  EngineVoque2
>;
