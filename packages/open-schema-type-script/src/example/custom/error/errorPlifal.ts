import { Grition } from '../../../custom-adapter/grition';
import { Odeshin } from '../../../custom-adapter/odeshin';
import { Plifal } from '../../../custom-adapter/plifal';

export type CustomError = { message: string; data: unknown };

export type ErrorGrition = Grition<CustomError>;

export type ErrorIdentifier = `error:${string}`;

export type ErrorOdeshin = Odeshin<ErrorIdentifier, ErrorGrition>;

export const ERROR_GEPP = Symbol('error');

export type ErrorGepp = typeof ERROR_GEPP;

export type ErrorPlifal = Plifal<[ErrorGepp], ErrorOdeshin>;

export type ErrorPlifalBuilder = (
  errorMessage: string,
  data?: unknown,
) => ErrorPlifal;

export const buildBuildErrorPlifal = (
  identifier: string,
): ErrorPlifalBuilder => {
  const buildErrorPlifal: ErrorPlifalBuilder = (errorMesage, data) => {
    return {
      geppTuple: [ERROR_GEPP],
      hubblepup: {
        identifier: `error:${identifier}`,
        grition: {
          message: errorMesage,
          data,
        },
      },
    };
  };

  return buildErrorPlifal;
};
