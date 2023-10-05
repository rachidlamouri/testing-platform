/**
 *  An accessor for an obsolete zorn pattern
 *
 *  @deprecated
 *
 *  @readableName getId
 */
export const getZorn = (partList: string[]): string => {
  return partList.join(':');
};
