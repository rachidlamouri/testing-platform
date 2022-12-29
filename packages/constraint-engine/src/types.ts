// export type RootTargetPath = '';
// export type UnknownTargetPath = string;
// export type DerivedTargetPath = `${string}/${string}`;

// export type PrefixedTargetPath<
//   TPrefix extends UnknownTargetPath,
//   TSuffix extends UnknownTargetPath,
// > = `${TPrefix}/${TSuffix}`;

// export type TargetInstance<TName extends string, T> = {
//   name: TName;
//   value: T;
// };

// export type TargetReference<TTarget, TTargetPath extends UnknownTargetPath> = {
//   instance: TTarget;
//   path: TTargetPath;
// };

// export type InstanceBuilder<TParameter, TOutputTarget> = (
//   parameter: TParameter,
// ) => TOutputTarget;

// export type ReferenceBuilder<
//   TParameter,
//   TOutputTarget,
//   TOutputTargetPath extends UnknownTargetPath,
// > = (
//   parameter: TParameter,
// ) => TargetReference<TOutputTarget, TOutputTargetPath>;

// export type DerivedReferenceBuilder<
//   TInputTarget,
//   TInputTargetPath extends UnknownTargetPath,
//   TOutputTarget,
//   TOutputTargetPath extends UnknownTargetPath,
// > = (
//   parameter: TargetReference<TInputTarget, TInputTargetPath>,
// ) => TargetReference<TOutputTarget, TOutputTargetPath>;

// export type ReferenceSetBuilder<
//   TParameter,
//   TOutputTarget,
//   TOutputTargetPath extends UnknownTargetPath,
// > = (
//   parameter: TParameter,
// ) => TargetReference<TOutputTarget, TOutputTargetPath>[];

// export type DerivedReferenceSetBuilder<
//   TInputTarget,
//   TInputTargetPath extends UnknownTargetPath,
//   TOutputTarget,
//   TOutputTargetPath extends UnknownTargetPath,
// > = (
//   parameter: TargetReference<TInputTarget, TInputTargetPath>,
// ) => TargetReference<TOutputTarget, TOutputTargetPath>[];
