import { Estinant } from './estinant';
import { Tropoignant } from '../tropoignant';
import {
  VoictentRecord,
  VoictentTuple,
  VoictentTupleToAggregateVoictentRecord,
  VoictentTupleToGeppTuple,
} from '../voictent';
import { Pinbetunf } from '../pinbetunf';
import { Vition, VitionToHubblepupInputList } from '../vition';
import { RightAppreffingeTuple } from '../appreffinge';

export type CortmumPinbetunf<
  TInputVition extends Vition,
  TOutputVoictentTuple extends VoictentTuple,
> = Pinbetunf<
  VitionToHubblepupInputList<TInputVition>,
  VoictentTupleToAggregateVoictentRecord<TOutputVoictentTuple>
>;

export type CortmumTropoignant<
  TInputVition extends Vition,
  TOutputVoictentTuple extends VoictentTuple,
> = Tropoignant<TInputVition, TOutputVoictentTuple>;

/**
 * A many to many estinant
 */
export type Cortmum<
  TInputVition extends Vition,
  TOutputVoictentTuple extends VoictentTuple,
> = Estinant<TInputVition, TOutputVoictentTuple>;

export type CortmumBuilderInput<
  TInputVition extends Vition,
  TOutputVoictentTuple extends VoictentTuple,
> = {
  leftGepp: TInputVition['leftVoictent']['gepp'];
  rightAppreffingeTuple: RightAppreffingeTuple<TInputVition>;
  outputGeppTuple: VoictentTupleToGeppTuple<TOutputVoictentTuple>;
  pinbe: CortmumPinbetunf<TInputVition, TOutputVoictentTuple>;
};

export const buildCortmum = <
  TInputVition extends Vition,
  TOutputVoictentTuple extends VoictentTuple,
>({
  leftGepp,
  rightAppreffingeTuple,
  outputGeppTuple,
  pinbe,
}: CortmumBuilderInput<TInputVition, TOutputVoictentTuple>): Cortmum<
  TInputVition,
  TOutputVoictentTuple
> => {
  const tropoig: CortmumTropoignant<TInputVition, TOutputVoictentTuple> = (
    ...inputTuple
  ) => {
    const outputAggregateVoictentRecord = pinbe(
      ...inputTuple,
    ) as VoictentRecord;

    const outputQuirmList = outputGeppTuple.flatMap((gepp) => {
      const hubblepupTuple = outputAggregateVoictentRecord[gepp];

      return hubblepupTuple.map((hubblepup) => ({
        gepp,
        hubblepup,
      }));
    });

    return outputQuirmList;
  };

  const estinant: Cortmum<TInputVition, TOutputVoictentTuple> = {
    leftAppreffinge: {
      gepp: leftGepp,
    },
    rightAppreffingeTuple,
    tropoig,
  };

  return estinant;
};
