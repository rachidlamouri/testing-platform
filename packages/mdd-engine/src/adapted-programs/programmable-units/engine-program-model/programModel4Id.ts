import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';

const PROGRAM_MODEL_4_ID_TEMPLATE = [
  'filePath',
] as const satisfies GenericComplexIdTemplate;
type ProgramModel4IdTemplate = typeof PROGRAM_MODEL_4_ID_TEMPLATE;

/**
 * ProgramModel4Id
 */
export class ProgramModel4Id extends ComplexId<ProgramModel4IdTemplate> {
  get rawTemplate(): ProgramModel4IdTemplate {
    return PROGRAM_MODEL_4_ID_TEMPLATE;
  }
}
