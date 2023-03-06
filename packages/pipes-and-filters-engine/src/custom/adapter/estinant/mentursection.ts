import { Gepp } from '../../../core/gepp';
import {
  Mentursection,
  buildMentursection as buildTypeScriptAdaptedMentursection,
} from '../../../type-script-adapter/estinant/mentursection';
import {
  Hubblepup,
  HubblepupTuple,
} from '../../../type-script-adapter/hubblepup';
import { Pinbetunf } from '../../../type-script-adapter/pinbetunf';
import {
  VoictentTupleToAggregateVoictentRecord,
  VoictentTupleToGeppTuple,
} from '../../../type-script-adapter/voictent';
import {
  OdeshinVoictent,
  OdeshinVoictentRecord,
  OdeshinVoictentToGrition,
  OdeshinVoictentTuple,
  OdeshinVoictentTupleToAggregateVoictentRecord,
} from '../odeshinVoictent';

export type MentursectionPinbetunf<
  TInputVoictent extends OdeshinVoictent,
  TOutputVoictentTuple extends OdeshinVoictentTuple,
> = Pinbetunf<
  [OdeshinVoictentToGrition<TInputVoictent>],
  OdeshinVoictentTupleToAggregateVoictentRecord<TOutputVoictentTuple>
>;

export type MentursectionBuilderInput<
  TInputVoictent extends OdeshinVoictent,
  TOutputVoictentTuple extends OdeshinVoictentTuple,
> = {
  inputGepp: TInputVoictent['gepp'];
  outputGeppTuple: VoictentTupleToGeppTuple<TOutputVoictentTuple>;
  pinbe: MentursectionPinbetunf<TInputVoictent, TOutputVoictentTuple>;
};

export const buildMentursection = <
  TInputVoictent extends OdeshinVoictent,
  TOutputVoictentTuple extends OdeshinVoictentTuple,
>({
  inputGepp,
  outputGeppTuple,
  pinbe,
}: MentursectionBuilderInput<
  TInputVoictent,
  TOutputVoictentTuple
>): Mentursection<TInputVoictent, TOutputVoictentTuple> =>
  buildTypeScriptAdaptedMentursection<TInputVoictent, TOutputVoictentTuple>({
    inputGepp,
    outputGeppTuple,
    pinbe: (input) => {
      const { identifier, grition: inputGrition } = input;

      const odeshinVoictentRecord = pinbe(
        inputGrition,
      ) as OdeshinVoictentRecord;

      const outputEntries = outputGeppTuple.map<[Gepp, HubblepupTuple]>(
        (gepp) => {
          const hubblepupTuple = odeshinVoictentRecord[gepp].map<Hubblepup>(
            (outputGrition) => ({
              identifier,
              grition: outputGrition,
            }),
          );

          return [gepp, hubblepupTuple];
        },
      );

      const output = Object.fromEntries(
        outputEntries,
      ) as VoictentTupleToAggregateVoictentRecord<TOutputVoictentTuple>;

      return output;
    },
  });
