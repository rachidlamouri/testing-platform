// import {
//   buildTestingPlatformPackageDirectorySetReference,
//   TestingPlatformPackageDirectorySetReferenceBuilderParameter,
//   TestingPlatformPackageDirectorySetTargetPath,
// } from './testingPlatformPackage/buildTestingPlatformPackageDirectorySetReference';
// import {
//   buildTestingPlatformPackageDirectoryReferenceSet,
//   TestingPlatformPackageDirectoryTargetPath,
// } from './testingPlatformPackage/buildTestingPlatformPackageDirectoryReferenceSet';
// import {
//   instantiateTestingPlatformPackageTarget,
//   TestingPlatformPackageTargetPath,
// } from './testingPlatformPackage/buildTestingPlatformPackageTarget';
// import {
//   TestingPlatformPackageDirectorySetTarget,
//   TestingPlatformPackageDirectoryTarget,
//   TestingPlatformPackageTarget,
// } from './testingPlatformPackage/targetTypes';
// import { TargetPathSegment, TargetReference } from './types';

import {
  buildTestingPlatformPackageDirectoryReferenceSet,
  TestingPlatformPackageDirectoryTargetPath,
  TestingPlatformPackageDirectoryTargetReference,
} from './testingPlatformPackage/buildTestingPlatformPackageDirectoryReferenceSet';
import {
  buildTestingPlatformPackageDirectorySetReference,
  TestingPlatformPackageDirectorySetReferenceBuilderParameter,
  TestingPlatformPackageDirectorySetTargetPath,
  TestingPlatformPackageDirectorySetTargetReference,
  TESTING_PLATFORM_PACKAGE_DIRECTORY_SET_TARGET_PATH,
} from './testingPlatformPackage/buildTestingPlatformPackageDirectorySetReference';
import {
  buildTestingPlatformPackageReference,
  TestingPlatformPackageTargetPath,
} from './testingPlatformPackage/buildTestingPlatformPackageReference';
import {
  TestingPlatformPackageDirectorySetTarget,
  TestingPlatformPackageDirectoryTarget,
  TestingPlatformPackageTarget,
  TestingPlatformTargetName,
} from './testingPlatformPackage/targetTypes';
import {
  DerivedReferenceBuilder,
  ReferenceBuilder,
  DerivedTargetPath,
  UnknownTargetPath,
  TargetReference,
  DerivedReferenceSetBuilder,
  PrefixedTargetPath,
  TargetInstance,
} from './types';

// type IDK<T> = T extends `${string}/${number}` ? `${string}/:index` : T;

// type StaticConfig<
//   TParameter,
//   TTarget,
//   TTargetPath extends TargetPathSegment,
// > = {
//   instantiator: TargetInstantiator<TParameter, TTarget, TTargetPath>;
//   staticTarget: TParameter;
//   outputPath: IDK<TTargetPath>;
// };

// type DerivedConfig<
//   TParameterTarget,
//   TParameterTargetPath extends string,
//   TTarget,
//   TTargetPath extends TargetPathSegment,
// > = {
//   instantiator:
//     | TargetInstantiator<
//         TargetReference<TParameterTarget, TParameterTargetPath>,
//         TTarget,
//         TTargetPath
//       >
//     | TargetSetInstantiator<
//         TargetReference<TParameterTarget, TParameterTargetPath>,
//         TTarget,
//         TTargetPath
//       >;
//   inputPath: IDK<TParameterTargetPath>;
//   outputPath: IDK<TTargetPath>;
// };

// export const configs = [
//   {
//     instantiator: buildTestingPlatformPackageDirectorySetReference,
//     staticTarget: {
//       rootDirectoryRelativeToCurrentWorkingDirectory: 'packages',
//     },
//     outputPath: 'testingPlatformPackageDirectorySet',
//   } satisfies StaticConfig<
//     TestingPlatformPackageDirectorySetReferenceBuilderParameter,
//     TestingPlatformPackageDirectorySetTarget,
//     TestingPlatformPackageDirectorySetTargetPath
//   >,
//   {
//     instantiator: buildTestingPlatformPackageDirectoryReferenceSet,
//     inputPath: 'testingPlatformPackageDirectorySet',
//     outputPath: 'testingPlatformPackageDirectorySet/:index',
//   } satisfies DerivedConfig<
//     TestingPlatformPackageDirectorySetTarget,
//     TestingPlatformPackageDirectorySetTargetPath,
//     TestingPlatformPackageDirectoryTarget,
//     TestingPlatformPackageDirectoryTargetPath
//   >,
//   {
//     instantiator: instantiateTestingPlatformPackageTarget,
//     inputPath: 'testingPlatformPackageDirectorySet/:index',
//     outputPath: 'testingPlatformPackageDirectorySet/:index',
//   } satisfies DerivedConfig<
//     TestingPlatformPackageDirectoryTarget,
//     TestingPlatformPackageDirectoryTargetPath,
//     TestingPlatformPackageTarget,
//     TestingPlatformPackageTargetPath
//   >,
// ];

// export const rules = [];

export enum TargetConfigurationName {
  RootConfig = 'RootConfig',
  DerivedConfig = 'DerivedConfig',
  DerivedSetConfig = 'DerivedSetConfig',
}

type RootConfig<
  TParameter,
  TOutputTargetName extends string,
  TOutputTarget extends TargetInstance<TOutputTargetName, any>,
  TOutputTargetPath extends UnknownTargetPath,
> = {
  name: TargetConfigurationName.RootConfig;
  parameter: TParameter;
  inputTargetPath: '';
  outputTargetName: TOutputTargetName;
  outputTargetPath: TOutputTargetPath;
  instantiator: ReferenceBuilder<TParameter, TOutputTarget, TOutputTargetPath>;
};

const createRootConfig = <
  TParameter,
  TOutputTargetName extends string,
  TOutputTarget extends TargetInstance<TOutputTargetName, any>,
  TOutputTargetPath extends UnknownTargetPath,
>({
  parameter,
  inputTargetPath,
  outputTargetName,
  outputTargetPath,
  instantiator,
}: Omit<
  RootConfig<TParameter, TOutputTargetName, TOutputTarget, TOutputTargetPath>,
  'name'
>): RootConfig<
  TParameter,
  TOutputTargetName,
  TOutputTarget,
  TOutputTargetPath
> => ({
  name: TargetConfigurationName.RootConfig,
  parameter,
  inputTargetPath,
  outputTargetName,
  outputTargetPath,
  instantiator,
});

type IDK<T extends UnknownTargetPath> = T extends `${infer T1}/${infer T2}`
  ? `${T1}/:${T2}`
  : T;

type DerivedConfig<
  TInputTargetName extends string,
  TInputTarget extends TargetInstance<TInputTargetName, any>,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTargetName extends string,
  TOutputTarget extends TargetInstance<TOutputTargetName, any>,
  TOutputTargetPath extends UnknownTargetPath,
> = {
  name: TargetConfigurationName.DerivedConfig;
  instantiator: DerivedReferenceBuilder<
    TInputTarget,
    TInputTargetPath,
    TOutputTarget,
    TOutputTargetPath
  >;
  inputTargetName: TInputTargetName;
  inputTargetPath: IDK<TInputTargetPath>;
  outputTargetName: TOutputTargetName;
  outputTargetPath: IDK<TOutputTargetPath>;
};

type DerivedSetConfig<
  TInputTargetName extends string,
  TInputTarget extends TargetInstance<TInputTargetName, any>,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTargetName extends string,
  TOutputTarget extends TargetInstance<TOutputTargetName, any>,
  TOutputTargetPath extends UnknownTargetPath,
> = {
  name: TargetConfigurationName.DerivedSetConfig;
  instantiator: DerivedReferenceSetBuilder<
    TInputTarget,
    TInputTargetPath,
    TOutputTarget,
    TOutputTargetPath
  >;
  inputTargetName: TInputTargetName;
  inputTargetPath: IDK<TInputTargetPath>;
  outputTargetName: TOutputTargetName;
  outputTargetPath: IDK<TOutputTargetPath>;
};

const createDerivedConfig = <
  TInputTargetName extends string,
  TInputTarget extends TargetInstance<TInputTargetName, any>,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTargetName extends string,
  TOutputTarget extends TargetInstance<TOutputTargetName, any>,
  TOutputTargetPath extends UnknownTargetPath,
>({
  inputTargetName,
  inputTargetPath,
  outputTargetName,
  outputTargetPath,
  instantiator,
}: Omit<
  DerivedConfig<
    TInputTargetName,
    TInputTarget,
    TInputTargetPath,
    TOutputTargetName,
    TOutputTarget,
    TOutputTargetPath
  >,
  'name'
>): DerivedConfig<
  TInputTargetName,
  TInputTarget,
  TInputTargetPath,
  TOutputTargetName,
  TOutputTarget,
  TOutputTargetPath
> => ({
  name: TargetConfigurationName.DerivedConfig,
  instantiator,
  inputTargetName,
  inputTargetPath,
  outputTargetName,
  outputTargetPath,
});

const createDerivedSetConfig = <
  TInputTargetName extends string,
  TInputTarget extends TargetInstance<TInputTargetName, any>,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTargetName extends string,
  TOutputTarget extends TargetInstance<TOutputTargetName, any>,
  TOutputTargetPath extends UnknownTargetPath,
>({
  inputTargetName,
  inputTargetPath,
  outputTargetName,
  outputTargetPath,
  instantiator,
}: Omit<
  DerivedSetConfig<
    TInputTargetName,
    TInputTarget,
    TInputTargetPath,
    TOutputTargetName,
    TOutputTarget,
    TOutputTargetPath
  >,
  'name'
>): DerivedSetConfig<
  TInputTargetName,
  TInputTarget,
  TInputTargetPath,
  TOutputTargetName,
  TOutputTarget,
  TOutputTargetPath
> => ({
  name: TargetConfigurationName.DerivedSetConfig,
  instantiator,
  inputTargetName,
  inputTargetPath,
  outputTargetName,
  outputTargetPath,
});

type TargetConfiguration =
  | RootConfig<any, any, any, any>
  | DerivedSetConfig<any, any, any, any, any, any>
  | DerivedConfig<any, any, any, any, any, any>;

export const targetConfigurations = [
  createRootConfig<
    TestingPlatformPackageDirectorySetReferenceBuilderParameter,
    TestingPlatformTargetName.PackageDirectorySet,
    TestingPlatformPackageDirectorySetTarget,
    TestingPlatformPackageDirectorySetTargetPath
  >({
    instantiator: buildTestingPlatformPackageDirectorySetReference,
    parameter: { rootDirectoryRelativeToCurrentWorkingDirectory: 'packages' },
    inputTargetPath: '',
    outputTargetName: TestingPlatformTargetName.PackageDirectorySet,
    outputTargetPath: 'testingPlatformPackageDirectorySet',
  }),
  createDerivedSetConfig<
    TestingPlatformTargetName.PackageDirectorySet,
    TestingPlatformPackageDirectorySetTarget,
    TestingPlatformPackageDirectorySetTargetPath,
    TestingPlatformTargetName.PackageDirectory,
    TestingPlatformPackageDirectoryTarget,
    TestingPlatformPackageDirectoryTargetPath<TestingPlatformPackageDirectorySetTargetPath>
  >({
    instantiator: buildTestingPlatformPackageDirectoryReferenceSet,
    inputTargetName: TestingPlatformTargetName.PackageDirectorySet,
    inputTargetPath: 'testingPlatformPackageDirectorySet',
    outputTargetName: TestingPlatformTargetName.PackageDirectory,
    outputTargetPath: 'testingPlatformPackageDirectorySet/:index',
  }),
  createDerivedConfig<
    TestingPlatformTargetName.PackageDirectory,
    TestingPlatformPackageDirectoryTarget,
    TestingPlatformPackageDirectoryTargetPath<TestingPlatformPackageDirectorySetTargetPath>,
    TestingPlatformTargetName.Package,
    TestingPlatformPackageTarget,
    TestingPlatformPackageTargetPath<TestingPlatformPackageDirectorySetTargetPath>
  >({
    instantiator: buildTestingPlatformPackageReference,
    inputTargetName: TestingPlatformTargetName.PackageDirectory,
    inputTargetPath: 'testingPlatformPackageDirectorySet/:index',
    outputTargetName: TestingPlatformTargetName.Package,
    outputTargetPath: 'testingPlatformPackageDirectorySet/:directoryName',
  }),
] as const satisfies readonly TargetConfiguration[];

type OutputTargetReferenceList<T extends readonly TargetConfiguration[]> = {
  [I in keyof T]: {
    name: T[I]['outputTargetName'];
    path: T[I]['outputTargetPath'];
  };
};

type OutputTargetReference = OutputTargetReferenceList<
  typeof targetConfigurations
>[number];

type Rule<
  TTargetName extends string,
  TTarget extends TargetInstance<TTargetName, any>,
> = (target: TTarget) => boolean;

type RuleReference<TTargetName extends string> = OutputTargetReference & {
  name: TTargetName;
};

type RuleConfiguration<
  TTargetName extends string,
  TTarget extends TargetInstance<TTargetName, any>,
> = {
  reference: RuleReference<TTargetName>;
  rule: Rule<TTargetName, TTarget>;
};

const createRuleConfiguration = <
  TTargetName extends string,
  TTarget extends TargetInstance<TTargetName, any>,
>(
  x: RuleConfiguration<TTargetName, TTarget>,
): RuleConfiguration<TTargetName, TTarget> => x;

const listIsNotEmpty: Rule<string, TargetInstance<string, unknown[]>> = (
  target,
) => target.value.length > 0;

const packageHasPackageFile: Rule<string, TestingPlatformPackageTarget> = (
  target,
) => {
  const { packageFile } = target.value;

  return packageFile.isOnDisk && packageFile.isParseable;
};

const packageHasTypeScriptConfigFile: Rule<
  string,
  TestingPlatformPackageTarget
> = (target) => {
  const { typeScriptConfigFile } = target.value;

  return typeScriptConfigFile.isOnDisk && typeScriptConfigFile.isParseable;
};

export const ruleConfigurations = [
  createRuleConfiguration<
    TestingPlatformTargetName.PackageDirectorySet,
    TestingPlatformPackageDirectorySetTarget
  >({
    reference: {
      name: TestingPlatformTargetName.PackageDirectorySet,
      path: 'testingPlatformPackageDirectorySet',
    },
    rule: listIsNotEmpty,
  }),
  createRuleConfiguration<
    TestingPlatformTargetName.Package,
    TestingPlatformPackageTarget
  >({
    reference: {
      name: TestingPlatformTargetName.Package,
      path: 'testingPlatformPackageDirectorySet/:index',
    },
    rule: packageHasPackageFile,
  }),
  createRuleConfiguration<
    TestingPlatformTargetName.Package,
    TestingPlatformPackageTarget
  >({
    reference: {
      name: TestingPlatformTargetName.Package,
      path: 'testingPlatformPackageDirectorySet/:index',
    },
    rule: packageHasTypeScriptConfigFile,
  }),
];

// const idk: Map<OutputTargetReference, null> = new Map([
//   [
//     {
//       name: TestingPlatformTargetName.PackageDirectorySet,
//       path: 'testingPlatformPackageDirectorySet',
//     },
//     null,
//   ],
// ]);
