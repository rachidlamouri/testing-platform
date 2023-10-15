import { ProgrammedTransformSource } from './programmedTransformSource';
import { ExportedIdentifierSource } from './exportedIdentifierSource';
import { FileLineColumnSource } from './fileLineColumnSource';
import { FileLineSource } from './fileLineSource';
import { FileSource } from './fileSource';
import { ImportedIdentifierSource } from './importedIdentifierSource';

/**
 * A source that does not recursively contain other sources
 */
export type LeafSource =
  | FileSource
  | FileLineSource
  | FileLineColumnSource
  | ImportedIdentifierSource
  | ExportedIdentifierSource
  | ProgrammedTransformSource;
