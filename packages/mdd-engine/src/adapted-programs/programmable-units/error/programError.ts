import { StreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';
import { TypeScriptObjectInstance } from '../../../package-agnostic-utilities/object/typeScriptObject';

export enum ProgramErrorElementLocatorTypeName {
  SourceFileLocator = 'SourceFileLocator',
  ReportingProgrammedTransformLocator = 'ReportingProgrammedTransformLocator',
}

type FileErrorLocator = {
  typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator;
  filePath: string;
};

export type ReportingProgrammedTransformLocator<
  TProgrammedTransformName extends string,
> = {
  typeName: ProgramErrorElementLocatorTypeName.ReportingProgrammedTransformLocator;
  name: TProgrammedTransformName;
  filePath: string;
};

type GenericReportingProgrammedTransformLocator =
  ReportingProgrammedTransformLocator<string>;

type UnsafeReportingProgrammedTransformLocator =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ReportingProgrammedTransformLocator<any>;

// TODO: add more locator types as needed
type ProgramErrorSourceLocator = FileErrorLocator | null;

// TODO: add more locator types as needed
type GenericProgramErrorReporterLocator =
  GenericReportingProgrammedTransformLocator;

type UnsafeProgramErrorReporterLocator =
  UnsafeReportingProgrammedTransformLocator;

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
 * @todo remove the ReporterLocator concept in favor of the source concept. You can use LocatableError as well
 *
 * @readableName ProgramError
 *
 * @canonicalDeclaration
 */
type ProgramError<TReporterLocator extends GenericProgramErrorReporterLocator> =

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

type ProgramErrorStreamMetatype<
  TReporterLocator extends GenericProgramErrorReporterLocator,
> = StreamMetatype<
  ProgramErrorCollectionId,
  ProgramErrorEgg<TReporterLocator>,
  ProgramError<TReporterLocator>,
  {
    id: string;
  },
  ProgramError<TReporterLocator>[]
>;

export type GenericProgramErrorStreamMetatype =
  ProgramErrorStreamMetatype<GenericProgramErrorReporterLocator>;

export type UnsafeProgramErrorStreamMetatype =
  ProgramErrorStreamMetatype<UnsafeProgramErrorReporterLocator>;
