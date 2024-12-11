import React, { FunctionComponent } from 'react';
import { PresentationContext } from '../presentationContext';
import { THEME } from '../theme';
import { SkillProps } from '../props';

export const Skill: FunctionComponent<SkillProps> = ({ children }) => {
  // let strokeColor: string;
  // let strokeWidth: string;
  // if (isSelected) {
  //   strokeColor = THEME.file.selected;
  //   strokeWidth = '2';
  // } else if (isImportingNodeSelected) {
  //   strokeColor = THEME.file.importsSelectedFile;
  //   strokeWidth = '2';
  // } else if (isImportedNodeSelected) {
  //   strokeColor = THEME.file.importedBySelectedFile;
  //   strokeWidth = '2';
  // } else {

  const borderColor: string = THEME.skill.border.deselected;
  const borderThickness = '1.5';
  const backgroundColor: string = THEME.skill.background.deselected;
  const textColor: string = THEME.skill.text.deselected;
  // }

  return (
    <PresentationContext.Provider
      value={{
        onTextClicked: (): void => {
          // onToggleOrSelectId(factId);
          // onToggleSecondaryBoundaryId(boundaryId);
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
