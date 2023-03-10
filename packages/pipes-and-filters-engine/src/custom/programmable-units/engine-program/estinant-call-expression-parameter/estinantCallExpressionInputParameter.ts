import { TSESTree } from '@typescript-eslint/typescript-estree';
import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { BaseEstinantCallExpressionParameter } from './baseEstinantCallExpressionParameter';

export type EstinantCallExpressionInputParameter =
  BaseEstinantCallExpressionParameter<true, TSESTree.TSTypeReference>;

export type EstinantCallExpressionInputParameterGrition =
  Grition<EstinantCallExpressionInputParameter>;

export type EstinantCallExpressionInputParameterOdeshin =
  OdeshinFromGrition<EstinantCallExpressionInputParameterGrition>;

export const ESTINANT_CALL_EXPRESSION_INPUT_PARAMETER_GEPP =
  'estinant-call-expression-input-parameter';

export type EstinantCallExpressionInputParameterGepp =
  typeof ESTINANT_CALL_EXPRESSION_INPUT_PARAMETER_GEPP;

export type EstinantCallExpressionInputParameterVoictent = Voictent<
  EstinantCallExpressionInputParameterGepp,
  EstinantCallExpressionInputParameterOdeshin
>;
