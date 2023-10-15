const DELIMITER = ':' as const;

/**
 * A deprecated utility for constructing an identifier. Use ComplexId instead.
 *
 * @deprecated
 *
 * @readableName getCollectionResourceLocator
 */
export const getCollectionResourceLocator = (partList: string[]): string => {
  if (partList.some((part) => part.includes(DELIMITER))) {
    throw Error(
      `Voictent resource locator parts cannot contain delimiter "${DELIMITER}"; Received: [${partList.join(
        ', ',
      )}]`,
    );
  }

  return partList.join(DELIMITER);
};
