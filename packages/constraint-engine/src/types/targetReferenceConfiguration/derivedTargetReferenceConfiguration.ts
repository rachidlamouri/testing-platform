import {
  DerivedReferenceBuilder,
  DerivedTargetReferenceBuilderInput,
  DerivedTargetReferenceBuilderInputAndOutput,
  DerivedTargetReferenceBuilderOutput,
} from '../builders/derivedReferenceBuilder';
import { TypedTargetTupleFromTargetReferenceTuple } from '../typedTargetFromTargetReference';
import { Merge } from '../utilityTypes/merge/merge';
import { MergeTuple } from '../utilityTypes/merge/mergeTuple';
import { RekeyConstrainedObject } from '../utilityTypes/rekeyObject/rekeyConstrainedObject';
import { RekeyObject } from '../utilityTypes/rekeyObject/rekeyObject';
import { TargetReferenceConfigurationTypeId } from './typeId';

type DerivedTargetReferenceConfigurationEngineInput = RekeyObject<
  { Object: DerivedTargetReferenceBuilderInput },
  {
    KeyMap: {
      InputTargetReferenceTuple: 'EngineInputTargetReferenceTuple';
    };
  }
>;

type DerivedTargetReferenceConfigurationConfigurationInput = RekeyObject<
  { Object: DerivedTargetReferenceBuilderInput },
  {
    KeyMap: {
      InputTargetReferenceTuple: 'ConfigurationInputTargetReferenceTuple';
    };
  }
>;

type DerivedTargetReferenceConfigurationInputAndOutput = MergeTuple<
  [
    DerivedTargetReferenceConfigurationEngineInput,
    DerivedTargetReferenceConfigurationConfigurationInput,
    DerivedTargetReferenceBuilderOutput,
  ]
>;

type BaseDerivedTargetReferenceConfiguration<
  T extends DerivedTargetReferenceConfigurationInputAndOutput,
> = {
  typeId: TargetReferenceConfigurationTypeId.DerivedTargetReferenceConfiguration;
  buildReferenceTuple: DerivedReferenceBuilder<
    RekeyConstrainedObject<
      {
        OldConstraintObject: DerivedTargetReferenceConfigurationInputAndOutput;
        NewConstraintObject: DerivedTargetReferenceBuilderInputAndOutput;
      },
      {
        ConstrainedObject: T;
        KeyMap: {
          EngineInputTargetReferenceTuple: 'InputTargetReferenceTuple';
        };
      }
    >
  >;
  inputTypedTargeTuple: TypedTargetTupleFromTargetReferenceTuple<
    T['ConfigurationInputTargetReferenceTuple']
  >;
};

export type DerivedTargetReferenceConfiguration<
  TDerivedTargetReferenceBuilderInputAndOutput extends DerivedTargetReferenceBuilderInputAndOutput,
> = BaseDerivedTargetReferenceConfiguration<
  Merge<
    RekeyConstrainedObject<
      {
        OldConstraintObject: DerivedTargetReferenceBuilderInputAndOutput;
        NewConstraintObject: DerivedTargetReferenceConfigurationInputAndOutput;
      },
      {
        ConstrainedObject: TDerivedTargetReferenceBuilderInputAndOutput;
        KeyMap: {
          InputTargetReferenceTuple: 'EngineInputTargetReferenceTuple';
        };
      }
    >,
    RekeyConstrainedObject<
      {
        OldConstraintObject: DerivedTargetReferenceBuilderInputAndOutput;
        NewConstraintObject: DerivedTargetReferenceConfigurationInputAndOutput;
      },
      {
        ConstrainedObject: TDerivedTargetReferenceBuilderInputAndOutput;
        KeyMap: {
          InputTargetReferenceTuple: 'ConfigurationInputTargetReferenceTuple';
        };
      }
    >
  >
>;

export type DerivedTargetReferenceConfigurationWithNormalizedBuilder<
  TDerivedTargetReferenceBuilderInputAndOutput extends DerivedTargetReferenceBuilderInputAndOutput,
> = BaseDerivedTargetReferenceConfiguration<
  Merge<
    DerivedTargetReferenceConfigurationEngineInput,
    RekeyConstrainedObject<
      {
        OldConstraintObject: DerivedTargetReferenceBuilderInputAndOutput;
        NewConstraintObject: DerivedTargetReferenceConfigurationInputAndOutput;
      },
      {
        ConstrainedObject: TDerivedTargetReferenceBuilderInputAndOutput;
        KeyMap: {
          InputTargetReferenceTuple: 'ConfigurationInputTargetReferenceTuple';
        };
      }
    >
  >
>;

export type UnknownDerivedTargetReferenceConfiguration =
  BaseDerivedTargetReferenceConfiguration<DerivedTargetReferenceConfigurationInputAndOutput>;
