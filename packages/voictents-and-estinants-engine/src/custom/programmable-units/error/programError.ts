import { TypeScriptObjectInstance } from '../../../utilities/typed-datum/type-script/object';
import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export enum ErrorLocatorTypeName {
  FileErrorLocator = 'FileErrorLocator',
}

export type FileErrorLocator = {
  typeName: ErrorLocatorTypeName.FileErrorLocator;
  filePath: string;
};

// TODO: add more locator types as needed
export type ProgramErrorLocator = FileErrorLocator | null;

export type ProgramError = {
  message: string;
  locator: ProgramErrorLocator;
  metadata: TypeScriptObjectInstance | null;
};

export type ProgramErrorGrition = Grition<ProgramError>;

export type ProgramErrorOdeshin = OdeshinFromGrition<ProgramErrorGrition>;

export const PROGRAM_ERROR_GEPP = 'program-error';

export type ProgramErrorGepp = typeof PROGRAM_ERROR_GEPP;

export type ProgramErrorVoictent = Voictent<
  ProgramErrorGepp,
  ProgramErrorOdeshin
>;
