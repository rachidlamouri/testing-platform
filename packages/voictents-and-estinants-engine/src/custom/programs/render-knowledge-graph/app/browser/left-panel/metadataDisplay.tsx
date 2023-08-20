import React, { FunctionComponent, useState } from 'react';
import { useSelectedIdContext } from '../selectedIdContext';
import { useGeneratedMetadata } from '../generatedMetadataContext';
import { Metadata } from '../dynamicComponentTypes';

enum ButtonState {
  Normal = 'Normal',
  Highlighted = 'Highlighted',
  Error = 'Error',
}

const MetadataHeader: FunctionComponent<{
  selectedMetadata: Metadata;
}> = ({ selectedMetadata }) => {
  const [buttonState, setButtonState] = useState<ButtonState>(
    ButtonState.Normal,
  );

  return (
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
        {selectedMetadata?.title ?? 'No Selection'}
      </h3>
      <span
        style={{
          flex: 1,
        }}
      />
      {selectedMetadata !== null && (
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
      )}
    </span>
  );
};

const MetadataFields: FunctionComponent<{ selectedMetadata: Metadata }> = ({
  selectedMetadata,
}) => {
  return (
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
  );
};

export type MetadataDisplayProps = {
  panelWidth: number;
};

export const MetadataDisplay: FunctionComponent<MetadataDisplayProps> = ({
  panelWidth,
}) => {
  const { metadataById } = useGeneratedMetadata();
  const { selectedId } = useSelectedIdContext();

  const selectedMetadata =
    selectedId !== null ? metadataById[selectedId] ?? null : null;

  return (
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
      <MetadataHeader selectedMetadata={selectedMetadata} />
      {selectedMetadata !== null && (
        <MetadataFields selectedMetadata={selectedMetadata} />
      )}
    </div>
  );
};
