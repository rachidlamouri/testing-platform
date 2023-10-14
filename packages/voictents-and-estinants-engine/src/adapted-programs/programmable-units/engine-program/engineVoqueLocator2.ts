import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { getTextDigest } from '../../../package-agnostic-utilities/string/getTextDigest';
import { getExportLocatorZorn } from '../type-script-file/getExportLocatorZorn';

type BaseEngineVoqueLocator2 = {
  identifierName: string;
  filePath: string;
  isCoreVoque: boolean;
};

type EngineVoqueLocator2Prototype = {
  get id(): string;
  get oldId(): string;
  get displayName(): string;
};

/**
 * The information needed to find a Voque definition, and subsequently a
 * hubblepup definition
 *
 * @readableName StreamMetatypeLocator
 */
export type EngineVoqueLocator2 = ObjectWithPrototype<
  BaseEngineVoqueLocator2,
  EngineVoqueLocator2Prototype
>;

export const getVoqueLocatorZorn = getExportLocatorZorn;

export const getVoqueLocatorId = (locator: EngineVoqueLocator2): string => {
  return getTextDigest(locator.displayName);
};

export const getVoqueDisplayName = (locator: EngineVoqueLocator2): string => {
  const hubblepupName = locator.identifierName
    .replace(/^Generic/, '')
    .replace(/Voque$/, '');

  return hubblepupName;
};

export const { EngineVoqueLocator2Instance } = buildConstructorFunctionWithName(
  'EngineVoqueLocator2Instance',
)<BaseEngineVoqueLocator2, EngineVoqueLocator2Prototype>({
  id: getVoqueLocatorZorn,
  oldId: getVoqueLocatorId,
  displayName: getVoqueDisplayName,
});

export const ENGINE_VOQUE_LOCATOR_2_GEPP = 'engine-voque-locator-2';

type EngineVoqueLocatorGepp = typeof ENGINE_VOQUE_LOCATOR_2_GEPP;

export type EngineVoqueLocator2Voque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    EngineVoqueLocatorGepp,
    EngineVoqueLocator2
  >;
