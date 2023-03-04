import { Estinant } from './estinant';
import { Pinbetunf } from '../pinbetunf';
import { Tropoignant } from '../tropoignant';
import { Vition, VitionToHubblepupInputList } from '../vition';
import { RightAppreffingeTuple } from '../appreffinge';

export type DisatingerPinbetunf<TInputVition extends Vition> = Pinbetunf<
  VitionToHubblepupInputList<TInputVition>,
  void
>;

export type DisatingerTropoignant<TInputVition extends Vition> = Tropoignant<
  TInputVition,
  []
>;

/**
 * A many to zero estinant
 */
export type Disatinger<TInputVition extends Vition> = Estinant<
  TInputVition,
  []
>;

export type DisatingerBuilderInput<TInputVition extends Vition> = {
  leftGepp: TInputVition['leftVoictent']['gepp'];
  rightAppreffingeTuple: RightAppreffingeTuple<TInputVition>;
  pinbe: DisatingerPinbetunf<TInputVition>;
};

export const buildDisatinger = <TInputVition extends Vition>({
  leftGepp,
  rightAppreffingeTuple,
  pinbe,
}: DisatingerBuilderInput<TInputVition>): Disatinger<TInputVition> => {
  const tropoig: DisatingerTropoignant<TInputVition> = (...inputs) => {
    pinbe(...inputs);
    return [];
  };

  const estinant: Disatinger<TInputVition> = {
    leftAppreffinge: { gepp: leftGepp },
    rightAppreffingeTuple,
    tropoig,
  };

  return estinant;
};
