import { Voictent } from '../../../type-script-adapter/voictent';

export type Virm<
  TVoictent extends Voictent = Voictent,
  TIsWibiz extends boolean = boolean,
> = {
  voictent: TVoictent;
  isWibiz: TIsWibiz;
};

export type LeftAppreffinge<TVirm extends Virm> = {
  gepp: TVirm['voictent']['gepp'];
  isWibiz: TVirm['isWibiz'];
};
