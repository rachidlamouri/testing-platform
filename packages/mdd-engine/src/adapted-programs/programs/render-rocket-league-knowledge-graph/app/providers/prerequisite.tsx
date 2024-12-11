import React, { FunctionComponent } from 'react';
import { PresentationContext } from '../presentationContext';
import { THEME } from '../theme';
import { PrerequisiteProps } from '../props';

export const Prerequisite: FunctionComponent<PrerequisiteProps> = ({
  children,
}) => {
  const lineColor = THEME.prerequisite.deselected;
  const arrowBorderColor = THEME.prerequisite.deselected;
  const arrowColor = THEME.prerequisite.deselected;
  const borderThickness = '.5';
  // const strokeColor: string = THEME.colors.tomahto;
  // const strokeWidth = '2';
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
        onTextClicked: (): void => {},
        hasInteractiveText: false,
        styleByElement: {
          // line
          path: {
            stroke: lineColor,
            strokeWidth: borderThickness,
          },
          // arrowhead
          polygon: {
            fill: arrowColor,
            stroke: arrowBorderColor,
            strokeWidth: borderThickness,
          },
        },
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};
