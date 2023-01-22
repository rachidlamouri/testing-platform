import { UnknownBuilderConfiguration } from '../builderConfiguration';
import { CustomSet } from '../../utilities/customSet';
import { MutableBuilderConfiguration } from './mutableBuilderConfiguration';

export type MutableBuilderCollectionConstructorParameter = {
  builderConfiguration: UnknownBuilderConfiguration;
};

export class MutableBuilderConfigurationCollection extends CustomSet<MutableBuilderConfiguration> {
  addBuilderConfiguration(
    builderConfiguration: UnknownBuilderConfiguration,
  ): void {
    const mutableBuilderConfiguration: MutableBuilderConfiguration = {
      builderConfiguration,
      builtInputCount: 0,
    };

    super.add(mutableBuilderConfiguration);
  }
}
