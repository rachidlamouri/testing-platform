import Case from 'case';

export const shishKebab = (text: string): string => {
  const kebabed = Case.kebab(text);
  const shishKebabed = kebabed.replaceAll(/(\d+)-/g, '-$1-');

  return shishKebabed;
};
