import React, { FunctionComponent } from 'react';
import { PresentationContext } from '../presentationContext';
import { DirectoryFactProps } from '../factProps';
import { useSelectedIdContext } from '../selectedIdContext';
import { THEME } from '../theme';

/**
 * Represents a directory.
 *
 * @todo make this component more interactive
 */
export const DirectoryFact: FunctionComponent<DirectoryFactProps> = ({
  directoryPath,
  boundaryId,
  isBoundaryDirectory,
  children,
}) => {
  const { selectedBoundaryId } = useSelectedIdContext();

  let strokeColor: string;
  let strokeWidth: string;
  if (isBoundaryDirectory && boundaryId === selectedBoundaryId) {
    strokeColor = THEME.boundary.selected;
    strokeWidth = '4';
  } else {
    strokeColor = THEME.directory.color;
    strokeWidth = '2';
  }

  return (
    <PresentationContext.Provider
      value={{
        onTextClicked: (): void => {
          // eslint-disable-next-line no-console
          console.log({
            directoryPath,
            isBoundaryDirectory,
            boundaryId,
            selectedBoundaryId,
          });
        },
        hasInteractiveText: true,
        styleByElement: {
          path: {
            stroke: strokeColor,
            // fill: 'none',
            strokeWidth,
          },
        },
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};
