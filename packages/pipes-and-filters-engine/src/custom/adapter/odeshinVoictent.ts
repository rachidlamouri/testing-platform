import { Gepp } from '../../type-script-adapter/gepp';
import { Voictent } from '../../type-script-adapter/voictent';
import { MergeTuple } from '../../utilities/mergeTuple';
import { GritionTuple } from './grition';
import { Odeshin } from './odeshin';

export type OdeshinVoictent = Voictent<Gepp, Odeshin>;

export type OdeshinVoictentTuple = readonly OdeshinVoictent[];

export type OdeshinVoictentToGrition<TOdeshinVoictent extends OdeshinVoictent> =
  TOdeshinVoictent['hubblepupTuple'][number]['grition'];

export type OdeshinVoictentRecord = Record<Gepp, GritionTuple>;

export type OdeshinVoictentToGritionTuple<
  TOdeshinVoictent extends OdeshinVoictent,
> = readonly OdeshinVoictentToGrition<TOdeshinVoictent>[];

export type OdeshinVoictentToOdeshinVoictentRecord<
  TOdeshinVoictent extends OdeshinVoictent,
> = {
  [Key in TOdeshinVoictent['gepp']]: OdeshinVoictentToGritionTuple<TOdeshinVoictent>;
};

export type OdeshinVoictentTupleToOdeshinVoictentRecordTuple<
  TOdeshinVoictentTuple extends OdeshinVoictentTuple,
> = {
  [Index in keyof TOdeshinVoictentTuple]: OdeshinVoictentToOdeshinVoictentRecord<
    TOdeshinVoictentTuple[Index]
  >;
};

export type OdeshinVoictentTupleToAggregateVoictentRecord<
  TOdeshinVoictentTuple extends OdeshinVoictentTuple,
> = MergeTuple<
  OdeshinVoictentTupleToOdeshinVoictentRecordTuple<TOdeshinVoictentTuple>
>;
