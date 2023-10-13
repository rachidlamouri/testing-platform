import { GenericLeftInputStreamConnectionMetatype } from '../stream-connection-metatype/leftInputStreamConnectionMetatype';
import { GenericOutputStreamConnectionMetatype } from '../stream-connection-metatype/outputStreamConnectionMetatype';
import {
  GenericRightInputStreamConnectionMetatypeTuple,
  RightInputStreamConnectionMetatypeTupleCoreTransformInputTuple,
} from '../stream-connection-metatype/rightInputStreamConnectionMetatype';

/**
 * A tranform with specific input and output datastructures that make it easy
 * for the engine to stream data.
 *
 * @todo define Transform
 *
 * @readableName CoreTransform
 */
export type Tropoignant2<
  TLeftVicken extends GenericLeftInputStreamConnectionMetatype,
  TRightVickenTuple extends GenericRightInputStreamConnectionMetatypeTuple,
  TOutputVicken extends GenericOutputStreamConnectionMetatype,
> = (
  leftInput: TLeftVicken['coreTransformInput'],
  ...rightInputTuple: RightInputStreamConnectionMetatypeTupleCoreTransformInputTuple<TRightVickenTuple>
) => TOutputVicken['coreTransformOutput'];

export type GenericTropoignant2 = Tropoignant2<
  GenericLeftInputStreamConnectionMetatype,
  GenericRightInputStreamConnectionMetatypeTuple,
  GenericOutputStreamConnectionMetatype
>;
