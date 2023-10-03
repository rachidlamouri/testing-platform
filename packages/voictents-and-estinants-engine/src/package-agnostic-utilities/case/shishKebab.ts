import Case from 'case';

export const SHISH_KEBAB_SKEWER = '-' as const;

/**
 * Kebab case but it treats numbers as separate words unlike the "case" library
 */
export const shishKebab = (text: string): string => {
  const kebabed = Case.kebab(text);
  const shishKebabed = kebabed
    .replaceAll(/(\d+)-/g, `${SHISH_KEBAB_SKEWER}$1${SHISH_KEBAB_SKEWER}`)
    .replace(/(\d+)$/, `${SHISH_KEBAB_SKEWER}$1`);

  return shishKebabed;
};
