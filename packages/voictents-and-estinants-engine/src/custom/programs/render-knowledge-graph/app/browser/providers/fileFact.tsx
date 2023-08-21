import React, { FunctionComponent, PropsWithChildren } from 'react';
import { PresentationContext } from '../presentationContext';
import { useSelectedIdContext } from '../selectedIdContext';

export type FileFactProps = PropsWithChildren<{
  factId: string;
  fileName: string;
}>;

export const FileFact: FunctionComponent<FileFactProps> = ({
  factId,
  children,
}) => {
  const { onToggleOrSelectId, selectedId } = useSelectedIdContext();

  const isSelected = selectedId === factId;

  return (
    <PresentationContext.Provider
      value={{
        onTextClicked: (): void => {
          onToggleOrSelectId(factId);
        },
        hasInteractiveText: true,
        styleByElement: {
          path: {
            stroke: isSelected ? 'black' : 'gray',
            fill: isSelected ? 'green' : 'none',
            strokeWidth: '1',
          },
        },
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};
