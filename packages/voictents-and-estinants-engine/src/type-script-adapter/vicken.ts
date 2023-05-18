import {
  LeftInputHubblepupVicken,
  LeftInputVoictentVicken,
} from '../core/engine-shell/vicken/leftInputVicken';
import {
  RightInputHubblepupTupleVicken,
  RightInputVoictentVicken,
} from '../core/engine-shell/vicken/rightInputVicken';
import { OdeshinVoictent } from '../custom/adapter/odeshinVoictent';
import { Tuple } from '../utilities/semantic-types/tuple';
import { Zorn, ZornTuple } from '../utilities/semantic-types/zorn';
import {
  AdaptedVoqueFromVoictent,
  Voictent,
  VoictentTuple,
  VoictentTupleToHubblepupTuple,
} from './voictent';
import { OutputVicken as CoreOutputVicken } from '../core/engine-shell/vicken/outputVicken';

export type Vicken<
  TVoictent extends Voictent = Voictent,
  TVoictentTuple extends Tuple<TVoictent> = Tuple<TVoictent>,
  TZorn extends Zorn = Zorn,
> = {
  voictent: TVoictent;
  voictentTuple: TVoictentTuple;
  zorn: TZorn;
};

export type VickenTuple = Tuple<Vicken>;

export type VickenTupleToHubblepupTuple<TVickenTuple extends VickenTuple> = {
  [Index in keyof TVickenTuple]: VoictentTupleToHubblepupTuple<
    TVickenTuple[Index]['voictentTuple']
  >;
};

export type VickenTupleToVoictentTuple<TVickenTuple extends VickenTuple> = {
  [Index in keyof TVickenTuple]: TVickenTuple[Index]['voictent'];
};

export type VickenVoictentTupleToZornTuple<
  TVoictentTuple extends VoictentTuple,
  TZorn extends Zorn,
> = {
  [Index in keyof TVoictentTuple]: TZorn;
};

export type VickenZornTuple<TVicken extends Vicken> = Readonly<
  VickenVoictentTupleToZornTuple<TVicken['voictentTuple'], TVicken['zorn']>
>;

export type LeftVoictentVicken<TVoictent extends Voictent = Voictent> = {
  voictent: TVoictent;
  tropoignantInput: TVoictent['hubblepupTuple'];
  pinbetunfInput: TVoictent['hubblepupTuple'];
};

export type LeftOdeshinVoictentVicken<
  TVoictent extends OdeshinVoictent = OdeshinVoictent,
> = {
  voictent: TVoictent;
  tropoignantInput: TVoictent['hubblepupTuple'];
  pinbetunfInput: TVoictent['hubblepupTuple'][number]['grition'][];
};

export type LeftHubblepupVicken<TVoictent extends Voictent = Voictent> = {
  voictent: TVoictent;
  tropoignantInput: TVoictent['hubblepupTuple'][number];
  pinbetunfInput: TVoictent['hubblepupTuple'][number];
};

export type LeftGritionVicken<
  TVoictent extends OdeshinVoictent = OdeshinVoictent,
> = {
  voictent: TVoictent;
  tropoignantInput: TVoictent['hubblepupTuple'][number];
  pinbetunfInput: TVoictent['hubblepupTuple'][number]['grition'];
};

export type LeftVicken =
  | LeftVoictentVicken
  | LeftOdeshinVoictentVicken
  | LeftHubblepupVicken
  | LeftGritionVicken;

export type CoreLeftInputVickenFromLeftVicken<TLeftVicken extends LeftVicken> =
  TLeftVicken extends LeftVoictentVicken | LeftOdeshinVoictentVicken
    ? LeftInputVoictentVicken<AdaptedVoqueFromVoictent<TLeftVicken['voictent']>>
    : LeftInputHubblepupVicken<
        AdaptedVoqueFromVoictent<TLeftVicken['voictent']>
      >;

export type RightVoictentVicken<TVoictent extends Voictent = Voictent> = {
  voictent: TVoictent;
  tropoignantInput: TVoictent['hubblepupTuple'];
  pinbetunfInput: TVoictent['hubblepupTuple'];
};

export type RightOdeshinVoictentVicken<
  TVoictent extends OdeshinVoictent = OdeshinVoictent,
> = {
  voictent: TVoictent;
  tropoignantInput: TVoictent['hubblepupTuple'];
  pinbetunfInput: TVoictent['hubblepupTuple'][number]['grition'][];
};

export type RightHubblepupVicken<
  TVoictent extends Voictent = Voictent,
  TZornTuple extends ZornTuple = ZornTuple,
> = {
  voictent: TVoictent;
  zornTuple: TZornTuple;
  tropoignantInput: {
    [Index in keyof TZornTuple]: TVoictent['hubblepupTuple'][number];
  };
  pinbetunfInput: {
    [Index in keyof TZornTuple]: TVoictent['hubblepupTuple'][number];
  };
};

export type RightGritionVicken<
  TVoictent extends OdeshinVoictent = OdeshinVoictent,
  TZornTuple extends ZornTuple = ZornTuple,
> = {
  voictent: TVoictent;
  zornTuple: TZornTuple;
  tropoignantInput: {
    [Index in keyof TZornTuple]: TVoictent['hubblepupTuple'][number];
  };
  pinbetunfInput: {
    [Index in keyof TZornTuple]: TVoictent['hubblepupTuple'][number]['grition'];
  };
};

export type RightVicken =
  | RightVoictentVicken
  | RightOdeshinVoictentVicken
  | RightHubblepupVicken
  | RightGritionVicken;

export type RightVickenTuple = Tuple<RightVicken>;

export type AppendRightVickenToTuple<
  TRightVickenTuple extends RightVickenTuple,
  TNextRightVicken extends RightVicken,
> = [...TRightVickenTuple, TNextRightVicken];

export type CoreRightInputVickenFromRightVicken<
  TRightVicken extends RightVicken,
> = TRightVicken extends RightHubblepupVicken | RightGritionVicken
  ? RightInputHubblepupTupleVicken<
      AdaptedVoqueFromVoictent<TRightVicken['voictent']>,
      TRightVicken['zornTuple']
    >
  : RightInputVoictentVicken<
      AdaptedVoqueFromVoictent<TRightVicken['voictent']>
    >;

export type CoreRightInputVickenTupleFromRightVickenTuple<
  TRightVickenTuple extends RightVickenTuple,
> = {
  [Index in keyof TRightVickenTuple]: CoreRightInputVickenFromRightVicken<
    TRightVickenTuple[Index]
  >;
};

// I DONT THINK VICKEN IS THE RIGHT TERM HERE, BUT WE'LL DEAL WITH THAT LATER(tm)
export type OutputVoictentVicken<TVoictent extends Voictent = Voictent> = {
  voictent: TVoictent;
  pinbeOutput: TVoictent['hubblepupTuple'];
};

export type OutputOdeshinVoictentVicken<
  TVoictent extends OdeshinVoictent = OdeshinVoictent,
> = {
  voictent: TVoictent;
  pinbeOutput: TVoictent['hubblepupTuple'][number]['grition'][];
};

export type OutputHubblepupVicken<TVoictent extends Voictent = Voictent> = {
  voictent: TVoictent;
  pinbeOutput: TVoictent['hubblepupTuple'][number];
};

export type OutputGritionVicken<
  TVoictent extends OdeshinVoictent = OdeshinVoictent,
> = {
  voictent: TVoictent;
  pinbeOutput: TVoictent['hubblepupTuple'][number]['grition'];
};

export type OutputVicken =
  | OutputVoictentVicken
  | OutputOdeshinVoictentVicken
  | OutputHubblepupVicken
  | OutputGritionVicken;

export type OutputVickenTuple = Tuple<OutputVicken>;

export type AppendOutputVickenToTuple<
  TOutputVickenTuple extends OutputVickenTuple,
  TNextOutputVicken extends OutputVicken,
> = [...TOutputVickenTuple, TNextOutputVicken];

export type CoreOutputVickenFromOutputVickenTuple<
  TOutputVickenTuple extends OutputVickenTuple,
> = CoreOutputVicken<{
  [Index in keyof TOutputVickenTuple]: AdaptedVoqueFromVoictent<
    TOutputVickenTuple[Index]['voictent']
  >;
}>;
