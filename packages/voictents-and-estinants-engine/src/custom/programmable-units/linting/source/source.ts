import { EstinantSource } from './estinantSource';
import { ExportedIdentifierSource } from './exportedIdentifierSource';
import { FileSource } from './fileSource';
import { ImportedIdentifierSource } from './importedIdentifierSource';

export type Source =
  | FileSource
  | ImportedIdentifierSource
  | ExportedIdentifierSource
  | EstinantSource;
