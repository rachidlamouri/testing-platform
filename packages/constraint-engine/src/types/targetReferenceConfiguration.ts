// import {
//   DerivedReferenceBuilder,
//   DerivedReferenceSetBuilder,
//   ReferenceBuilder,
// } from './builder';
// import { PartiallyKnownTypedTarget, UnknownTargetTypeId } from './typedTarget';
// import {
//   NormalizedTargetPath,
//   RootTargetPath,
//   UnknownTargetPath,
// } from './targetPath';
// import { UnknownTargetInstance } from './targetInstance';

// export type DerivedReferenceConfiguration<
//   TInputTargetTypeId extends UnknownTargetTypeId,
//   TInputTargetInstance extends PartiallyKnownTypedTarget<TInputTargetTypeId>,
//   TInputTargetPath extends UnknownTargetPath,
//   TOutputTargetTypeId extends UnknownTargetTypeId,
//   TOutputTargetInstance extends PartiallyKnownTypedTarget<TOutputTargetTypeId>,
//   TOutputTargetPath extends UnknownTargetPath,
// > = {
//   typeId: TargetReferenceConfigurationTypeId.DerivedReferenceConfiguration;
//   instantiator: DerivedReferenceBuilder<
//     TInputTargetInstance,
//     TInputTargetPath,
//     TOutputTargetInstance,
//     TOutputTargetPath
//   >;
//   inputTargetTypeId: TInputTargetTypeId;
//   normalizedInputTargetPath: NormalizedTargetPath<TInputTargetPath>;
//   outputTargetTypeId: TOutputTargetTypeId;
//   normalizedOutputTargetPath: NormalizedTargetPath<TOutputTargetPath>;
// };

// export type DerivedReferenceSetConfiguration<
//   TInputTargetTypeId extends UnknownTargetTypeId,
//   TInputTargetInstance extends PartiallyKnownTypedTarget<TInputTargetTypeId>,
//   TInputTargetPath extends UnknownTargetPath,
//   TOutputTargetTypeId extends UnknownTargetTypeId,
//   TOutputTargetInstance extends PartiallyKnownTypedTarget<TOutputTargetTypeId>,
//   TOutputTargetPath extends UnknownTargetPath,
// > = {
//   typeId: TargetReferenceConfigurationTypeId.DerivedReferenceSetConfiguration;
//   instantiator: DerivedReferenceSetBuilder<
//     TInputTargetInstance,
//     TInputTargetPath,
//     TOutputTargetInstance,
//     TOutputTargetPath
//   >;
//   inputTargetTypeId: TInputTargetTypeId;
//   normalizedInputTargetPath: NormalizedTargetPath<TInputTargetPath>;
//   outputTargetTypeId: TOutputTargetTypeId;
//   normalizedOutputTargetPath: NormalizedTargetPath<TOutputTargetPath>;
// };

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
