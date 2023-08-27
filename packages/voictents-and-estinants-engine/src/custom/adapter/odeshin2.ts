import { StringZorn, GenericZorn2 } from '../../utilities/semantic-types/zorn';

export type OdeshinZorn = StringZorn | GenericZorn2;

export type GenericOdeshin2 = {
  zorn: OdeshinZorn;
};

// export const extractHumanReadableZorn = (
//   zorn: StringZorn | GenericZorn2,
// ): string => {
//   if (typeof zorn === 'string') {
//     return zorn;
//   }

//   return zorn.forHuman;
// };
