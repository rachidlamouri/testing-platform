import { DatumInstanceConfigurationTupleToNormalizedDatumInstancePredicateCollectionTuple } from './datumInstanceConfiguration';
import {
  DatumInstanceConfigurationCollectionBuilder,
  UnknownDatumInstanceConfigurationCollectionBuilderInput,
  UnknownDatumInstanceConfigurationCollectionBuilderInputAndOutput,
  UnknownDatumInstanceConfigurationCollectionBuilderOutput,
} from './datumInstanceConfigurationCollectionBuilder';
import { ConstrainObject } from '../utilities/types/constrainObject';
import { MergeTuple } from '../utilities/types/merge/mergeTuple';
import { RekeyConstrainedObject } from '../utilities/types/rekeyObject/rekeyConstrainedObject';
import { RekeyObject } from '../utilities/types/rekeyObject/rekeyObject';

type EngineInputKeyMap = {
  InputDatumInstanceConfigurationCollection: 'EngineInputDatumInstanceConfigurationCollection';
};

type ConfigurationInputKeyMap = {
  InputDatumInstanceConfigurationCollection: 'ConfigurationInputDatumInstanceConfigurationCollection';
};

type UnknownDatumInstanceConfigurationCollectionBuilderEngineInput =
  RekeyObject<
    {
      Object: UnknownDatumInstanceConfigurationCollectionBuilderInput;
    },
    {
      KeyMap: EngineInputKeyMap;
    }
  >;

type UnknownDatumInstanceConfigurationCollectionBuilderConfigurationInput =
  RekeyObject<
    {
      Object: UnknownDatumInstanceConfigurationCollectionBuilderInput;
    },
    {
      KeyMap: ConfigurationInputKeyMap;
    }
  >;

type UnknownBaseBuilderConfigurationInputAndOutput = MergeTuple<
  [
    UnknownDatumInstanceConfigurationCollectionBuilderEngineInput,
    UnknownDatumInstanceConfigurationCollectionBuilderConfigurationInput,
    UnknownDatumInstanceConfigurationCollectionBuilderOutput,
  ]
>;

type BaseBuilderConfiguration<
  T extends UnknownBaseBuilderConfigurationInputAndOutput,
> = {
  buildCollection: DatumInstanceConfigurationCollectionBuilder<
    RekeyConstrainedObject<
      {
        OldConstraintObject: UnknownBaseBuilderConfigurationInputAndOutput;
        NewConstraintObject: UnknownDatumInstanceConfigurationCollectionBuilderInputAndOutput;
      },
      {
        ConstrainedObject: T;
        KeyMap: {
          EngineInputDatumInstanceConfigurationCollection: 'InputDatumInstanceConfigurationCollection';
        };
      }
    >
  >;
  inputPredicateCollection: DatumInstanceConfigurationTupleToNormalizedDatumInstancePredicateCollectionTuple<
    T['ConfigurationInputDatumInstanceConfigurationCollection']
  >;
};

export type BuilderConfiguration<
  TDatumInstanceConfigurationCollectionBuilderInputAndOutput extends UnknownDatumInstanceConfigurationCollectionBuilderInputAndOutput,
> = BaseBuilderConfiguration<
  MergeTuple<
    [
      RekeyConstrainedObject<
        {
          OldConstraintObject: UnknownDatumInstanceConfigurationCollectionBuilderInputAndOutput;
          NewConstraintObject: UnknownDatumInstanceConfigurationCollectionBuilderEngineInput;
        },
        {
          ConstrainedObject: TDatumInstanceConfigurationCollectionBuilderInputAndOutput;
          KeyMap: EngineInputKeyMap;
        }
      >,
      RekeyConstrainedObject<
        {
          OldConstraintObject: UnknownDatumInstanceConfigurationCollectionBuilderInputAndOutput;
          NewConstraintObject: UnknownDatumInstanceConfigurationCollectionBuilderConfigurationInput;
        },
        {
          ConstrainedObject: TDatumInstanceConfigurationCollectionBuilderInputAndOutput;
          KeyMap: ConfigurationInputKeyMap;
        }
      >,
      ConstrainObject<
        {
          ConstraintObject: UnknownDatumInstanceConfigurationCollectionBuilderOutput;
        },
        {
          ConstrainedObject: TDatumInstanceConfigurationCollectionBuilderInputAndOutput;
        }
      >,
    ]
  >
>;

export type BuilderConfigurationWithNormalizedInput<
  TDatumInstanceConfigurationCollectionBuilderInputAndOutput extends UnknownDatumInstanceConfigurationCollectionBuilderInputAndOutput,
> = BaseBuilderConfiguration<
  MergeTuple<
    [
      UnknownDatumInstanceConfigurationCollectionBuilderEngineInput,
      RekeyConstrainedObject<
        {
          OldConstraintObject: UnknownDatumInstanceConfigurationCollectionBuilderInputAndOutput;
          NewConstraintObject: UnknownDatumInstanceConfigurationCollectionBuilderConfigurationInput;
        },
        {
          ConstrainedObject: TDatumInstanceConfigurationCollectionBuilderInputAndOutput;
          KeyMap: ConfigurationInputKeyMap;
        }
      >,
      ConstrainObject<
        {
          ConstraintObject: UnknownDatumInstanceConfigurationCollectionBuilderOutput;
        },
        {
          ConstrainedObject: TDatumInstanceConfigurationCollectionBuilderInputAndOutput;
        }
      >,
    ]
  >
>;

export type UnknownBuilderConfiguration =
  BaseBuilderConfiguration<UnknownBaseBuilderConfigurationInputAndOutput>;

export type UnknownBuilderConfigurationTuple =
  readonly UnknownBuilderConfiguration[];
