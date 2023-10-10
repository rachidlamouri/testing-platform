import { ZornTuple } from '../../../../../package-agnostic-utilities/data-structure/zorn';
import { GenericIndexedHubblepup } from '../../../hubblepup/hubblepup';
import { GenericLeftInputVicken } from '../../../vicken/leftInputVicken';
import { GenericRightInputHubblepupTupleVicken } from '../../../vicken/rightInputVicken';

/**
 * A function that takes the leftmost input of a transform input group and
 * outputs a key tuple for the associated right inputs of a particular stream
 * connection. This allows the engine to look up the associated right inputs by key and
 * coordinate triggering a transform when an input group has all items.
 *
 * @readableName RightKeyTupleAccessor
 */
export type Framation = (
  leftIndexedHubblepup: GenericIndexedHubblepup,
) => ZornTuple;

export type Framation3<
  TLeftInputVicken extends GenericLeftInputVicken,
  TRightInputVicken extends GenericRightInputHubblepupTupleVicken,
> = (
  leftTropoignantInput: TLeftInputVicken['tropoignantInput'],
) => TRightInputVicken['zornTuple'];

export type GenericFramation3 = Framation3<
  GenericLeftInputVicken,
  GenericRightInputHubblepupTupleVicken
>;
