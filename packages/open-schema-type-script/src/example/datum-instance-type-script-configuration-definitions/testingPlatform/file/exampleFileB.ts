// DatumInstanceTypeScriptConfiguration

import { DatumInstanceTypeScriptConfiguration } from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { FileTypeScriptSemanticsIdentifier } from './fileTypeScriptSemanticsIdentifier';
import {
  ExampleFileA,
  ExampleFileADatumInstanceAlias,
  ExampleFileADatumInstanceIdentifier,
} from './exampleFileA';
import { ExampleFileFileCommentText } from './exampleFile';

export type ExampleFileB<
  TExampleFileBStuffSemanticsIdentifier extends ExampleFileFileCommentText = ExampleFileFileCommentText,
> = ExampleFileA<TExampleFileBStuffSemanticsIdentifier>;

export type ExampleFileBDatumInstanceIdentifier =
  ExampleFileADatumInstanceIdentifier;

export type ExampleFileBDatumInstanceAlias = ExampleFileADatumInstanceAlias;

export type ExampleFileBTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifiers: [FileTypeScriptSemanticsIdentifier.ExampleFileB];
    datumInstanceIdentifier: ExampleFileBDatumInstanceIdentifier;
    datumInstance: ExampleFileB;
    datumInstanceAliases: [ExampleFileBDatumInstanceAlias];
  }>;

// TODO: make the file comment configurable to ignore this
export const buildExampleFileB = (): void => {};
