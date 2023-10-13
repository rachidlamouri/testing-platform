import { Tuple } from '../../../package-agnostic-utilities/type/tuple';

import { LeftInputStreamConfiguration } from '../appreffinge/input/leftInputAppreffinge';
import { OutputStreamConfiguration } from '../appreffinge/output/outputAppreffinge';
import { InputStreamConnectionMetatypeTupleToRightInputStreamConfigurationTuple } from '../appreffinge/input/right/rightInputAppreffinge';
import { GenericLeftInputStreamConnectionMetatype } from '../stream-connection-metatype/leftInputStreamConnectionMetatype';
import {
  GenericOutputStreamConnectionMetatype,
  UnsafeOutputStreamConnectionMetatype,
} from '../stream-connection-metatype/outputStreamConnectionMetatype';
import { GenericRightInputStreamConnectionMetatypeTuple } from '../stream-connection-metatype/rightInputStreamConnectionMetatype';
import { CoreTransform2 } from './coreTransform';

/**
 * A core transform plus its input and output stream configurations.
 *
 * @readableName ProgrammedTransform
 *
 * @canonicalDeclaration
 */
export type ProgrammedTransform2<
  TLeftInputStreamConnectionMetatype extends GenericLeftInputStreamConnectionMetatype,
  TRightInputStreamConnectionMetatypeTuple extends GenericRightInputStreamConnectionMetatypeTuple,
  TOutputStreamConnectionMetatype extends UnsafeOutputStreamConnectionMetatype,
> = {
  version: 2;
  name: string;
  leftInputStreamConfiguration: LeftInputStreamConfiguration<TLeftInputStreamConnectionMetatype>;
  rightInputStreamConfigurationTuple: InputStreamConnectionMetatypeTupleToRightInputStreamConfigurationTuple<
    TLeftInputStreamConnectionMetatype,
    TRightInputStreamConnectionMetatypeTuple
  >;
  outputStreamConfiguration: OutputStreamConfiguration<TOutputStreamConnectionMetatype>;
  transform: CoreTransform2<
    TLeftInputStreamConnectionMetatype,
    TRightInputStreamConnectionMetatypeTuple,
    TOutputStreamConnectionMetatype
  >;
};

export type GenericProgrammedTransform2 = ProgrammedTransform2<
  GenericLeftInputStreamConnectionMetatype,
  GenericRightInputStreamConnectionMetatypeTuple,
  GenericOutputStreamConnectionMetatype
>;

export type GenericProgrammedTransform2Tuple =
  Tuple<GenericProgrammedTransform2>;

// TODO: figure out which one of these don't need to be "any"
// TODO: Tie this type back to "Estinant2" somehow
export type UnsafeProgrammedTransform2 = {
  version: 2;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  leftInputStreamConfiguration: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rightInputStreamConfigurationTuple: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  outputStreamConfiguration: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: any;
};

export type UnsafeProgrammedTransform2Tuple = Tuple<UnsafeProgrammedTransform2>;
