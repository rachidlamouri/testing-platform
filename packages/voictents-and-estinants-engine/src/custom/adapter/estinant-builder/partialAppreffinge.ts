import { GenericVoque } from '../../../core/engine/voque';

export type PartialLeftInputAppreffinge<TInputVoque extends GenericVoque> = {
  gepp: TInputVoque['gepp'];
};

export type PartialOutputAppreffinge<TOutputVoque extends GenericVoque> = {
  gepp: TOutputVoque['gepp'];
};
