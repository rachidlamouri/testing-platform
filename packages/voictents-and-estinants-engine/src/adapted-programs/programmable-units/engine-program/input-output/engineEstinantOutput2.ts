import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/deprecated-constructor-function/buildConstructorFunction';
import { getTextDigest } from '../../../../utilities/string/getTextDigest';
import { getZorn } from '../../../../utilities/deprecated-zorn/getZorn';
import { EngineEstinantLocator2 } from '../engineEstinantLocator2';
import { EngineVoqueLocator2 } from '../engineVoqueLocator2';

type BaseEstinantOutput2 = {
  // TODO: delete "voictentName" in favor of "voqueLocator"
  voictentName: string;
  voqueLocator?: EngineVoqueLocator2;
  isInput: false;
  index?: never;
  estinantLocator: EngineEstinantLocator2;
  estinantName: string;
};

type EstinantOutput2Prototype = {
  get zorn(): string;
  get id(): string;
};

/**
 * The model of a transform output
 */
export type EstinantOutput2 = ObjectWithPrototype<
  BaseEstinantOutput2,
  EstinantOutput2Prototype
>;

export const { EstinantOutput2Instance } = buildConstructorFunctionWithName(
  'EstinantOutput2Instance',
)<BaseEstinantOutput2, EstinantOutput2Prototype>({
  zorn: (output) => {
    return getZorn([
      'output',
      output.voictentName,
      output.estinantLocator.zorn.forHuman,
    ]);
  },
  id: (output) =>
    getTextDigest(`${output.estinantName} | output | ${output.voictentName}`),
});

export const ESTINANT_OUTPUT_2_GEPP = 'estinant-output-2';

type EstinantOutput2Gepp = typeof ESTINANT_OUTPUT_2_GEPP;

export type EstinantOutput2Voque = InMemoryOdeshin2ListVoque<
  EstinantOutput2Gepp,
  EstinantOutput2
>;