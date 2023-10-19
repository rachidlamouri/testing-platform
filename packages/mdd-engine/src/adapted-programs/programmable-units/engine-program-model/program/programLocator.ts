import Case from 'case';
import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

import { TypeScriptFile } from '../../type-script-file/typeScriptFile';
import {
  AdaptedEngineFunctionConfiguration,
  CoreEngineFunction2Configuration,
  EngineFunctionConfiguration,
} from '../engineFunctionConfiguration';
import { ProgramId, ProgramTypeName } from './programId';

type BaseProgramLocatorInput<
  TProgramTypeName extends ProgramTypeName,
  TEngineFunctionConfiguration extends EngineFunctionConfiguration,
> = {
  programTypeName: TProgramTypeName;
  programFile: TypeScriptFile;
  engineFunctionConfiguration: TEngineFunctionConfiguration;
};

export abstract class BaseProgramLocator<
  TProgramTypeName extends ProgramTypeName,
  TEngineFunctionConfiguration extends EngineFunctionConfiguration,
> {
  get id(): ProgramId {
    return this.programId;
  }

  programTypeName: TProgramTypeName;

  programId: ProgramId;

  programName: string;

  programFile: TypeScriptFile;

  engineFunctionConfiguration: TEngineFunctionConfiguration;

  get configurationTypeName(): TEngineFunctionConfiguration['typeName'] {
    return this.engineFunctionConfiguration.typeName;
  }

  constructor(
    input: BaseProgramLocatorInput<
      TProgramTypeName,
      TEngineFunctionConfiguration
    >,
  ) {
    const programName = Case.kebab(
      input.programFile.filePath.name.extensionless,
    );

    this.programTypeName = input.programTypeName;
    this.programId = new ProgramId({
      typeName: input.programTypeName,
      programName,
    });
    this.programName = programName;
    this.programFile = input.programFile;
    this.engineFunctionConfiguration = input.engineFunctionConfiguration;
  }
}

export class CoreProgramLocator extends BaseProgramLocator<
  ProgramTypeName.Core,
  CoreEngineFunction2Configuration
> {
  constructor(
    input: Omit<
      BaseProgramLocatorInput<
        ProgramTypeName.Core,
        CoreEngineFunction2Configuration
      >,
      'programTypeName'
    >,
  ) {
    super({
      programTypeName: ProgramTypeName.Core,
      ...input,
    });
  }
}

export class AdaptedProgramLocator extends BaseProgramLocator<
  ProgramTypeName.Adapted,
  AdaptedEngineFunctionConfiguration
> {
  constructor(
    input: Omit<
      BaseProgramLocatorInput<
        ProgramTypeName.Adapted,
        AdaptedEngineFunctionConfiguration
      >,
      'programTypeName'
    >,
  ) {
    super({
      programTypeName: ProgramTypeName.Adapted,
      ...input,
    });
  }
}

/**
 * The information needed to find a runEngine function call
 */
export type ProgramLocator = CoreProgramLocator | AdaptedProgramLocator;

export const PROGRAM_LOCATOR_COLLECTION_ID = 'program-locator';

type ProgramLocatorCollectionId = typeof PROGRAM_LOCATOR_COLLECTION_ID;

export type ProgramLocatorStreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    ProgramLocatorCollectionId,
    ProgramLocator
  >;
