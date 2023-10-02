import { EstinantSource } from './estinantSource';
import { ExportedIdentifierSource } from './exportedIdentifierSource';
import { FileLineSource } from './fileLineSource';
import { FileSource } from './fileSource';
import { ImportedIdentifierSource } from './importedIdentifierSource';

/**
 * A source that does not recursively contain other sources
 */
export type LeafSource =
  | FileSource
  | FileLineSource
  | ImportedIdentifierSource
  | ExportedIdentifierSource
  | EstinantSource;
