import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../../adapter/voictent';

export type EngineVoque = {
  zorn: string;
  id: string;
  displayName: string;
  filePath: string;
  identifierName: string;
  commentText: string;
};

export const ENGINE_VOQUE_GEPP = 'engine-voque';

export type EngineVoqueGepp = typeof ENGINE_VOQUE_GEPP;

export type EngineVoqueVoictent = Voictent<EngineVoqueGepp, EngineVoque>;

export type EngineVoqueVoque = InMemoryOdeshin2Voque<
  EngineVoqueGepp,
  EngineVoque
>;
