import { GenericVoque } from '../../../core/engine/voque';
import { ZornTuple2 } from '../../../utilities/semantic-types/zorn';
import { GenericAdaptedLeftInputVicken } from './vicken';

export type PartialLeftInputAppreffinge<TLeftInputVoque extends GenericVoque> =
  {
    gepp: TLeftInputVoque['gepp'];
  };

export type PartialRightHubblepupTupleAppreffinge<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TRightInputVoque extends GenericVoque,
  TZornTuple extends ZornTuple2,
> = {
  gepp: TRightInputVoque['gepp'];
  framate: (
    leftInput: TAdaptedLeftInputVicken['tropoignantInput'],
  ) => TZornTuple;
  croard: (
    rightInput: TRightInputVoque['indexedEmittedHubblepup'],
  ) => TZornTuple[number];
};

export type GenericPartialRightHubblepupTupleAppreffinge =
  PartialRightHubblepupTupleAppreffinge<
    GenericAdaptedLeftInputVicken,
    GenericVoque,
    ZornTuple2
  >;

export type PartialRightVoictentAppreffinge<
  TRightInputVoque extends GenericVoque,
> = {
  gepp: TRightInputVoque['gepp'];
};

export type PartialOutputAppreffinge<TOutputVoque extends GenericVoque> = {
  gepp: TOutputVoque['gepp'];
};
