import { GeppTuple } from '../core/gepp';
import { Quirm } from '../core/quirm';
import { Odeshin, OdeshinGepp, ODESHIN_GEPP } from './odeshin';

/**
 * A Quirm that wraps an Odeshin
 */
export type Plifal<
  TGeppTuple extends GeppTuple = GeppTuple,
  TOdeshin extends Odeshin = Odeshin,
> = Quirm<TOdeshin, [OdeshinGepp, ...TGeppTuple]>;

export type PlifalTuple<
  TGeppTuple extends GeppTuple = GeppTuple,
  TOdeshin extends Odeshin = Odeshin,
> = Plifal<TGeppTuple, TOdeshin>[];

export type PlifalToGeppUnion<TPlifal extends Plifal> =
  TPlifal['geppTuple'][number];

export type PlifalBuilderInput<
  TGeppTuple extends GeppTuple,
  TIdentifier extends Odeshin['identifier'],
  TGrition extends Odeshin['grition'],
> = {
  geppTuple: TGeppTuple;
  identifier: TIdentifier;
  grition: TGrition;
};

export const buildPlifal = <
  TIdentifier extends Odeshin['identifier'],
  TGrition extends Odeshin['grition'],
  TGeppTuple extends GeppTuple,
>({
  geppTuple,
  identifier,
  grition,
}: PlifalBuilderInput<TGeppTuple, TIdentifier, TGrition>): Plifal<
  TGeppTuple,
  Odeshin<TIdentifier, TGrition>
> => {
  const odeshin: Odeshin<TIdentifier, TGrition> = {
    identifier,
    grition,
  };

  return {
    geppTuple: [ODESHIN_GEPP, ...geppTuple],
    hubblepup: odeshin,
  };
};
