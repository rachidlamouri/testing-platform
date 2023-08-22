import React, { FunctionComponent, PropsWithChildren } from 'react';
import { PresentationContext } from '../presentationContext';
import { useSelectedIdContext } from '../selectedIdContext';

export type FileFactProps = PropsWithChildren<{
  factId: string;
  fileName: string;
  importedNodeIdSet: Set<string>;
  importingNodeIdSet: Set<string>;
}>;

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
  if (isSelected) {
    strokeColor = 'green';
  } else if (isImportedNodeSelected) {
    strokeColor = 'blue';
  } else if (isImportingNodeSelected) {
    strokeColor = 'purple';
  } else {
    strokeColor = 'gray';
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
            strokeWidth: '1',
          },
        },
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};
