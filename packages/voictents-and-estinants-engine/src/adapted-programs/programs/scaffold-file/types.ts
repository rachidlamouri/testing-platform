/**
 * @noCanonicalDeclaration
 */

export type ScaffoldeeFileMetadata = {
  getImportStatement: (importConfiguration: ImportConfiguration) => string;
  camelCaseName: string;
  pascalCaseName: string;
  kebabCaseName: string;
  screamingSnakeCaseName: string;
};

export type ImportConfiguration = {
  filePath: string;
  identifierList: string[];
};
