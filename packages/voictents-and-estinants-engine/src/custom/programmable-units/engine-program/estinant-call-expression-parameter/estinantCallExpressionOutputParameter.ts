import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { EstinantCallExpression } from '../estinant-call-expression/estinantCallExpression';
import { BaseEstinantCallExpressionParameter } from './baseEstinantCallExpressionParameter';

export type EstinantCallExpressionOutputParameter =
  BaseEstinantCallExpressionParameter<
    false,
    EstinantCallExpression['typeParameters']['params'][1] | undefined
  >;

export type EstinantCallExpressionOutputParameterGrition =
  Grition<EstinantCallExpressionOutputParameter>;

export type EstinantCallExpressionOutputParameterOdeshin =
  OdeshinFromGrition<EstinantCallExpressionOutputParameterGrition>;

export const ESTINANT_CALL_EXPRESSION_OUTPUT_PARAMETER_GEPP =
  'estinant-call-expression-output-parameter';

export type EstinantCallExpressionOutputParameterGepp =
  typeof ESTINANT_CALL_EXPRESSION_OUTPUT_PARAMETER_GEPP;

export type EstinantCallExpressionOutputParameterVoictent = Voictent<
  EstinantCallExpressionOutputParameterGepp,
  EstinantCallExpressionOutputParameterOdeshin
>;
