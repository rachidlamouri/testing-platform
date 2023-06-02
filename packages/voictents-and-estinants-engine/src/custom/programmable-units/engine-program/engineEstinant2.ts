import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { EngineEstinantLocator2 } from './engineEstinantLocator2';
import { ReceivedEngineVoqueLocator } from './engineVoqueLocator';

type BaseEstinantInputOutput<
  TIsInput extends boolean,
  TIndex extends number | null,
> = {
  id: string;
  // TODO: delete "voictentName" in favor of "voqueLocator"
  voictentName: string;
  // TODO: make this non optional
  voqueLocator?: ReceivedEngineVoqueLocator;
  isInput: TIsInput;
  index: TIndex;
};

export type EstinantInput2 = BaseEstinantInputOutput<true, number>;

export type EstinantOutput2 = BaseEstinantInputOutput<false, null>;

/**
 * Represents a transform for the program modeler
 */
export type EngineEstinant2 = {
  zorn: string;
  id: string;
  estinantName: string;
  filePath: string;
  identifierName: string;
  commentText: string;
  inputList: EstinantInput2[];
  outputList: EstinantOutput2[];
  locator: EngineEstinantLocator2;
};

export const ENGINE_ESTINANT_2_GEPP = 'engine-estinant-2';

type EngineEstinant2Gepp = typeof ENGINE_ESTINANT_2_GEPP;

export type EngineEstinant2Voque = InMemoryOdeshin2Voque<
  EngineEstinant2Gepp,
  EngineEstinant2
>;
