import { TSESTree } from '@typescript-eslint/typescript-estree';
import {
  IdentifiableTypeScriptTypeReference,
  isSpecificIdentifiableTypeScriptTypeReference,
  isIdentifiableTypeScriptTypeReference,
} from '../../../../utilities/type-script-ast/isIdentifiableTypeScriptTypeReference';
import { isNode } from '../../../../utilities/type-script-ast/isNode';
import { isTypeScriptTupleType } from '../../../../utilities/type-script-ast/isTypeScriptTupleType';
import {
  TypeScriptTypeParameterInstantiation,
  isTypeScriptTypeParameterInstantiation,
} from '../../../../utilities/type-script-ast/isTypeScriptTypeParameterInstantiation';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { ErrorVoictent, ERROR_GEPP } from '../../error/programError';
import {
  EstinantCallExpressionInputParameterVoictent,
  ESTINANT_CALL_EXPRESSION_INPUT_PARAMETER_GEPP,
} from '../estinant-call-expression-parameter/estinantCallExpressionInputParameter';
import {
  VICKEN_NAME,
  VITION_NAME,
  getVoictentName,
  VOICTENT_NAME,
} from './baseEstinantInputOutput';
import {
  EstinantInputListVoictent,
  ESTINANT_INPUT_LIST_GEPP,
  EstinantInput,
} from './estinantInputList';

type VickenInstantiation = IdentifiableTypeScriptTypeReference<
  typeof VICKEN_NAME
> & {
  typeParameters: [IdentifiableTypeScriptTypeReference];
};

type VitionInstantiation = IdentifiableTypeScriptTypeReference<
  typeof VITION_NAME
> & {
  typeParameters: TypeScriptTypeParameterInstantiation<
    [
      IdentifiableTypeScriptTypeReference,
      TSESTree.TSTupleType & {
        elementTypes: VickenInstantiation[];
      },
    ]
  >;
};

const isVitionInstantiation = (
  node: IdentifiableTypeScriptTypeReference | null,
): node is VitionInstantiation =>
  isNode(node) &&
  isSpecificIdentifiableTypeScriptTypeReference(node, VITION_NAME) &&
  isTypeScriptTypeParameterInstantiation(node.typeParameters) &&
  isIdentifiableTypeScriptTypeReference(node.typeParameters.params[0]) &&
  isTypeScriptTupleType(node.typeParameters.params[1]) &&
  node.typeParameters.params[1].elementTypes.every(
    (subNode): subNode is VickenInstantiation =>
      isSpecificIdentifiableTypeScriptTypeReference(subNode, VICKEN_NAME) &&
      isTypeScriptTypeParameterInstantiation(subNode.typeParameters) &&
      isIdentifiableTypeScriptTypeReference(subNode.typeParameters.params[0]),
  );

export const getEstinantInputList = buildEstinant({
  name: 'getEstinantInputList',
})
  .fromHubblepup<EstinantCallExpressionInputParameterVoictent>({
    gepp: ESTINANT_CALL_EXPRESSION_INPUT_PARAMETER_GEPP,
  })
  .toHubblepup<EstinantInputListVoictent>({
    gepp: ESTINANT_INPUT_LIST_GEPP,
  })
  .toHubblepupTuple<ErrorVoictent>({
    gepp: ERROR_GEPP,
  })
  .onPinbe((input) => {
    const callExpressionInputParameter = input.grition;

    const identifiableNode = isIdentifiableTypeScriptTypeReference(
      callExpressionInputParameter.node,
    )
      ? callExpressionInputParameter.node
      : null;

    let voictentNameList: string[] | [];
    if (isVitionInstantiation(identifiableNode)) {
      voictentNameList = [
        getVoictentName(identifiableNode.typeParameters.params[0]),
        ...identifiableNode.typeParameters.params[1].elementTypes.flatMap(
          (subNode: VickenInstantiation) =>
            getVoictentName(
              subNode.typeParameters
                .params[0] as IdentifiableTypeScriptTypeReference,
            ),
        ),
      ];
    } else if (identifiableNode?.typeName.name.endsWith(VOICTENT_NAME)) {
      voictentNameList = [getVoictentName(identifiableNode)];
    } else {
      voictentNameList = [];
    }

    const errorList: unknown[] =
      voictentNameList?.length === 0
        ? [
            {
              hasIdentifiableNode: identifiableNode !== null,
              hasVoictentNameList: voictentNameList !== null,
              identifiableNode,
            },
          ]
        : [];

    const inputList = voictentNameList.map<EstinantInput>(
      (voictentName, index) => {
        return {
          programName: callExpressionInputParameter.programName,
          estinantName: callExpressionInputParameter.estinantName,
          voictentName,
          isInput: true,
          index,
        };
      },
    );

    return {
      [ESTINANT_INPUT_LIST_GEPP]: {
        zorn: input.zorn,
        grition: inputList,
      },
      [ERROR_GEPP]: errorList.map((error, index) => {
        return {
          zorn: `${input.zorn}/${index}`,
          grition: error,
        };
      }),
    };
  })
  .assemble();
