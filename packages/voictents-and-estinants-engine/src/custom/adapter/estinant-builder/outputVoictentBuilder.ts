// import { Voictent } from '../voictent';
// import {
//   buildPinbetunfBuilder,
//   PinbetunfBuilderParent,
// } from './pinbetunfBuilder';
// import { LeftAppreffinge, Virm } from './virm';

// export type OutputVoictentBuilder<TVirm extends Virm> = <
//   TOutputVoictent extends Voictent,
// >(appreffinge: {
//   gepp: TOutputVoictent['gepp'];
// }) => PinbetunfBuilderParent<TVirm, TOutputVoictent>;

// export type OutputVoictentBuilderParent<TVirm extends Virm> = {
//   toVoictent: OutputVoictentBuilder<TVirm>;
// };

// export const buildOutputVoictentBuilder = <TVirm extends Virm>(
//   appreffinge: LeftAppreffinge<TVirm>,
// ): OutputVoictentBuilder<TVirm> => {
//   const buildOutputVoictent: OutputVoictentBuilder<TVirm> = ({
//     gepp: outputGepp,
//   }) => {
//     return {
//       onPinbe: buildPinbetunfBuilder(appreffinge),
//     };
//   };

//   return buildOutputVoictent;
// };
