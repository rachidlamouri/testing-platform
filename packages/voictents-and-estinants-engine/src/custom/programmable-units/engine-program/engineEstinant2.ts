import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/buildConstructorFunction';
import { EngineEstinantLocator2 } from './engineEstinantLocator2';
import { EngineVoqueLocator } from './engineVoqueLocator';
import { getExportLocatorZorn } from '../type-script-file/getExportLocatorZorn';
import { getZornableId } from '../../../utilities/getZornableId';

type BaseEstinantInputOutput<
  TIsInput extends boolean,
  TIndex extends number | null,
> = {
  id: string;
  // TODO: delete "voictentName" in favor of "voqueLocator"
  voictentName: string;
  // TODO: make this non optional
  voqueLocator?: EngineVoqueLocator;
  isInput: TIsInput;
  index: TIndex;
};

export type EstinantInput2 = BaseEstinantInputOutput<true, number>;

export type EstinantOutput2 = BaseEstinantInputOutput<false, null>;

type BaseEngineEstinant2 = {
  estinantName: string;
  filePath: string;
  identifierName: string;
  commentText: string;
  inputList: EstinantInput2[];
  outputList: EstinantOutput2[];
  locator: EngineEstinantLocator2;
};

type EngineEstinant2Prototype = {
  get zorn(): string;
  get id(): string;
};

/**
 * Represents a transform for the program modeler
 */
export type EngineEstinant2 = ObjectWithPrototype<
  BaseEngineEstinant2,
  EngineEstinant2Prototype
>;

export const { EngineEstinant2Instance } = buildConstructorFunctionWithName(
  'EngineEstinant2Instance',
)<BaseEngineEstinant2, EngineEstinant2Prototype>({
  zorn: getExportLocatorZorn,
  id: getZornableId,
});

export const ENGINE_ESTINANT_2_GEPP = 'engine-estinant-2';

type EngineEstinant2Gepp = typeof ENGINE_ESTINANT_2_GEPP;

export type EngineEstinant2Voque = InMemoryOdeshin2Voque<
  EngineEstinant2Gepp,
  EngineEstinant2
>;
