import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { splitList } from '../../../../utilities/splitList';
import { isIdentifiableTypeScriptTypeReference } from '../../../../utilities/type-script-ast/isIdentifiableTypeScriptTypeReference';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { ErrorVoictent, ERROR_GEPP } from '../../error/error';
import {
  EstinantCallExpressionOutputParameterVoictent,
  ESTINANT_CALL_EXPRESSION_OUTPUT_PARAMETER_GEPP,
} from '../estinant-call-expression-parameter/estinantCallExpressionOutputParameter';
import {
  BaseEstinantInputOutput,
  getVoictentName,
  VOICTENT_NAME,
} from './baseEstinantInputOutput';

export type EstinantOutput = BaseEstinantInputOutput<false, null>;

export type EstinantOutputList = EstinantOutput[];

export type EstinantOutputListGrition = Grition<EstinantOutputList>;

export type EstinantOutputListOdeshin =
  OdeshinFromGrition<EstinantOutputListGrition>;

export const ESTINANT_OUTPUT_LIST_GEPP = 'estinant-output-list';

export type EstinantOutputListGepp = typeof ESTINANT_OUTPUT_LIST_GEPP;

export type EstinantOutputListVoictent = Voictent<
  EstinantOutputListGepp,
  EstinantOutputListOdeshin
>;

export const getEstinantOutputList = buildEstinant()
  .fromHubblepup<EstinantCallExpressionOutputParameterVoictent>({
    gepp: ESTINANT_CALL_EXPRESSION_OUTPUT_PARAMETER_GEPP,
  })
  .toHubblepupTuple<EstinantOutputListVoictent>({
    gepp: ESTINANT_OUTPUT_LIST_GEPP,
  })
  .toHubblepupTuple<ErrorVoictent>({
    gepp: ERROR_GEPP,
  })
  .onPinbe((input) => {
    const callExpressionOutputParameter = input.grition;

    let nodeList: TSESTree.TypeNode[];
    if (callExpressionOutputParameter.node === undefined) {
      nodeList = [];
    } else if (
      callExpressionOutputParameter.node.type === AST_NODE_TYPES.TSTupleType
    ) {
      nodeList = callExpressionOutputParameter.node.elementTypes;
    } else {
      nodeList = [callExpressionOutputParameter.node];
    }

    const voictentNameList: string[] = [];
    const errorList: TSESTree.TypeNode[] = [];
    splitList({
      list: nodeList.map((node) => {
        if (
          isIdentifiableTypeScriptTypeReference(node) &&
          node.typeName.name.endsWith(VOICTENT_NAME)
        ) {
          const voictentName = getVoictentName(node);

          return voictentName;
        }

        return node;
      }),
      isElementA: (element): element is string => typeof element === 'string',
      accumulatorA: voictentNameList,
      accumulatorB: errorList,
    });

    const outputList = voictentNameList.map<EstinantOutput>((voictentName) => {
      return {
        programName: callExpressionOutputParameter.programName,
        estinantName: callExpressionOutputParameter.estinantName,
        voictentName,
        isInput: false,
        index: null,
      };
    });

    return {
      [ESTINANT_OUTPUT_LIST_GEPP]: [
        {
          zorn: input.zorn,
          grition: outputList,
        },
      ],
      [ERROR_GEPP]: errorList.map((error, index) => {
        return {
          zorn: `${input.zorn}/${index}`,
          grition: error,
        };
      }),
    };
  })
  .assemble();
