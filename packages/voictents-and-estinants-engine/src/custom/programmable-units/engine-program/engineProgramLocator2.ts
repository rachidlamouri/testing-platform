import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/buildConstructorFunction';
import { getFileZorn } from '../../../utilities/getFileZorn';
import { getZornableId } from '../../../utilities/getZornableId';
import { EngineEstinantLocator2 } from './engineEstinantLocator2';
import { EngineVoqueLocator } from './engineVoqueLocator';

export type VoictentLocator = {
  name: string;
  hasInitialInput: boolean;
};

type BaseEngineProgramLocator2 = {
  programName: string;
  description: string;
  filePath: string;
  engineVoqueLocatorList: EngineVoqueLocator[];
  voictentLocatorList: VoictentLocator[];
  engineEstinantLocatorList: EngineEstinantLocator2[];
};

type EngineProgramLocator2Prototype = {
  get zorn(): string;
  get id(): string;
};

/**
 * The information needed to find the parts of an engine program so that it can
 * be assembled later into a complete model
 */
export type TEngineProgramLocator2 = ObjectWithPrototype<
  BaseEngineProgramLocator2,
  EngineProgramLocator2Prototype
>;

export const getEngineProgramLocatorZorn = getFileZorn;

export const { EngineProgramLocator2Instance } =
  buildConstructorFunctionWithName('EngineProgramLocator2Instance')<
    BaseEngineProgramLocator2,
    EngineProgramLocator2Prototype
  >({
    zorn: getEngineProgramLocatorZorn,
    id: getZornableId,
  });

export const ENGINE_PROGRAM_LOCATOR_2_GEPP = 'engine-program-locator-2';

type EngineProgramLocator2Gepp = typeof ENGINE_PROGRAM_LOCATOR_2_GEPP;

export type EngineProgramLocator2Voque = InMemoryOdeshin2Voque<
  EngineProgramLocator2Gepp,
  TEngineProgramLocator2
>;
