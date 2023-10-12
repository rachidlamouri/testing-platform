/**
 *  An accessor for an obsolete zorn pattern
 *
 *  @deprecated
 *
 *  @readableName getId
 */
export const getId = (partList: string[]): string => {
  return partList.join(':');
};
