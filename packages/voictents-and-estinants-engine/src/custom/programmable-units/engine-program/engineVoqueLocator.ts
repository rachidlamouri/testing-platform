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
