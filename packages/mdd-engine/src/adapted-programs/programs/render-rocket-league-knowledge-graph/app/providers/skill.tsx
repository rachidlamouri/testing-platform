import React, { FunctionComponent } from 'react';
import { PresentationContext } from '../presentationContext';
import { THEME } from '../theme';
import { SkillProps } from '../props';

export const Skill: FunctionComponent<SkillProps> = ({ children }) => {
  const strokeColor: string = THEME.colors.tomahto;
  const strokeWidth = '2';
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
  //   strokeColor = THEME.file.deselected;
  //   strokeWidth = '1';
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
            stroke: strokeColor,
            fill: 'none',
            strokeWidth,
          },
        },
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};
