import React, { FunctionComponent } from 'react';
import { PresentationContext } from '../presentationContext';
import { THEME } from '../theme';
import { PrerequisiteProps } from '../props';

export const Prerequisite: FunctionComponent<PrerequisiteProps> = ({
  children,
}) => {
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
          // edge
          path: {
            stroke: THEME.colors.graphite,
            strokeWidth: '.5',
          },
          // arrowhead
          polygon: {
            fill: THEME.colors.graphite,
            stroke: THEME.colors.plum,
            strokeWidth: '.5',
          },
        },
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};
