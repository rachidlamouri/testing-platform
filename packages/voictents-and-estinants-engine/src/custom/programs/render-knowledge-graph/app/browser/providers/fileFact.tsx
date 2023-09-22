import React, { FunctionComponent } from 'react';
import { PresentationContext } from '../presentationContext';
import { useSelectedIdContext } from '../selectedIdContext';
import { FileFactProps } from '../factProps';

export const FileFact: FunctionComponent<FileFactProps> = ({
  factId,
  importedNodeIdSet,
  importingNodeIdSet,
  children,
}) => {
  const { onToggleOrSelectId, selectedId } = useSelectedIdContext();

  const isSelected = selectedId === factId;
  const isImportedNodeSelected = importedNodeIdSet.has(selectedId);
  const isImportingNodeSelected = importingNodeIdSet.has(selectedId);

  let strokeColor: string;
  let strokeWidth: string;
  if (isSelected) {
    strokeColor = 'green';
    strokeWidth = '2';
  } else if (isImportingNodeSelected) {
    strokeColor = 'tomato';
    strokeWidth = '2';
  } else if (isImportedNodeSelected) {
    strokeColor = '#660033';
    strokeWidth = '2';
  } else {
    strokeColor = 'gray';
    strokeWidth = '1';
  }

  return (
    <PresentationContext.Provider
      value={{
        onTextClicked: (): void => {
          onToggleOrSelectId(factId);
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
