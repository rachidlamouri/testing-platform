import React, { FunctionComponent } from 'react';
import { PresentationContext } from '../presentationContext';
import { DirectoryFactProps } from '../factProps';
import { useSelectedIdContext } from '../selectedIdContext';

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
    strokeColor = 'SlateBlue';
    strokeWidth = '4';
  } else {
    strokeColor = 'RoyalBlue';
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
