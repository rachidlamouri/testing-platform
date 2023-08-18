import React, { FunctionComponent, PropsWithChildren } from 'react';
import { PresentationContext } from '../presentationContext';

export type FileFactProps = PropsWithChildren<{
  factId: string;
  fileName: string;
}>;

export const FileFact: FunctionComponent<FileFactProps> = ({
  factId,
  fileName,
  children,
}) => {
  return (
    <PresentationContext.Provider
      value={{
        onTextClicked: (): void => {
          // eslint-disable-next-line no-console
          console.log(`Text Clicked for ${factId} ${fileName}`);
        },
        hasInteractiveText: true,
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};
