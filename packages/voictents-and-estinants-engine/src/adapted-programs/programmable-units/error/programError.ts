import { Voque } from '../../../core/engine/voque';
import { TypeScriptObjectInstance } from '../../../utilities/typed-datum/type-script/object';

export enum ProgramErrorElementLocatorTypeName {
  SourceFileLocator = 'SourceFileLocator',
  ReportingEstinantLocator = 'ReportingEstinantLocator',
}

type FileErrorLocator = {
  typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator;
  filePath: string;
};

export type ReportingEstinantLocator<TEstinantName extends string> = {
  typeName: ProgramErrorElementLocatorTypeName.ReportingEstinantLocator;
  name: TEstinantName;
  filePath: string;
};

type GenericReportingEstinantLocator = ReportingEstinantLocator<string>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnsafeReportingEstinantLocator = ReportingEstinantLocator<any>;

// TODO: add more locator types as needed
type ProgramErrorSourceLocator = FileErrorLocator | null;

// TODO: add more locator types as needed
type GenericProgramErrorReporterLocator = GenericReportingEstinantLocator;

type UnsafeProgramErrorReporterLocator = UnsafeReportingEstinantLocator;

export type ProgramErrorPelue<
  TReporterLocator extends GenericProgramErrorReporterLocator,
> =
  | {
      name: string;
      error: Error;
      reporterLocator: TReporterLocator;
      sourceLocator: ProgramErrorSourceLocator;
      context: TypeScriptObjectInstance | null;
    }
  | Error;

export type ReportedProgramError<
  TReporterLocator extends GenericProgramErrorReporterLocator,
> = ProgramErrorPelue<TReporterLocator>;

export type GenericProgramErrorPelue =
  ProgramErrorPelue<GenericProgramErrorReporterLocator>;

/**
 * The information needed to identify the source of an error, the reporter of an
 * error and any surrounding context
 */
type ProgramErrorPelie<
  TReporterLocator extends GenericProgramErrorReporterLocator,
> =
  | {
      zorn: string;
      name: string;
      message: string;
      stackTrace: string[];
      reporterLocator: TReporterLocator;
      sourceLocator: ProgramErrorSourceLocator;
      context: TypeScriptObjectInstance | null;
      serializedContextFilePath: string;
      normalizedZorn: string;
      byReporterDirectoryPath: string;
      bySourceDirectoryPath: string;
      contextFilePath: string;
    }
  | Error;

export const PROGRAM_ERROR_GEPP = 'program-error';

export type ProgramErrorGepp = typeof PROGRAM_ERROR_GEPP;

type ProgramErrorVoque<
  TReporterLocator extends GenericProgramErrorReporterLocator,
> = Voque<
  ProgramErrorGepp,
  ProgramErrorPelue<TReporterLocator>,
  ProgramErrorPelie<TReporterLocator>,
  {
    zorn: string;
  },
  ProgramErrorPelie<TReporterLocator>[]
>;

export type GenericProgramErrorVoque =
  ProgramErrorVoque<GenericProgramErrorReporterLocator>;

export type UnsafeProgramErrorVoque =
  ProgramErrorVoque<UnsafeProgramErrorReporterLocator>;