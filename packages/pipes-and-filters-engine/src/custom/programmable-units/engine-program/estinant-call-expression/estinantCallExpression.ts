import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { CortmumCallExpression } from './cortmumCallExpression';
import { MattomerCallExpression } from './mattomerCallExpression';
import { MentursectionCallExpression } from './mentursectionCallExpression';
import { OnamaCallExpression } from './onamaCallExpression';
import { WattlectionCallExpression } from './wattlectionCallExpression';
import { WortinatorCallExpression } from './wortinatorCallExpression';

export type EstinantCallExpression =
  | CortmumCallExpression
  | MattomerCallExpression
  | MentursectionCallExpression
  | MentursectionCallExpression
  | OnamaCallExpression
  | WattlectionCallExpression
  | WortinatorCallExpression;

export type EstinantCallExpressionGrition = Grition<EstinantCallExpression>;

export type EstinantCallExpressionOdeshin =
  OdeshinFromGrition<EstinantCallExpressionGrition>;

export const ESTINANT_CALL_EXPRESSION_GEPP = 'estinant-call-expression';

export type EstinantCallExpressionGepp = typeof ESTINANT_CALL_EXPRESSION_GEPP;

export type EstinantCallExpressionVoictent = Voictent<
  EstinantCallExpressionGepp,
  EstinantCallExpressionOdeshin
>;
