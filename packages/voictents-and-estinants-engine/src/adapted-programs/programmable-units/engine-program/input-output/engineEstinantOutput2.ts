import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { getTextDigest } from '../../../../package-agnostic-utilities/string/getTextDigest';
import { getId } from '../../../../layer-agnostic-utilities/deprecated-id/getId';
import { EngineEstinantLocator2 } from '../engineEstinantLocator2';
import { EngineVoqueLocator2 } from '../engineVoqueLocator2';

type BaseEstinantOutput2 = {
  // TODO: delete "voictentName" in favor of "voqueLocator"
  collectionName: string;
  streamMetatypeLocator?: EngineVoqueLocator2;
  isInput: false;
  index?: never;
  estinantLocator: EngineEstinantLocator2;
  estinantName: string;
};

type EstinantOutput2Prototype = {
  get id(): string;
  get oldId(): string;
};

/**
 * The model of a transform output
 *
 * @readableName ProgrammedTransformOutputStreamModel
 */
export type EngineEstinantOutput2 = ObjectWithPrototype<
  BaseEstinantOutput2,
  EstinantOutput2Prototype
>;

export const { EstinantOutput2Instance } = buildConstructorFunctionWithName(
  'EstinantOutput2Instance',
)<BaseEstinantOutput2, EstinantOutput2Prototype>({
  id: (output) => {
    return getId([
      'output',
      output.collectionName,
      output.estinantLocator.id.forHuman,
    ]);
  },
  oldId: (output) => {
    return getTextDigest(output.id);
  },
});

export const PROGRAMMED_TRANSFORM_OUTPUT_2_COLLECTION_ID = 'estinant-output-2';

type EstinantOutput2Gepp = typeof PROGRAMMED_TRANSFORM_OUTPUT_2_COLLECTION_ID;

export type EngineProgrammedTransformOutput2StreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    EstinantOutput2Gepp,
    EngineEstinantOutput2
  >;
