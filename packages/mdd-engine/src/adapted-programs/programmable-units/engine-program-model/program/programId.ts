import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';

export enum ProgramTypeName {
  Core = 'core',
  Adapted = 'adapted',
}

const PROGRAM_ID_TEMPLATE = [
  ['typeName', [ProgramTypeName.Core, ProgramTypeName.Adapted]],
  'programName',
] as const satisfies GenericComplexIdTemplate;
type ProgramIdTemplate = typeof PROGRAM_ID_TEMPLATE;

/**
 * ProgramId
 */
export class ProgramId extends ComplexId<ProgramIdTemplate> {
  get rawTemplate(): ProgramIdTemplate {
    return PROGRAM_ID_TEMPLATE;
  }
}
