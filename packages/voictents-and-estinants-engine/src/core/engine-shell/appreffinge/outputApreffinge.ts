import { GenericOutputVicken } from '../vicken/outputVicken';

export type OutputAppreffinge<TOutputVicken extends GenericOutputVicken> = {
  geppTuple: TOutputVicken['geppTuple'];
};
