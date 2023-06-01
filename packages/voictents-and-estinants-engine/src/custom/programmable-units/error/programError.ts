import { Voque } from '../../../core/engine/voque';
import { TypeScriptObjectInstance } from '../../../utilities/typed-datum/type-script/object';

export enum ProgramErrorElementLocatorTypeName {
  SourceFileLocator = 'SourceFileLocator',
  ReportingEstinantLocator = 'ReportingEstinantLocator',
}

export type FileErrorLocator = {
  typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator;
  filePath: string;
};

export type ReportingEstinantLocator<TEstinantName extends string> = {
  typeName: ProgramErrorElementLocatorTypeName.ReportingEstinantLocator;
  name: TEstinantName;
  filePath: string;
};

export type GenericReportingEstinantLocator = ReportingEstinantLocator<string>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnsafeReportingEstinantLocator = ReportingEstinantLocator<any>;

// TODO: add more locator types as needed
export type ProgramErrorSourceLocator = FileErrorLocator;

// TODO: add more locator types as needed
export type GenericProgramErrorReporterLocator =
  GenericReportingEstinantLocator;

export type UnsafeProgramErrorReporterLocator = UnsafeReportingEstinantLocator;

export type ReceivedProgramError<
  TReporterLocator extends GenericProgramErrorReporterLocator,
> = {
  name: string;
  error: Error;
  reporterLocator: TReporterLocator;
  sourceLocator: ProgramErrorSourceLocator;
  context: TypeScriptObjectInstance | null;
};

export type ReportedProgramError<
  TReporterLocator extends GenericProgramErrorReporterLocator,
> = ReceivedProgramError<TReporterLocator>;

export type GenericReceivedProgramError =
  ReceivedProgramError<GenericProgramErrorReporterLocator>;

/**
 * The information needed to identify the source of an error, the reporter of an
 * error and any surrounding context
 */
export type EmittedProgramError<
  TReporterLocator extends GenericProgramErrorReporterLocator,
> = {
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
};

export type GenericEmittedProgramError =
  EmittedProgramError<GenericProgramErrorReporterLocator>;

export const PROGRAM_ERROR_GEPP = 'program-error';

export type ProgramErrorGepp = typeof PROGRAM_ERROR_GEPP;

export type ProgramErrorVoque<
  TReporterLocator extends GenericProgramErrorReporterLocator,
> = Voque<
  ProgramErrorGepp,
  ReceivedProgramError<TReporterLocator>,
  EmittedProgramError<TReporterLocator>,
  {
    zorn: string;
  },
  EmittedProgramError<TReporterLocator>[]
>;

export type GenericProgramErrorVoque =
  ProgramErrorVoque<GenericProgramErrorReporterLocator>;

export type UnsafeProgramErrorVoque =
  ProgramErrorVoque<UnsafeProgramErrorReporterLocator>;
