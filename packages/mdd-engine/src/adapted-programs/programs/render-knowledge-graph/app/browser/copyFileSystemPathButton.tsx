import React, { useState } from 'react';
import { THEME } from './theme';

enum ButtonState {
  Normal = 'Normal',
  Highlighted = 'Highlighted',
  Error = 'Error',
}

type CopyFileSystemPathButtonProps = {
  fileSystemPath: string;
};

/**
 * A button for copying a file path to the clipboard, so that a developer can
 * open the file in their editor of choice. If the knowledge graph can open an
 * editor directly then this behavior would not be needed.
 */
export const CopyFileSystemPathButton: React.FunctionComponent<
  CopyFileSystemPathButtonProps
> = ({ fileSystemPath }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [buttonState, setButtonState] = useState<ButtonState>(
    ButtonState.Normal,
  );

  return (
    <button
      style={{
        cursor: 'pointer',
        backgroundColor: ((): string => {
          if (buttonState === ButtonState.Highlighted) {
            return THEME.colors.grass;
          }

          if (isHovered) {
            return THEME.colors.gymboreeBlue;
          }

          switch (buttonState) {
            case ButtonState.Normal:
              return 'buttonface';
            case ButtonState.Error:
              return THEME.colors.tomahto;
          }
        })(),
      }}
      onClick={(): void => {
        navigator.clipboard
          .writeText(fileSystemPath)
          .then(() => {
            setButtonState(ButtonState.Highlighted);
          })
          .catch((error) => {
            setButtonState(ButtonState.Error);
            // eslint-disable-next-line no-console
            console.log(error);
          })
          .finally(() => {
            setTimeout(() => {
              setButtonState(ButtonState.Normal);
            }, 500);
          });
      }}
      onMouseEnter={(): void => {
        setIsHovered(true);
      }}
      onMouseLeave={(): void => {
        setIsHovered(false);
      }}
    >
      Copy Path
    </button>
  );
};
