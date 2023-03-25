import { OdeshinVoictent } from '../custom/adapter/odeshinVoictent';
import { Tuple } from '../utilities/semantic-types/tuple';
import { Zorn } from '../utilities/semantic-types/zorn';
import {
  Voictent,
  VoictentTuple,
  VoictentTupleToHubblepupTuple,
} from './voictent';

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
  TVoictentTuple extends Tuple<TVoictent> = Tuple<TVoictent>,
  TZorn extends Zorn = Zorn,
> = {
  voictent: TVoictent;
  voictentTuple: TVoictentTuple;
  zorn: TZorn;
  tropoignantInput: TVoictent['hubblepupTuple'][number];
  pinbetunfInput: {
    [Index in keyof TVoictentTuple]: TVoictent['hubblepupTuple'][number];
  };
};

export type RightGritionVicken<
  TVoictent extends OdeshinVoictent = OdeshinVoictent,
  TVoictentTuple extends Tuple<TVoictent> = Tuple<TVoictent>,
  TZorn extends Zorn = Zorn,
> = {
  voictent: TVoictent;
  voictentTuple: TVoictentTuple;
  zorn: TZorn;
  tropoignantInput: TVoictent['hubblepupTuple'][number];
  pinbetunfInput: {
    [Index in keyof TVoictentTuple]: TVoictent['hubblepupTuple'][number]['grition'];
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
