import { Plifal } from '../../../custom-adapter/plifal';
import {
  buildMentursectionHamletive,
  Paraker,
} from '../../../type-script-adapter/hamletive/mentursection';
import {
  CustomImportDeclarationTypeName,
  TypeScriptFileD2,
  TypeScriptFileD2Odeshin,
  TypeScriptFileD2Plifal,
  TYPE_SCRIPT_FILE_D2_GEPP,
} from './typeScriptFileD2';
import { QuirmOptionTuple } from '../../../type-script-adapter/quirmOptionTuple';

export type ProgramFileA = TypeScriptFileD2;

export type ProgramFileAOdeshin = TypeScriptFileD2Odeshin;

export const PROGRAM_FILE_A_GEPP = 'program-file-a';

export type ProgramFileAGepp = typeof PROGRAM_FILE_A_GEPP;

export type ProgramFileAPlifal = Plifal<
  [ProgramFileAGepp],
  ProgramFileAOdeshin
>;

type InputOptionTuple = QuirmOptionTuple<[TypeScriptFileD2Plifal]>;
type OutputOptionTuple = QuirmOptionTuple<[ProgramFileAPlifal]>;

const isProgramFileA: Paraker<
  InputOptionTuple,
  OutputOptionTuple,
  ProgramFileAPlifal
> = (input): input is ProgramFileAOdeshin => {
  const hasImport = input.grition.additionalMetadata.importDeclarationList.some(
    (importDeclaration) => {
      return (
        importDeclaration.typeName === CustomImportDeclarationTypeName.Local &&
        importDeclaration.filePath ===
          'packages/open-schema-type-script/src/core/digikikify.ts' &&
        importDeclaration.specifierList.includes('digikikify')
      );
    },
  );

  return hasImport;
};

export const programFileAEstinant = buildMentursectionHamletive<
  InputOptionTuple,
  OutputOptionTuple
>({
  inputGepp: TYPE_SCRIPT_FILE_D2_GEPP,
  kerzTuple: [
    {
      outputGeppTuple: [PROGRAM_FILE_A_GEPP],
      parak: isProgramFileA,
    },
  ],
});
