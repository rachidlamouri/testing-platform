import { IdentifiableTypeScriptTypeReference } from '../../../../utilities/type-script-ast/isIdentifiableTypeScriptTypeReference';

export type BaseEstinantInputOutput<
  TIsInput extends boolean,
  TIndex extends number | null,
> = {
  id: string;
  programName: string;
  estinantName: string;
  voictentName: string;
  isInput: TIsInput;
  index: TIndex;
};

export const VITION_NAME = 'Vition';
export const VOICTENT_NAME = 'Voictent';
export const VICKEN_NAME = 'Vicken';

export const getVoictentName = (
  node: IdentifiableTypeScriptTypeReference,
): string =>
  node.typeName.name.substring(
    0,
    node.typeName.name.length - VOICTENT_NAME.length,
  );
