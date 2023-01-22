import { UnknownDatumInstance } from './datumInstance';

export type KnownDatumSemanticsProcessorResult = boolean;

export type UnknownDatumSemanticsProcessorResult = null;

export type DatumSemanticsProcessorResult =
  | KnownDatumSemanticsProcessorResult
  | UnknownDatumSemanticsProcessorResult;

export type DatumSemanticsProcessorTypeParameter = {
  Instance: UnknownDatumInstance;
  Result: DatumSemanticsProcessorResult;
};

export type DatumSemanticsProcessor<
  T extends DatumSemanticsProcessorTypeParameter,
> = (instance: T['Instance']) => T['Result'];

export type UnknownDatumSemanticsProcessor = DatumSemanticsProcessor<{
  Instance: UnknownDatumInstance;
  Result: KnownDatumSemanticsProcessorResult;
}>;
