import { GenericLeftInputVicken } from '../../vicken/leftInputVicken';

/**
 * The stream configuration for a left input
 */
export type LeftInputAppreffinge<
  TLeftInputVicken extends GenericLeftInputVicken,
> = {
  gepp: TLeftInputVicken['voque']['gepp'];
  isWibiz: TLeftInputVicken['isWibiz'];
};

export type GenericLeftInputAppreffinge =
  LeftInputAppreffinge<GenericLeftInputVicken>;
