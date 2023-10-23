import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../../package-agnostic-utilities/data-structure/id';
import { ProgrammedTransformId } from '../programmedTransformId';

const PROGRAMMED_TRANSFORM_INPUT_ID_TEMPLATE = [
  ['programmedTransform', ProgrammedTransformId],
  ['type', ['input']],
  'index',
] as const satisfies GenericComplexIdTemplate;
type ProgrammedTransformInputIdTemplate =
  typeof PROGRAMMED_TRANSFORM_INPUT_ID_TEMPLATE;

export class ProgrammedTransformInputId extends ComplexId<ProgrammedTransformInputIdTemplate> {
  get rawTemplate(): ProgrammedTransformInputIdTemplate {
    return PROGRAMMED_TRANSFORM_INPUT_ID_TEMPLATE;
  }
}
