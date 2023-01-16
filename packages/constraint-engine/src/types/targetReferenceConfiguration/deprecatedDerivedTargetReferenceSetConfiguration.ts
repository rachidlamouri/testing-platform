import { DeprecatedDerivedReferenceBuilderInput } from '../builders/deprecatedDerivedReferenceBuilder';
import {
  DeprecatedDerivedReferenceSetBuilder,
  DeprecatedDerivedReferenceSetBuilderOutput,
  DeprecatedDerivedReferenceSetBuilderInputAndOutput,
} from '../builders/deprecatedDerivedReferenceSetBuilder';
import { Merge } from '../utilityTypes/merge/merge';
import { MergeTuple } from '../utilityTypes/merge/mergeTuple';
import { RekeyConstrainedObject } from '../utilityTypes/rekeyObject/rekeyConstrainedObject';
import { RekeyObject } from '../utilityTypes/rekeyObject/rekeyObject';
import { TargetReferenceConfigurationTypeId } from './typeId';

/** @deprecated */
type DeprecatedDerivedTargetReferenceSetConfigurationEngineInput = RekeyObject<
  { Object: DeprecatedDerivedReferenceBuilderInput },
  {
    KeyMap: {
      InputTypedTarget: 'EngineInputTypedTarget';
      InputTargetPath: 'EngineInputTargetPath';
    };
  }
>;

/** @deprecated */
type DeprecatedDerivedTargetReferenceSetConfigurationConfigurationInput =
  RekeyObject<
    { Object: DeprecatedDerivedReferenceBuilderInput },
    {
      KeyMap: {
        InputTypedTarget: 'ConfigurationInputTypedTarget';
        InputTargetPath: 'ConfigurationInputTargetPath';
      };
    }
  >;

/** @deprecated */
type DeprecatedDerivedTargetReferenceSetConfigurationInputsAndOutput =
  MergeTuple<
    [
      DeprecatedDerivedTargetReferenceSetConfigurationEngineInput,
      DeprecatedDerivedTargetReferenceSetConfigurationConfigurationInput,
      DeprecatedDerivedReferenceSetBuilderOutput,
    ]
  >;

/** @deprecated */
type BaseDeprecatedDerivedTargetReferenceSetConfiguration<
  T extends DeprecatedDerivedTargetReferenceSetConfigurationInputsAndOutput,
> = {
  typeId: TargetReferenceConfigurationTypeId.DeprecatedDerivedTargetReferenceSetConfiguration;
  buildReferenceSet: DeprecatedDerivedReferenceSetBuilder<
    RekeyConstrainedObject<
      {
        OldConstraintObject: DeprecatedDerivedTargetReferenceSetConfigurationInputsAndOutput;
        NewConstraintObject: DeprecatedDerivedReferenceSetBuilderInputAndOutput;
      },
      {
        ConstrainedObject: T;
        KeyMap: {
          EngineInputTypedTarget: 'InputTypedTarget';
          EngineInputTargetPath: 'InputTargetPath';
        };
      }
    >
  >;
  inputTargetTypeId: T['ConfigurationInputTypedTarget']['typeId'];
  inputTargetPath: T['ConfigurationInputTargetPath'];
};

/** @deprecated */
export type DeprecatedDerivedTargetReferenceSetConfiguration<
  TDeprecatedDerivedReferenceSetBuilderInputAndOutput extends DeprecatedDerivedReferenceSetBuilderInputAndOutput,
> = BaseDeprecatedDerivedTargetReferenceSetConfiguration<
  Merge<
    RekeyConstrainedObject<
      {
        OldConstraintObject: DeprecatedDerivedReferenceSetBuilderInputAndOutput;
        NewConstraintObject: DeprecatedDerivedTargetReferenceSetConfigurationInputsAndOutput;
      },
      {
        ConstrainedObject: TDeprecatedDerivedReferenceSetBuilderInputAndOutput;
        KeyMap: {
          InputTypedTarget: 'EngineInputTypedTarget';
          InputTargetPath: 'EngineInputTargetPath';
        };
      }
    >,
    RekeyConstrainedObject<
      {
        OldConstraintObject: DeprecatedDerivedReferenceSetBuilderInputAndOutput;
        NewConstraintObject: DeprecatedDerivedTargetReferenceSetConfigurationInputsAndOutput;
      },
      {
        ConstrainedObject: TDeprecatedDerivedReferenceSetBuilderInputAndOutput;
        KeyMap: {
          InputTypedTarget: 'ConfigurationInputTypedTarget';
          InputTargetPath: 'ConfigurationInputTargetPath';
        };
      }
    >
  >
>;

/** @deprecated */
export type DeprecatedDerivedTargetReferenceSetConfigurationWithNormalizedBuilder<
  TDeprecatedDerivedReferenceSetBuilderInputAndOutput extends DeprecatedDerivedReferenceSetBuilderInputAndOutput,
> = BaseDeprecatedDerivedTargetReferenceSetConfiguration<
  Merge<
    DeprecatedDerivedTargetReferenceSetConfigurationEngineInput,
    RekeyConstrainedObject<
      {
        OldConstraintObject: DeprecatedDerivedReferenceSetBuilderInputAndOutput;
        NewConstraintObject: DeprecatedDerivedTargetReferenceSetConfigurationInputsAndOutput;
      },
      {
        ConstrainedObject: TDeprecatedDerivedReferenceSetBuilderInputAndOutput;
        KeyMap: {
          InputTypedTarget: 'ConfigurationInputTypedTarget';
          InputTargetPath: 'ConfigurationInputTargetPath';
        };
      }
    >
  >
>;

/** @deprecated */
export type UnknownDeprecatedDerivedTargetReferenceSetConfiguration =
  DeprecatedDerivedTargetReferenceSetConfiguration<DeprecatedDerivedReferenceSetBuilderInputAndOutput>;
