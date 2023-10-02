import Case from 'case';

/**
 * Kebab case but it treats numbers as separate words unlike the "case" library
 */
export const shishKebab = (text: string): string => {
  const kebabed = Case.kebab(text);
  const shishKebabed = kebabed
    .replaceAll(/(\d+)-/g, '-$1-')
    .replace(/(\d+)$/, '-$1');

  return shishKebabed;
};
