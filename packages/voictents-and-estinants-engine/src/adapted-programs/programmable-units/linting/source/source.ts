import { EstinantSource } from './estinantSource';
import { ExportedIdentifierSource } from './exportedIdentifierSource';
import { FileLineSource } from './fileLineSource';
import { FileSource } from './fileSource';
import { ImportedIdentifierSource } from './importedIdentifierSource';

export type Source =
  | FileSource
  | FileLineSource
  | ImportedIdentifierSource
  | ExportedIdentifierSource
  | EstinantSource;
