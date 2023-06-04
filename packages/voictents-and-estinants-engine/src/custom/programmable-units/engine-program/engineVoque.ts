import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/buildConstructorFunction';
import { EngineVoqueLocator } from './engineVoqueLocator';
import { getZornableId } from '../../../utilities/getZornableId';
import { getExportLocatorZorn } from '../type-script-file/getExportLocatorZorn';

type BaseEngineVoque = {
  displayName: string;
  filePath: string;
  identifierName: string;
  commentText: string;
  locator: EngineVoqueLocator;
};

type EngineVoquePrototype = {
  get zorn(): string;
  get id(): string;
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
  zorn: getExportLocatorZorn,
  id: getZornableId,
});

export const ENGINE_VOQUE_GEPP = 'engine-voque';

type EngineVoqueGepp = typeof ENGINE_VOQUE_GEPP;

export type EngineVoqueVoque = InMemoryOdeshin2Voque<
  EngineVoqueGepp,
  EngineVoque
>;
