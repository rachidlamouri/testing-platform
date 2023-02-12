import { GeppTuple } from '../core/gepp';
import { Quirm } from '../core/quirm';
import { Odeshin, OdeshinGepp } from './odeshin';

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
