import { UnknownBuilderConfiguration } from '../builderConfiguration';

export class MutableBuilderConfiguration {
  public builtInputCount = 0;

  constructor(
    public readonly builderConfiguration: UnknownBuilderConfiguration,
  ) {}
}

export type MutableBuilderConfigurationTuple =
  readonly MutableBuilderConfiguration[];
