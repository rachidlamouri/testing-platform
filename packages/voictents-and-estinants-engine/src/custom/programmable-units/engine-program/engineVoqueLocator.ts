import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/buildConstructorFunction';
import { getTextDigest } from '../../../utilities/getTextDigest';
import { getExportLocatorZorn } from '../type-script-file/getExportLocatorZorn';

type BaseEngineVoqueLocator = {
  identifierName: string;
  filePath: string;
};

type EngineVoqueLocatorPrototype = {
  get zorn(): string;
  get id(): string;
  get displayName(): string;
};

/**
 * The information needed to find a Voque definition, and subsequently a
 * hubblepup definition
 */
export type EngineVoqueLocator = ObjectWithPrototype<
  BaseEngineVoqueLocator,
  EngineVoqueLocatorPrototype
>;

export const getVoqueLocatorZorn = getExportLocatorZorn;

export const getVoqueLocatorId = (locator: EngineVoqueLocator): string => {
  return getTextDigest(locator.displayName);
};

export const getVoqueDisplayName = (locator: EngineVoqueLocator): string => {
  const hubblepupName = locator.identifierName
    .replace(/^Generic/, '')
    .replace(/Voque$/, '');

  return hubblepupName;
};

export const { EngineVoqueLocatorInstance } = buildConstructorFunctionWithName(
  'EngineVoqueLocatorInstance',
)<BaseEngineVoqueLocator, EngineVoqueLocatorPrototype>({
  zorn: getVoqueLocatorZorn,
  id: getVoqueLocatorId,
  displayName: getVoqueDisplayName,
});

export const ENGINE_VOQUE_LOCATOR_GEPP = 'engine-voque-locator';

type EngineVoqueLocatorGepp = typeof ENGINE_VOQUE_LOCATOR_GEPP;

export type EngineVoqueLocatorVoque = InMemoryOdeshin2Voque<
  EngineVoqueLocatorGepp,
  EngineVoqueLocator
>;
