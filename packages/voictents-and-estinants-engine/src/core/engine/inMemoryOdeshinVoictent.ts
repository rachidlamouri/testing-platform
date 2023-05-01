import { Odeshin } from '../../custom/adapter/odeshin';
import { Gepp } from '../engine-shell/voictent/gepp';
import {
  InMemoryVoictent,
  InMemoryVoictentConfiguration,
} from './inMemoryVoictent';

export type InMemoryOdeshinVoictentConfiguration<
  TGepp extends Gepp,
  THubblepup extends Odeshin,
> = InMemoryVoictentConfiguration<TGepp, THubblepup>;

export type GenericInMemoryOdeshinVoictentConfiguration =
  InMemoryVoictentConfiguration<Gepp, Odeshin>;

export class InMemoryOdeshinVoictent<
  TVoictentConfiguration extends GenericInMemoryOdeshinVoictentConfiguration,
> extends InMemoryVoictent<TVoictentConfiguration> {
  // eslint-disable-next-line class-methods-use-this
  getSerializableId(
    hubblepup: TVoictentConfiguration['receivedHubblepup'],
  ): string {
    // TODO: move the responsibility of normalizing the serializable id elsewhere
    return hubblepup.zorn.replaceAll('/', ' | ');
  }
}
