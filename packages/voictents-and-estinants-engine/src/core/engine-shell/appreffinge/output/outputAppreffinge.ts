import { GenericOutputVicken } from '../../vicken/outputVicken';

/**
 * An output stream configuration for an estinant
 */
export type OutputAppreffinge<TOutputVicken extends GenericOutputVicken> = {
  geppTuple: TOutputVicken['geppTuple'];
};
