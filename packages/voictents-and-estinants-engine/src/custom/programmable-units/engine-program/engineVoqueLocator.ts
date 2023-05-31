import { ZornableVoque } from '../in-memory-cache/zornable';

export type ReceivedEngineVoqueLocator = {
  identifierName: string;
  filePath: string;
};

export type EmittedEngineVoqueLocator = {
  zorn: string;
  identifierName: string;
  filePath: string;
};

export const ENGINE_VOQUE_LOCATOR_GEPP = 'engine-voque-locator';

export type EngineVoqueLocatorGepp = typeof ENGINE_VOQUE_LOCATOR_GEPP;

export type EngineVoqueLocatorVoque = ZornableVoque<
  EngineVoqueLocatorGepp,
  ReceivedEngineVoqueLocator,
  EmittedEngineVoqueLocator,
  EmittedEngineVoqueLocator[]
>;
