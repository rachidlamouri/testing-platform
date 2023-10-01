const DELIMITER = ':' as const;

/**
 * A deprecated utility for construfcting an identifier. Use Zorn2 instead.
 *
 * @deprecated
 */
export const getVoictentResourceLocator = (partList: string[]): string => {
  if (partList.some((part) => part.includes(DELIMITER))) {
    throw Error(
      `Voictent resource locator parts cannot contain delimiter "${DELIMITER}"; Received: [${partList.join(
        ', ',
      )}]`,
    );
  }

  return partList.join(DELIMITER);
};
