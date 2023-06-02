import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';

/**
 * Represents a metacollection used by an engine program
 *
 * @todo this should be an EngineHubblepup now. It should go EngineVoqueLocator -> EngineHubblepup
 */
export type EngineVoque = {
  zorn: string;
  id: string;
  displayName: string;
  filePath: string;
  identifierName: string;
  commentText: string;
};

export const ENGINE_VOQUE_GEPP = 'engine-voque';

type EngineVoqueGepp = typeof ENGINE_VOQUE_GEPP;

export type EngineVoqueVoque = InMemoryOdeshin2Voque<
  EngineVoqueGepp,
  EngineVoque
>;
