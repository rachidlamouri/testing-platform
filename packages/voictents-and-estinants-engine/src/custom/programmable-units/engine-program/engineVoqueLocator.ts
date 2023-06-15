import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/buildConstructorFunction';
import { getZornableId } from '../../../utilities/getZornableId';
import { getExportLocatorZorn } from '../type-script-file/getExportLocatorZorn';

type BaseEngineVoqueLocator = {
  identifierName: string;
  filePath: string;
};

type EngineVoqueLocatorPrototype = {
  get zorn(): string;
  get id(): string;
};

/**
 * The information needed to find a Voque definition, and subsequently a
 * hubblepup definition
 */
export type EngineVoqueLocator = ObjectWithPrototype<
  BaseEngineVoqueLocator,
  EngineVoqueLocatorPrototype
>;

export const { EngineVoqueLocatorInstance } = buildConstructorFunctionWithName(
  'EngineVoqueLocatorInstance',
)<BaseEngineVoqueLocator, EngineVoqueLocatorPrototype>({
  zorn: getExportLocatorZorn,
  id: getZornableId,
});

export const ENGINE_VOQUE_LOCATOR_GEPP = 'engine-voque-locator';

type EngineVoqueLocatorGepp = typeof ENGINE_VOQUE_LOCATOR_GEPP;

export type EngineVoqueLocatorVoque = InMemoryOdeshin2Voque<
  EngineVoqueLocatorGepp,
  EngineVoqueLocator
>;
