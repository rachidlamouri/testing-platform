import { Spread } from 'type-fest';
import {
  GenericLeftInputHubblepupVicken,
  GenericLeftInputVicken,
  GenericLeftInputVoictentVicken,
} from '../../../core/engine-shell/vicken/leftInputVicken';

export type AdaptedLeftInputVicken<
  TLeftInputVicken extends GenericLeftInputVicken,
  TPinbetunfInput,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = TLeftInputVicken extends any
  ? Spread<
      TLeftInputVicken,
      {
        pinbetunfInput: TPinbetunfInput;
      }
    >
  : never;

export type GenericAdaptedLeftInputHubblepupVicken = AdaptedLeftInputVicken<
  GenericLeftInputHubblepupVicken,
  unknown
>;

export type GenericAdaptedLeftInputVoictentVicken = AdaptedLeftInputVicken<
  GenericLeftInputVoictentVicken,
  unknown
>;

export type GenericAdaptedLeftInputVicken =
  | GenericAdaptedLeftInputHubblepupVicken
  | GenericAdaptedLeftInputVoictentVicken;
