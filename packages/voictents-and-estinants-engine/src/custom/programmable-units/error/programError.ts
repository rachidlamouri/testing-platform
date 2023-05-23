import { StandardInMemoryVoque } from '../../../core/engine/inMemoryVoque';
import { TypeScriptObjectInstance } from '../../../utilities/typed-datum/type-script/object';
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

// TODO: make the type parameter required and make a GenericProgramError
export type ProgramError<TPrefix extends string = string> = {
  errorId?: ProgramErrorId<TPrefix>;
  message: string;
  locator: ProgramErrorLocator;
  metadata: TypeScriptObjectInstance | null;
};

export const PROGRAM_ERROR_GEPP = 'program-error';

export type ProgramErrorGepp = typeof PROGRAM_ERROR_GEPP;

export type ProgramErrorVoictent<TPrefix extends string = string> = Voictent<
  ProgramErrorGepp,
  ProgramError<TPrefix>
>;

export type ProgramErrorVoque<TPrefix extends string = string> =
  StandardInMemoryVoque<ProgramErrorGepp, ProgramError<TPrefix>>;
