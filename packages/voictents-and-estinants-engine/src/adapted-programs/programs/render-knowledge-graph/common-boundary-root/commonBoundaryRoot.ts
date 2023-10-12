import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';

type BaseCommonBoundaryRoot = {
  directoryPath: string;
};

type CommonBoundaryRootPrototype = {
  get zorn(): string;
};

/**
 * The most nested directory that contains all boundary directories
 */
export type CommonBoundaryRoot = ObjectWithPrototype<
  BaseCommonBoundaryRoot,
  CommonBoundaryRootPrototype
>;

export const { CommonBoundaryRootInstance } = buildConstructorFunctionWithName(
  'CommonBoundaryRootInstance',
)<BaseCommonBoundaryRoot, CommonBoundaryRootPrototype, CommonBoundaryRoot>({
  zorn: (root) => {
    return root.directoryPath;
  },
});

export const COMMON_BOUNDARY_ROOT_GEPP = 'common-boundary-root';

type CommonBoundaryRootGepp = typeof COMMON_BOUNDARY_ROOT_GEPP;

export type CommonBoundaryRootVoque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    CommonBoundaryRootGepp,
    CommonBoundaryRoot
  >;
