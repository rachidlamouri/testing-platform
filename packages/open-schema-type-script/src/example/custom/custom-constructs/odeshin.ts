import { Hubblepup } from '../../../core/hubblepup';
import { Grition } from './grition';

export type OdeshinIdentifier<TIdentifier extends string = string> =
  TIdentifier;

/**
 * A custom identifiable Hubblepup. It makes it easier for an Abstract Programmer to manage their Hubblepups
 */
export type Odeshin<
  TIdentifier extends OdeshinIdentifier = OdeshinIdentifier,
  TGrition extends Grition = Grition,
> = Hubblepup<{ identifier: TIdentifier; grition: TGrition }>;

export type OdeshinTuple<
  TIdentifier extends OdeshinIdentifier = OdeshinIdentifier,
  TGrition extends Grition = Grition,
> = readonly Odeshin<TIdentifier, TGrition>[];
