import { GenericLeftInputVicken } from '../../vicken/leftInputVicken';

export type LeftInputAppreffinge<
  TLeftInputVicken extends GenericLeftInputVicken,
> = {
  gepp: TLeftInputVicken['voque']['gepp'];
  isWibiz: TLeftInputVicken['isWibiz'];
};

export type GenericLeftInputAppreffinge =
  LeftInputAppreffinge<GenericLeftInputVicken>;
