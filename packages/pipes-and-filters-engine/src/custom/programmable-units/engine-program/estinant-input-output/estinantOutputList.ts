import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { splitList } from '../../../../utilities/splitList';
import { isIdentifiableTypeScriptTypeReference } from '../../../../utilities/type-script-ast/isIdentifiableTypeScriptTypeReference';
import { buildMentursection } from '../../../adapter/estinant/mentursection';
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

export const estinantOutputMentursection = buildMentursection<
  EstinantCallExpressionOutputParameterVoictent,
  [EstinantOutputListVoictent, ErrorVoictent]
>({
  inputGepp: ESTINANT_CALL_EXPRESSION_OUTPUT_PARAMETER_GEPP,
  outputGeppTuple: [ESTINANT_OUTPUT_LIST_GEPP, ERROR_GEPP],
  pinbe: (input) => {
    let nodeList: TSESTree.TypeNode[];
    if (input.node === undefined) {
      nodeList = [];
    } else if (input.node.type === AST_NODE_TYPES.TSTupleType) {
      nodeList = input.node.elementTypes;
    } else {
      nodeList = [input.node];
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
        programName: input.programName,
        estinantName: input.estinantName,
        voictentName,
        isInput: false,
        index: null,
      };
    });

    return {
      [ESTINANT_OUTPUT_LIST_GEPP]: [outputList],
      [ERROR_GEPP]: errorList,
    };
  },
});
