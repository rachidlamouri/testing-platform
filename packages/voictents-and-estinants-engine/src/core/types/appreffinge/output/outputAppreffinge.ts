import { GenericOutputVicken } from '../../vicken/outputVicken';

/**
 * Determines zero or more collections that will receive data from the output of
 * a transform. Because of duck typing, a transform can technically return a
 * superset of data that targets more collections than expected. This can result
 * in unwanted updates to collections, so as a safeguard, the engine uses this
 * configuration to limit which output collections receive data.
 *
 * @readableName OutputStreamGroupConfiguration
 */
export type OutputAppreffinge<TOutputVicken extends GenericOutputVicken> = {
  geppTuple: TOutputVicken['geppTuple'];
};
