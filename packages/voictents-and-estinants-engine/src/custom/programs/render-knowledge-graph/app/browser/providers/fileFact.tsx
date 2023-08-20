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
  const { onToggleOrSelectId } = useSelectedIdContext();

  return (
    <PresentationContext.Provider
      value={{
        onTextClicked: (): void => {
          onToggleOrSelectId(factId);
        },
        hasInteractiveText: true,
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};
