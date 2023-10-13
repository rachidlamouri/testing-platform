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
export type CoreTransform2<
  TLeftStreamConnectionMetatype extends GenericLeftInputStreamConnectionMetatype,
  TRightStreamConnectionMetatypeTuple extends GenericRightInputStreamConnectionMetatypeTuple,
  TOutputStreamConnectionMetatype extends GenericOutputStreamConnectionMetatype,
> = (
  leftInput: TLeftStreamConnectionMetatype['coreTransformInput'],
  ...rightInputTuple: RightInputStreamConnectionMetatypeTupleCoreTransformInputTuple<TRightStreamConnectionMetatypeTuple>
) => TOutputStreamConnectionMetatype['coreTransformOutput'];

export type GenericCoreTransform2 = CoreTransform2<
  GenericLeftInputStreamConnectionMetatype,
  GenericRightInputStreamConnectionMetatypeTuple,
  GenericOutputStreamConnectionMetatype
>;
