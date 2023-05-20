import { Hubblepup } from '../../core/engine-shell/quirm/hubblepup';
import { Voque } from '../../core/engine/voque';
import { Gepp } from '../../type-script-adapter/gepp';
import { StringZorn } from '../../utilities/semantic-types/zorn';
import {
  CustomDatumTypeName,
  getCustomTypedDatum,
} from '../../utilities/typed-datum/customTypedDatum';
import { TypeScriptObject } from '../../utilities/typed-datum/type-script/object';

export type GenericOdeshin2 = {
  zorn: StringZorn;
};

export type Odeshin2<TOdeshin extends GenericOdeshin2> = TOdeshin;

export type Odeshin2Voque<
  TGepp extends Gepp,
  TOdeshin extends GenericOdeshin2,
  TIndexByName extends TypeScriptObject,
  TEmittedVoictent,
> = Voque<TGepp, TOdeshin, TOdeshin, TIndexByName, TEmittedVoictent>;

export const isOdeshin2 = (
  hubblepup: Hubblepup,
): hubblepup is GenericOdeshin2 => {
  const typedDatum = getCustomTypedDatum(hubblepup);

  // TODO: update this to use zod or something
  return (
    typedDatum.typeName === CustomDatumTypeName.RootObjectInstance &&
    'zorn' in typedDatum.datum &&
    typeof typedDatum.datum.zorn === 'string'
  );
};
