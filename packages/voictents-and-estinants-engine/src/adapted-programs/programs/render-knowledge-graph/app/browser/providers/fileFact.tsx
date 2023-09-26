import React, { FunctionComponent } from 'react';
import { PresentationContext } from '../presentationContext';
import { useSelectedIdContext } from '../selectedIdContext';
import { FileFactProps } from '../factProps';
import { THEME } from '../theme';

export const FileFact: FunctionComponent<FileFactProps> = ({
  factId,
  boundaryId,
  importedNodeIdSet,
  importingNodeIdSet,
  children,
}) => {
  const { onToggleSecondaryBoundaryId, onToggleOrSelectId, selectedId } =
    useSelectedIdContext();

  const isSelected = selectedId === factId;
  const isImportedNodeSelected = importedNodeIdSet.has(selectedId);
  const isImportingNodeSelected = importingNodeIdSet.has(selectedId);

  let strokeColor: string;
  let strokeWidth: string;
  if (isSelected) {
    strokeColor = THEME.file.selected;
    strokeWidth = '2';
  } else if (isImportingNodeSelected) {
    strokeColor = THEME.file.importsSelectedFile;
    strokeWidth = '2';
  } else if (isImportedNodeSelected) {
    strokeColor = THEME.file.importedBySelectedFile;
    strokeWidth = '2';
  } else {
    strokeColor = THEME.file.deselected;
    strokeWidth = '1';
  }

  return (
    <PresentationContext.Provider
      value={{
        onTextClicked: (): void => {
          onToggleOrSelectId(factId);
          onToggleSecondaryBoundaryId(boundaryId);
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
