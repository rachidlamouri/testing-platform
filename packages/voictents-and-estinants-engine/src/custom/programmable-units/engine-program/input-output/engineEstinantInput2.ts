import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';
import { getTextDigest } from '../../../../utilities/getTextDigest';
import { getZorn } from '../../../../utilities/getZorn';
import { EngineEstinantLocator2 } from '../engineEstinantLocator2';
import { EngineVoqueLocator } from '../engineVoqueLocator';

export type BaseEstinantInput2 = {
  // TODO: delete "voictentName" in favor of "voqueLocator"
  voictentName: string;
  voqueLocator?: EngineVoqueLocator;
  isInput: true;
  index: number;
  estinantLocator: EngineEstinantLocator2;
  estinantName: string;
};

type EstinantInput2Prototype = {
  get zorn(): string;
  get id(): string;
};

/**
 * Represents an engine program in the program modeler
 */
export type EstinantInput2 = ObjectWithPrototype<
  BaseEstinantInput2,
  EstinantInput2Prototype
>;

export const { EstinantInput2Instance } = buildConstructorFunctionWithName(
  'EstinantInput2Instance',
)<BaseEstinantInput2, EstinantInput2Prototype>({
  zorn: (input) => {
    return getZorn([
      'input',
      `${input.index}`,
      input.voictentName,
      input.estinantLocator.zorn,
    ]);
  },
  id: (input) => {
    const zorn = `${input.estinantName} | input | ${input.voictentName} | ${input.index}`;
    const id = getTextDigest(zorn);
    return id;
  },
  // id: getZornableId,
});

export const ESTINANT_INPUT_2_GEPP = 'estinant-input-2';

export type EstinantInput2Gepp = typeof ESTINANT_INPUT_2_GEPP;

export type EstinantInput2Voque = InMemoryOdeshin2Voque<
  EstinantInput2Gepp,
  EstinantInput2
>;