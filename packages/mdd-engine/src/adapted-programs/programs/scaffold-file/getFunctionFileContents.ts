import Case from 'case';
import { ScaffoldeeFileMetadata } from './types';

/**
 * Constructs the boilerplate text a function
 */
export const getFunctionFileContents = ({
  pascalCaseName,
  kebabCaseName,
}: ScaffoldeeFileMetadata): string => {
  const [actionName, ...subjectNamePartList] = kebabCaseName.split('-');

  const pascalActionName = Case.pascal(actionName);
  const pascalSubjectName = Case.pascal(subjectNamePartList.join('-'));

  const inputTypeName = `${pascalCaseName}Input`;
  const outputTypeName = `${pascalActionName}ed${pascalSubjectName}`;
  const functionCodeName = `${actionName}${pascalSubjectName}`;

  const fileContents = `
type ${inputTypeName} = {
  placeholder: string;
}

type ${outputTypeName} = {
  placeholder: string;
}

export const ${functionCodeName} = ({
  placeholder
}: ${inputTypeName}): ${outputTypeName} => {
  return {
    placeholder
  }
}
`;

  return fileContents;
};
