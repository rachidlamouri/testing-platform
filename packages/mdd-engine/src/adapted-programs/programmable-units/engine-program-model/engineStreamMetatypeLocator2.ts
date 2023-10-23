import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { getTextDigest } from '../../../package-agnostic-utilities/string/getTextDigest';

type BaseEngineStreamMetatypeLocator2 = {
  identifierName: string;
  filePath: string;
  isCoreStreamMetatype: boolean;
};

type EngineStreamMetatypeLocator2Prototype = {
  get id(): string;
  get oldId(): string;
  get displayName(): string;
};

/**
 * The information needed to find a Voque definition, and subsequently a
 * hubblepup definition
 *
 * @readableName StreamMetatypeLocator
 *
 * @canonicalDeclaration
 */
export type EngineStreamMetatypeLocator2 = ObjectWithPrototype<
  BaseEngineStreamMetatypeLocator2,
  EngineStreamMetatypeLocator2Prototype
>;

const getStreamMetatypeLocatorId = (
  locator: EngineStreamMetatypeLocator2,
): string => {
  return getTextDigest(locator.displayName);
};

const getStreamMetatypeDisplayName = (
  locator: EngineStreamMetatypeLocator2,
): string => {
  const itemName = locator.identifierName
    .replace(/^Generic/, '')
    .replace(/StreamMetatype$/, '');

  return itemName;
};

export const { EngineStreamMetatypeLocator2Instance } =
  buildConstructorFunctionWithName('EngineVoqueLocator2Instance')<
    BaseEngineStreamMetatypeLocator2,
    EngineStreamMetatypeLocator2Prototype
  >({
    id: getStreamMetatypeLocatorId,
    oldId: getStreamMetatypeLocatorId,
    displayName: getStreamMetatypeDisplayName,
  });
