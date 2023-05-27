import { Voque } from '../../../core/engine/voque';
import { TypeScriptObjectInstance } from '../../../utilities/typed-datum/type-script/object';

export enum ProgramError2ElementLocatorTypeName {
  SourceFileLocator = 'SourceFileLocator',
  ReportingEstinantLocator = 'ReportingEstinantLocator',
}

export type FileErrorLocator = {
  typeName: ProgramError2ElementLocatorTypeName.SourceFileLocator;
  filePath: string;
};

export type ReportingEstinantLocator<TEstinantName extends string> = {
  typeName: ProgramError2ElementLocatorTypeName.ReportingEstinantLocator;
  name: TEstinantName;
  filePath: string;
};

export type GenericReportingEstinantLocator = ReportingEstinantLocator<string>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnsafeReportingEstinantLocator = ReportingEstinantLocator<any>;

// TODO: add more locator types as needed
export type ProgramError2SourceLocator = FileErrorLocator;

// TODO: add more locator types as needed
export type GenericProgramError2ReporterLocator =
  GenericReportingEstinantLocator;

export type UnsafeProgramError2ReporterLocator = UnsafeReportingEstinantLocator;

export type ReceivedProgramError2<
  TReporterLocator extends GenericProgramError2ReporterLocator,
> = {
  name: string;
  error: Error;
  reporterLocator: TReporterLocator;
  sourceLocator: ProgramError2SourceLocator;
  context: TypeScriptObjectInstance | null;
};

export type ReportedProgramError2<
  TReporterLocator extends GenericProgramError2ReporterLocator,
> = ReceivedProgramError2<TReporterLocator>;

export type GenericReceivedProgramError2 =
  ReceivedProgramError2<GenericProgramError2ReporterLocator>;

export type EmittedProgramError2<
  TReporterLocator extends GenericProgramError2ReporterLocator,
> = {
  zorn: string;
  name: string;
  message: string;
  stackTrace: string[];
  reporterLocator: TReporterLocator;
  sourceLocator: ProgramError2SourceLocator;
  context: TypeScriptObjectInstance | null;
  serializedContextFilePath: string;
  normalizedZorn: string;
  byReporterDirectoryPath: string;
  bySourceDirectoryPath: string;
  contextFilePath: string;
};

export type GenericEmittedProgramError2 =
  EmittedProgramError2<GenericProgramError2ReporterLocator>;

export const PROGRAM_ERROR_2_GEPP = 'program-error-2';

export type ProgramError2Gepp = typeof PROGRAM_ERROR_2_GEPP;

export type ProgramError2Voque<
  TReporterLocator extends GenericProgramError2ReporterLocator,
> = Voque<
  ProgramError2Gepp,
  ReceivedProgramError2<TReporterLocator>,
  EmittedProgramError2<TReporterLocator>,
  {
    zorn: string;
  },
  EmittedProgramError2<TReporterLocator>[]
>;

export type GenericProgramError2Voque =
  ProgramError2Voque<GenericProgramError2ReporterLocator>;

export type UnsafeProgramError2Voque =
  ProgramError2Voque<UnsafeProgramError2ReporterLocator>;
