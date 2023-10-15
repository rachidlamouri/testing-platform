/**
 *  An accessor for an obsolete id pattern
 *
 *  @deprecated
 *
 *  @readableName getId
 */
export const getId = (partList: string[]): string => {
  return partList.join(':');
};
