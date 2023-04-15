import { TSESTree, AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import { splitList } from '../../../../utilities/splitList';
import { isIdentifiableTypeScriptTypeReference } from '../../../../utilities/type-script-ast/isIdentifiableTypeScriptTypeReference';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  ProgramErrorVoictent,
  PROGRAM_ERROR_GEPP,
  ProgramError,
} from '../../error/programError';
import {
  EstinantCallExpressionOutputParameterVoictent,
  ESTINANT_CALL_EXPRESSION_OUTPUT_PARAMETER_GEPP,
} from '../estinant-call-expression-parameter/estinantCallExpressionOutputParameter';
import { VOICTENT_NAME, getVoictentName } from './baseEstinantInputOutput';
import {
  EstinantOutputListVoictent,
  ESTINANT_OUTPUT_LIST_GEPP,
  EstinantOutput,
} from './estinantOutputList';

export const getEstinantOutputList = buildEstinant({
  name: 'getEstinantOutputList',
})
  .fromHubblepup<EstinantCallExpressionOutputParameterVoictent>({
    gepp: ESTINANT_CALL_EXPRESSION_OUTPUT_PARAMETER_GEPP,
  })
  .toHubblepupTuple<EstinantOutputListVoictent>({
    gepp: ESTINANT_OUTPUT_LIST_GEPP,
  })
  .toHubblepupTuple<ProgramErrorVoictent>({
    gepp: PROGRAM_ERROR_GEPP,
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
    const errorNodeList: TSESTree.TypeNode[] = [];
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
      accumulatorB: errorNodeList,
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
      [PROGRAM_ERROR_GEPP]: errorNodeList.map((errorNode, index) => {
        return {
          zorn: `${input.zorn}/${index}`,
          grition: {
            message:
              'Node is not a TypeScript type reference node that ends in "Voictent"',
            locator: null,
            metadata: {
              errorNode,
            },
          } satisfies ProgramError,
        };
      }),
    };
  })
  .assemble();
