import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../../package-agnostic-utilities/data-structure/id';
import { ProgrammedTransformId } from '../programmedTransformId';

const PROGRAMMED_TRANSFORM_OUTPUT_ID_TEMPLATE = [
  ['programmedTransform', ProgrammedTransformId],
  ['type', ['output']],
  'index',
] as const satisfies GenericComplexIdTemplate;
type ProgrammedTransformOutputIdTemplate =
  typeof PROGRAMMED_TRANSFORM_OUTPUT_ID_TEMPLATE;
export class ProgrammedTransformOutputId extends ComplexId<ProgrammedTransformOutputIdTemplate> {
  get rawTemplate(): ProgrammedTransformOutputIdTemplate {
    return PROGRAMMED_TRANSFORM_OUTPUT_ID_TEMPLATE;
  }
}
