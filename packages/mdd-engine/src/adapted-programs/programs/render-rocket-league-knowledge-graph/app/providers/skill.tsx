import React, { FunctionComponent } from 'react';
import {
  ElementStyle,
  PresentationContext,
  TextPartition,
} from '../presentationContext';
import { THEME } from '../theme';
import { SkillProps } from '../props';
import { useAppContext } from '../appContext';

export const Skill: FunctionComponent<SkillProps> = ({
  id,
  title,
  description,
  rank,
  notes,
  upstreamSkills,
  downstreamSkills,
  isRecommended,
  isUnnecessary,
  isSilly,
  children,
}) => {
  const { selectedSkill, skillState } = useAppContext();
  const isDone = skillState.byId[id] ?? false;
  const isSelected = selectedSkill.data?.id === id;
  const isUpstreamOfSelection = downstreamSkills.includes(
    selectedSkill.data?.id,
  );
  const isDownstreamOfSelection = upstreamSkills.includes(
    selectedSkill.data?.id,
  );

  let borderColor: string;
  let borderThickness: string;
  let backgroundColor: string;
  let textColor: string;

  if (isSelected) {
    borderColor = THEME.skill.border.selected;
    borderThickness = '2';
    backgroundColor = THEME.skill.background.selected;
    textColor = THEME.skill.text.selected;
  } else if (isUpstreamOfSelection) {
    borderColor = THEME.skill.border.upstream;
    borderThickness = '2';
    backgroundColor = THEME.skill.background.upstream;
    textColor = THEME.skill.text.upstream;
  } else if (isDownstreamOfSelection) {
    borderColor = THEME.skill.border.downstream;
    borderThickness = '2';
    backgroundColor = THEME.skill.background.downstream;
    textColor = THEME.skill.text.downstream;
  } else {
    borderColor = THEME.skill.border.deselected;
    borderThickness = '1.5';
    backgroundColor = THEME.skill.background.deselected;
    textColor = THEME.skill.text.deselected;
  }

  const styleByRank: Record<string, ElementStyle> = {
    B: {
      fill: THEME.skill.rank.bronze,
    },
    S: {
      stroke: THEME.skill.rank.silver,
      fill: 'none',
      strokeWidth: '1',
    },
    G: { fill: THEME.skill.rank.gold },
    P: { fill: THEME.skill.rank.platinum },
    D: {
      fill: THEME.skill.rank.diamond,
    },
    C: { fill: THEME.skill.rank.champion },
    GC: { fill: THEME.skill.rank.grandChampion },
    SSL: { fill: THEME.skill.rank.ssl },
  };

  const iconStyleByIndex: Record<number, ElementStyle> = {
    0: {
      fill: isDone ? THEME.skill.checkmark.on : THEME.skill.checkmark.off,
      opacity: isDone ? 1 : 0.1,
    },
    1: {
      ...(styleByRank[rank] ?? { fill: 'black' }),
    },
    2: {
      fill: THEME.skill.auxiliary.recommended,
      opacity: isRecommended ? 1 : 0,
    },
    3: {
      fill: THEME.skill.auxiliary.silly,
      opacity: isSilly ? 0.5 : 0,
    },
    4: {
      fill: THEME.skill.auxiliary.unnecessary,
      opacity: isUnnecessary ? 0.5 : 0,
    },
  };

  return (
    <PresentationContext.Provider
      value={{
        styleByElement: {
          path: {
            stroke: borderColor,
            fill: backgroundColor,
            strokeWidth: borderThickness,
          },
        },
        partitionText: (text): TextPartition[] => {
          if (text.startsWith('_')) {
            const partitions = text
              .replace('_', '')
              .split(' ')
              .map((subtext, index) => {
                return {
                  text: subtext,
                  style: {
                    strokeWidth: '.2',
                    stroke: THEME.skill.auxiliary.stroke,
                    ...iconStyleByIndex[index],
                  },
                  onTextClicked: (): void => {
                    if (index === 0) {
                      const oldValue = skillState.byId[id] ?? false;

                      skillState.setIsChecked(id, !oldValue);
                    }
                  },
                } satisfies TextPartition;
              });

            return partitions;
          }
          return [
            {
              text,
              style: {
                fill: textColor,
              },
              onTextClicked: (): void => {
                selectedSkill.setOrToggle({
                  id,
                  title,
                  description,
                  notes,
                });
              },
            } satisfies TextPartition,
          ];
        },
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};
