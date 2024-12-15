import React, { FunctionComponent } from 'react';
import { PresentationContext } from '../presentationContext';
import { THEME } from '../theme';
import { RankGroupProps } from '../props';

export const RankGroup: FunctionComponent<RankGroupProps> = ({
  id,
  children,
}) => {
  const strokeColor = {
    B: THEME.skill.rank.bronze,
    S: THEME.skill.rank.silver,
    G: THEME.skill.rank.gold,
    P: THEME.skill.rank.platinum,
    D: THEME.skill.rank.diamond,
    C: THEME.skill.rank.champion,
    GC: THEME.skill.rank.grandChampion,
    SSL: THEME.skill.rank.ssl,
  }[id];

  return (
    <PresentationContext.Provider
      value={{
        onTextClicked: (): void => {},
        styleByElement: {
          path: {
            stroke: strokeColor,
            strokeWidth: '2',
          },
        },
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};
