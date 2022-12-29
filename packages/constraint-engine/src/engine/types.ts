// import { TargetConfigurationName } from '../configuration';
// import {
//   DerivedReferenceBuilder,
//   DerivedReferenceSetBuilder,
//   ReferenceBuilder,
//   TargetInstance,
//   UnknownTargetPath,
//   TargetReference,
// } from '../types';

// export type UnknownParameter = unknown;
// export type UnknownTargetName = string;
// export type UnknownTargetValue = unknown;
// export type UnknownTargetPath = string;

// export type UnknownTarget = TargetInstance<
//   UnknownTargetName,
//   UnknownTargetValue
// >;

// export type UnknownTargetReference = TargetReference<
//   UnknownTarget,
//   UnknownTargetPath
// >;

// export type UnknownReferenceBuilder = ReferenceBuilder<
//   UnknownParameter,
//   UnknownTarget,
//   UnknownTargetPath
// >;
// export type UnknownDerivedReferenceBuilder = DerivedReferenceBuilder<
//   UnknownTarget,
//   UnknownTargetPath,
//   UnknownTarget,
//   UnknownTargetPath
// >;
// export type UnknownDerivedReferenceSetBuilder = DerivedReferenceSetBuilder<
//   UnknownTarget,
//   UnknownTargetPath,
//   UnknownTarget,
//   UnknownTargetPath
// >;

// export type ReferencesByInstancePath = Map<
//   UnknownTargetPath,
//   UnknownTargetReference
// >;
// export type ReferencesByInstancePathByNormalizedPath = Map<
//   UnknownTargetPath,
//   ReferencesByInstancePath
// >;
// export type ReferencesByInstancePathByNormalizedPathByTargetName = Map<
//   UnknownTargetName,
//   ReferencesByInstancePathByNormalizedPath
// >;

// export type UnknownRootConfiguration = {
//   name: TargetConfigurationName.RootConfig;
//   parameter: UnknownParameter;
//   inputTargetPath: UnknownTargetPath;
//   outputTargetName: UnknownTargetName;
//   outputTargetPath: UnknownTargetPath;
//   instantiator: UnknownReferenceBuilder;
// };

// export type UnknownDerivedConfiguration = {
//   name: TargetConfigurationName.DerivedConfig;
//   inputTargetName: UnknownTargetName;
//   inputTargetPath: UnknownTargetPath;
//   outputTargetName: UnknownTargetName;
//   outputTargetPath: UnknownTargetPath;
//   instantiator: UnknownDerivedReferenceBuilder;
// };

// export type UnknownDerivedSetConfiguration = {
//   name: TargetConfigurationName.DerivedSetConfig;
//   inputTargetName: UnknownTargetName;
//   inputTargetPath: UnknownTargetPath;
//   outputTargetName: UnknownTargetName;
//   outputTargetPath: UnknownTargetPath;
//   instantiator: UnknownDerivedReferenceSetBuilder;
// };

// export type UnknownTargetConfiguration =
//   | UnknownRootConfiguration
//   | UnknownDerivedConfiguration
//   | UnknownDerivedSetConfiguration;

// export type UnknownRule = (target: UnknownTarget) => boolean;

// export type UnknownRuleConfiguration = {
//   reference: {
//     name: UnknownTargetName;
//     path: UnknownTargetPath;
//   };
//   rule: UnknownRule;
// };

// export type ConstraintEngine = ({
//   targetConfigurations,
//   ruleConfigurations,
// }: {
//   targetConfigurations: readonly UnknownTargetConfiguration[];
//   ruleConfigurations: readonly UnknownRuleConfiguration[];
// }) => void;
