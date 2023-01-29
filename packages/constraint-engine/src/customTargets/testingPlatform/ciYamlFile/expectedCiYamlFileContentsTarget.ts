import { TypedTarget } from '../../../types/typedTarget';
import { TargetTypeId } from '../targetTypeId';
import {
  CiYamlFileContents,
  CiYamlFileContentsStep,
} from './ciYamlFileContentsConfigurationTarget';

export type ExpectedCiYamlFileContentsTarget = CiYamlFileContents<
  CiYamlFileContentsStep[]
>;

export type ExpectedCiYamlFileContentsTypedTarget = TypedTarget<
  TargetTypeId.ExpectedCiYamlFileContentsTarget,
  ExpectedCiYamlFileContentsTarget
>;
