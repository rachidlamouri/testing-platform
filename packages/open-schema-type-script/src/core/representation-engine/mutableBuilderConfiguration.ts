import { UnknownBuilderConfiguration } from '../builderConfiguration';
import {
  UnknownCollectionLocator,
  UnknownCollectionLocatorTuple,
} from '../collectionLocator';
import { UnknownDatumInstanceConfiguration } from '../datumInstanceConfiguration';

type MutableInputStatus = {
  isReady: boolean;
  predicateIdentifiers: UnknownCollectionLocatorTuple;
};

export class MutableBuilderConfiguration {
  public inputStatusesByInputIdentifier: Map<
    UnknownCollectionLocator,
    MutableInputStatus
  > = new Map();

  constructor(
    public readonly builderConfiguration: UnknownBuilderConfiguration,
  ) {
    builderConfiguration.inputPredicateCollection.forEach(
      (normalizedInputPredicate) => {
        this.inputStatusesByInputIdentifier.set(
          normalizedInputPredicate.instanceIdentifier,
          {
            isReady: false,
            predicateIdentifiers: normalizedInputPredicate.predicateIdentifiers,
          },
        );
      },
    );

    /**
     * TODO:
     *  Input predicate collection says what we need for our builder to run
     *
     * Our TypeScript helpers make sure that our builder configurations contain the TypeScript semantics that they have
     *
     * This class needs to have mutable state to know when this builder is ready to trigger
     *
     *
     * The validation engine needs to be able to mutate some state to reflect that a configuration has new semantics
     *
     * When a configuration's state changes the builder should know if it is ready to fire (if it hasn't already)
     *
     * ON INIT: a builder doesn't know if it can run or not. The representation engine needs to mutate the mutable builders based on its runtime instance map
     *
     * We also need the builder to know if it's a one time builder or not
     *    - a builder with 0 inputs is a one time builder
     *    - a builder with 1 input is a many time builder
     *    - a builder with multiple inputs is a 1 time builder
     *
     */
    // const idk: Map<string, string[]> = new Map();
    // builderConfiguration.inputPredicateCollection.forEach(() => {
    // })
    // builderConfiguration.inputPredicateCollection.forEach((input) => {
    //   this.predicateStatus.set(input.instanceIdentifier, {
    //     isReady: builderConfiguration.inputPredicateCollection.find()
    //   });
    // });
  }

  updateInputStatus(
    inputConfiguration: UnknownDatumInstanceConfiguration,
  ): void {
    const inputStats = this.inputStatusesByInputIdentifier.get(
      inputConfiguration.instanceIdentifier,
    );

    if (inputStats === undefined) {
      return;
    }

    const semanticsSet = new Set(inputConfiguration.predicateIdentifiers);

    inputStats.isReady = inputStats.predicateIdentifiers.every((identifier) =>
      semanticsSet.has(identifier),
    );
  }

  isReady(): boolean {
    return [...this.inputStatusesByInputIdentifier.values()].every(
      (x) => x.isReady,
    );
  }
}

export type MutableBuilderConfigurationTuple =
  readonly MutableBuilderConfiguration[];
