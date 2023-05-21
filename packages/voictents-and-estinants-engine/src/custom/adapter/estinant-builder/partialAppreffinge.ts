import { GenericVoque } from '../../../core/engine/voque';
import { ZornTuple } from '../../../utilities/semantic-types/zorn';
import { GenericAdaptedLeftInputVicken } from './vicken';

export type PartialLeftInputAppreffinge<TInputVoque extends GenericVoque> = {
  gepp: TInputVoque['gepp'];
};

export type PartialRightHubblepupTupleAppreffinge<
  TAdaptedLeftInputVicken extends GenericAdaptedLeftInputVicken,
  TInputVoque extends GenericVoque,
  TZornTuple extends ZornTuple,
> = {
  gepp: TInputVoque['gepp'];
  framate: (
    leftInput: TAdaptedLeftInputVicken['tropoignantInput'],
  ) => TZornTuple;
  croard: (
    rightInput: TInputVoque['indexedEmittedHubblepup'],
  ) => TZornTuple[number];
};

export type PartialOutputAppreffinge<TOutputVoque extends GenericVoque> = {
  gepp: TOutputVoque['gepp'];
};
