import { EstinantSource } from './estinantSource';
import { ExportedIdentifierSource } from './exportedIdentifierSource';
import { ImportedIdentifierSource } from './importedIdentifierSource';

export type Source =
  | ImportedIdentifierSource
  | ExportedIdentifierSource
  | EstinantSource;
