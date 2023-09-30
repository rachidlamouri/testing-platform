/**
 *  An accessor for an obsolete zorn pattern
 *
 *  @deprecated
 */
export const getZorn = (partList: string[]): string => {
  return partList.join(':');
};
