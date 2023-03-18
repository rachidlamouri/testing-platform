import { Voictent } from './voictent';

export type Virm<
  TVoictent extends Voictent = Voictent,
  TIsWibiz extends boolean = boolean,
> = {
  voictent: TVoictent;
  isWibiz: TIsWibiz;
};
