import React, { FunctionComponent } from 'react';
import { PresentationContext } from '../presentationContext';
import { THEME } from '../theme';
import { SkillProps } from '../props';
import { useAppContext } from '../appContext';

export const Skill: FunctionComponent<SkillProps> = ({
  id,
  title,
  notes,
  upstreamSkills,
  downstreamSkills,
  children,
}) => {
  const { selectedSkill } = useAppContext();
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

  return (
    <PresentationContext.Provider
      value={{
        onTextClicked: (): void => {
          selectedSkill.setOrToggle({
            id,
            title,
            notes,
          });
        },
        hasInteractiveText: true,
        styleByElement: {
          path: {
            stroke: borderColor,
            fill: backgroundColor,
            strokeWidth: borderThickness,
          },
          text: {
            fill: textColor,
          },
        },
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};
