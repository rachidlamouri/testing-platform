const DELIMITER = ':' as const;

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
