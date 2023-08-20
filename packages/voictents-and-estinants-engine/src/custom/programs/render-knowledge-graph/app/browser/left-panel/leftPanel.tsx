import React, { useState } from 'react';
import { useGeneratedMetadata } from '../useGeneratedMetadata';
import { LeftPanelEdge } from './leftPanelEdge';
import { useSelectedIdContext } from '../selectedIdContext';

export type LeftPanelProps = {
  selectedIndex: number;
  onIndexSelected: (index: number) => void;
};

const MIN_WIDTH = 100;
const MAX_WIDTH = 800;

enum ButtonState {
  Normal = 'Normal',
  Highlighted = 'Highlighted',
  Error = 'Error',
}

export const LeftPanel: React.FunctionComponent<LeftPanelProps> = ({
  selectedIndex,
  onIndexSelected,
}) => {
  const [buttonState, setButtonState] = useState<ButtonState>(
    ButtonState.Normal,
  );
  const { componentMetadataList, metadataById } = useGeneratedMetadata();
  const { selectedId } = useSelectedIdContext();
  const [panelWidth, setPanelWidth] = useState(400);

  if (componentMetadataList === null) {
    return null;
  }

  const selectedMetadata =
    selectedId !== null ? metadataById[selectedId] ?? null : null;

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '8px',
            margin: '0px',
            height: '100%',
            width: panelWidth,
          }}
        >
          {componentMetadataList.map(({ label }, index) => {
            return (
              <button
                key={label}
                style={{
                  backgroundColor:
                    index === selectedIndex ? '5e97ff' : undefined,
                  marginBottom: '8px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
                onClick={(): void => {
                  onIndexSelected(index);
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
        <hr style={{ width: '95%' }} />
        {selectedMetadata !== null && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '8px',
              margin: '0px',
              height: '100%',
              width: panelWidth,
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: '6px',
              }}
            >
              <h3
                style={{
                  margin: 0,
                  marginRight: '4px',
                }}
              >
                {selectedMetadata.title}
              </h3>
              <span
                style={{
                  flex: 1,
                }}
              />
              <button
                style={{
                  backgroundColor: ((): string => {
                    switch (buttonState) {
                      case ButtonState.Normal:
                        return 'buttonface';
                      case ButtonState.Highlighted:
                        return 'green';
                      case ButtonState.Error:
                        return 'red';
                    }
                  })(),
                }}
                onClick={(): void => {
                  navigator.clipboard
                    .writeText(selectedMetadata.fileSystemPath)
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
              >
                Copy Filepath
              </button>
            </span>
            <span style={{ paddingLeft: '8px' }}>
              {selectedMetadata.fieldList.map((field) => {
                return (
                  <span key={`${selectedMetadata.id}-${field.label}`}>
                    <h4
                      style={{
                        margin: 0,
                        marginBottom: '2px',
                      }}
                    >
                      {field.label}
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        marginBottom: '16px',
                      }}
                    >
                      {field.value}
                    </p>
                  </span>
                );
              })}
            </span>
          </div>
        )}
      </div>
      <LeftPanelEdge
        onSizeChange={(delta): void => {
          let nextWidth = panelWidth + delta;
          nextWidth = Math.max(MIN_WIDTH, nextWidth);
          nextWidth = Math.min(nextWidth, MAX_WIDTH);

          setPanelWidth(nextWidth);
        }}
      />
    </div>
  );
};
