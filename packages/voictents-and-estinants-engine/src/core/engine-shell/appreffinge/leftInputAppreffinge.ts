import { GenericLeftInputVicken } from '../vicken/leftInputVicken';

export type LeftInputAppreffinge<
  TLeftInputVicken extends GenericLeftInputVicken,
> = {
  gepp: TLeftInputVicken['gepp'];
  isWibiz: TLeftInputVicken['isWibiz'];
};
