import { DatumSemanticsProcessorResult } from './datumSemanticsProcessor';
import { getIdentity } from '../utilities/getIdentity';

export type DatumSemanticsProcessorResultProcessor = (
  value: DatumSemanticsProcessorResult,
) => DatumSemanticsProcessorResult;

export const processDatumSemanticsProcessorResult: DatumSemanticsProcessorResultProcessor =
  getIdentity;
