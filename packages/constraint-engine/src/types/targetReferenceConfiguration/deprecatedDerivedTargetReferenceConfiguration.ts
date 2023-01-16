import {
  DeprecatedDerivedReferenceBuilder,
  DeprecatedDerivedReferenceBuilderInputAndOutput,
  DeprecatedDerivedReferenceBuilderInput,
  DeprecatedDerivedReferenceBuilderOutput,
} from '../builders/deprecatedDerivedReferenceBuilder';
import { Rule } from '../rule';
import { Merge } from '../utilityTypes/merge/merge';
import { MergeTuple } from '../utilityTypes/merge/mergeTuple';
import { RekeyConstrainedObject } from '../utilityTypes/rekeyObject/rekeyConstrainedObject';
import { RekeyObject } from '../utilityTypes/rekeyObject/rekeyObject';
import { TargetReferenceConfigurationTypeId } from './typeId';

/** @deprecated */
type DeprecatedDerivedTargetReferenceConfigurationEngineInput = RekeyObject<
  { Object: DeprecatedDerivedReferenceBuilderInput },
  {
    KeyMap: {
      InputTypedTarget: 'EngineInputTypedTarget';
      InputTargetPath: 'EngineInputTargetPath';
    };
  }
>;

/** @deprecated */
type DeprecatedDerivedTargetReferenceConfigurationConfigurationInput =
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
export type DeprecatedDerivedTargetReferenceConfigurationInputsAndOutput =
  MergeTuple<
    [
      DeprecatedDerivedTargetReferenceConfigurationEngineInput,
      DeprecatedDerivedTargetReferenceConfigurationConfigurationInput,
      DeprecatedDerivedReferenceBuilderOutput,
    ]
  >;

/** @deprecated */
type BaseDeprecatedDerivedTargetReferenceConfiguration<
  T extends DeprecatedDerivedTargetReferenceConfigurationInputsAndOutput,
> = {
  typeId: TargetReferenceConfigurationTypeId.DeprecatedDerivedTargetReferenceConfiguration;
  buildReference: DeprecatedDerivedReferenceBuilder<
    RekeyConstrainedObject<
      {
        OldConstraintObject: DeprecatedDerivedTargetReferenceConfigurationInputsAndOutput;
        NewConstraintObject: DeprecatedDerivedReferenceBuilderInputAndOutput;
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
  conditions: Rule<T['EngineInputTypedTarget']['instance']>[];
};

/** @deprecated */
export type DeprecatedDerivedTargetReferenceConfiguration<
  TDeprecatedDerivedReferenceBuilderInputAndOutput extends DeprecatedDerivedReferenceBuilderInputAndOutput,
> = BaseDeprecatedDerivedTargetReferenceConfiguration<
  Merge<
    RekeyConstrainedObject<
      {
        OldConstraintObject: DeprecatedDerivedReferenceBuilderInputAndOutput;
        NewConstraintObject: DeprecatedDerivedTargetReferenceConfigurationInputsAndOutput;
      },
      {
        ConstrainedObject: TDeprecatedDerivedReferenceBuilderInputAndOutput;
        KeyMap: {
          InputTypedTarget: 'EngineInputTypedTarget';
          InputTargetPath: 'EngineInputTargetPath';
        };
      }
    >,
    RekeyConstrainedObject<
      {
        OldConstraintObject: DeprecatedDerivedReferenceBuilderInputAndOutput;
        NewConstraintObject: DeprecatedDerivedTargetReferenceConfigurationInputsAndOutput;
      },
      {
        ConstrainedObject: TDeprecatedDerivedReferenceBuilderInputAndOutput;
        KeyMap: {
          InputTypedTarget: 'ConfigurationInputTypedTarget';
          InputTargetPath: 'ConfigurationInputTargetPath';
        };
      }
    >
  >
>;

/** @deprecated */
export type DeprecatedDerivedTargetReferenceConfigurationWithNormalizedBuilder<
  TDeprecatedDerivedReferenceBuilderInputAndOutput extends DeprecatedDerivedReferenceBuilderInputAndOutput,
> = BaseDeprecatedDerivedTargetReferenceConfiguration<
  Merge<
    DeprecatedDerivedTargetReferenceConfigurationEngineInput,
    RekeyConstrainedObject<
      {
        OldConstraintObject: DeprecatedDerivedReferenceBuilderInputAndOutput;
        NewConstraintObject: DeprecatedDerivedTargetReferenceConfigurationInputsAndOutput;
      },
      {
        ConstrainedObject: TDeprecatedDerivedReferenceBuilderInputAndOutput;
        KeyMap: {
          InputTypedTarget: 'ConfigurationInputTypedTarget';
          InputTargetPath: 'ConfigurationInputTargetPath';
        };
      }
    >
  >
>;

/** @deprecated */
export type UnknownDeprecatedDerivedTargetReferenceConfiguration =
  DeprecatedDerivedTargetReferenceConfiguration<DeprecatedDerivedReferenceBuilderInputAndOutput>;
