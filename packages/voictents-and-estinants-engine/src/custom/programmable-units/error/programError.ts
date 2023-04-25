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

export type ProgramErrorId<TPrefix extends string = string> =
  `${TPrefix}/${string}`;

export type ProgramError<TPrefix extends string = string> = {
  errorId?: ProgramErrorId<TPrefix>;
  message: string;
  locator: ProgramErrorLocator;
  metadata: TypeScriptObjectInstance | null;
};

export type ProgramErrorGrition<TPrefix extends string = string> = Grition<
  ProgramError<TPrefix>
>;

export type ProgramErrorOdeshin<TPrefix extends string = string> =
  OdeshinFromGrition<ProgramErrorGrition<TPrefix>>;

export const PROGRAM_ERROR_GEPP = 'program-error';

export type ProgramErrorGepp = typeof PROGRAM_ERROR_GEPP;

export type ProgramErrorVoictent<TPrefix extends string = string> = Voictent<
  ProgramErrorGepp,
  ProgramErrorOdeshin<TPrefix>
>;
