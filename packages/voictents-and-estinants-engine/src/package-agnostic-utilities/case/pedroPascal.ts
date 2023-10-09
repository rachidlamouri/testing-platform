export const parsePedroPascal = (text: string): string[] => {
  const kebabed1 = text
    .replaceAll(/(\d+)/g, '-$1')
    .replaceAll(/(?<!^)([A-Z])/g, '-$1');

  const result = kebabed1.split('-').map((subtext) => subtext.toLowerCase());

  return result;
};
