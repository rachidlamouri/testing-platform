import { StreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';
import { TypeScriptObjectInstance } from '../../../package-agnostic-utilities/object/typeScriptObject';

export enum ProgramErrorElementLocatorTypeName {
  SourceFileLocator = 'SourceFileLocator',
  ReportingProgrammedTransformLocator = 'ReportingEstinantLocator',
}

type FileErrorLocator = {
  typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator;
  filePath: string;
};

export type ReportingProgrammedTransformLocator<TEstinantName extends string> =
  {
    typeName: ProgramErrorElementLocatorTypeName.ReportingProgrammedTransformLocator;
    name: TEstinantName;
    filePath: string;
  };

type GenericReportingEstinantLocator =
  ReportingProgrammedTransformLocator<string>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnsafeReportingEstinantLocator = ReportingProgrammedTransformLocator<any>;

// TODO: add more locator types as needed
type ProgramErrorSourceLocator = FileErrorLocator | null;

// TODO: add more locator types as needed
type GenericProgramErrorReporterLocator = GenericReportingEstinantLocator;

type UnsafeProgramErrorReporterLocator = UnsafeReportingEstinantLocator;

/**
 * Represents an error that occurred while a program is running. Errors can be
 * thrown by the engine or the program
 *
 * @readableName ProgramErrorEgg
 *
 * @todo Convert ProgramError to a subclass of Error or just get rid of it
 */
export type ProgramErrorEgg<
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
> = ProgramErrorEgg<TReporterLocator>;

export type GenericProgramErrorEgg =
  ProgramErrorEgg<GenericProgramErrorReporterLocator>;

/**
 * The information needed to identify the source of an error, the reporter of an
 * error and any surrounding context
 *
 * @readableName ProgramError
 *
 * @canonicalDeclaration
 */
type ProgramErrorPelie<
  TReporterLocator extends GenericProgramErrorReporterLocator,
> =
  | {
      id: string;
      name: string;
      message: string;
      stackTrace: string[];
      reporterLocator: TReporterLocator;
      sourceLocator: ProgramErrorSourceLocator;
      context: TypeScriptObjectInstance | null;
      serializedContextFilePath: string;
      normalizedId: string;
      byReporterDirectoryPath: string;
      bySourceDirectoryPath: string;
      contextFilePath: string;
    }
  | Error;

export const PROGRAM_ERROR_COLLECTION_ID = 'program-error';

export type ProgramErrorCollectionId = typeof PROGRAM_ERROR_COLLECTION_ID;

type ProgramErrorVoque<
  TReporterLocator extends GenericProgramErrorReporterLocator,
> = StreamMetatype<
  ProgramErrorCollectionId,
  ProgramErrorEgg<TReporterLocator>,
  ProgramErrorPelie<TReporterLocator>,
  {
    id: string;
  },
  ProgramErrorPelie<TReporterLocator>[]
>;

export type GenericProgramErrorStreamMetatype =
  ProgramErrorVoque<GenericProgramErrorReporterLocator>;

export type UnsafeProgramErrorVoque =
  ProgramErrorVoque<UnsafeProgramErrorReporterLocator>;
