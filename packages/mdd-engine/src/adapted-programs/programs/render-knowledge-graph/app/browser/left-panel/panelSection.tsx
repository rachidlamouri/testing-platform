import React, { PropsWithChildren, ReactElement, useState } from 'react';
import { Stack } from '../stack';
import { THEME } from '../theme';

const ChevronDown = (): ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
      />
    </svg>
  );
};

const ChevronUp = (): ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
      />
    </svg>
  );
};

type PanelSectionProps = PropsWithChildren<{
  title: React.ReactElement;
  isInitiallyVisible?: boolean;
}>;

/**
 * A layout component for an accordion style navigation section.
 */
export const PanelSection: React.FunctionComponent<PanelSectionProps> = ({
  title,
  children,
  isInitiallyVisible = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(isInitiallyVisible);

  return (
    <>
      <div
        style={{
          display: 'flex',
          cursor: 'pointer',
          paddingBottom: '4px',
          backgroundColor: isHovered
            ? THEME.colors.lightBlurple
            : 'transparent',
        }}
        onClick={(): void => {
          setIsVisible(!isVisible);
        }}
        onMouseEnter={(): void => {
          setIsHovered(true);
        }}
        onMouseLeave={(): void => {
          setIsHovered(false);
        }}
      >
        <Stack
          style={{
            alignItems: 'center',
          }}
        >
          {isVisible ? <ChevronUp /> : <ChevronDown />}
          {title}
        </Stack>
      </div>
      {
        <div
          style={{
            display: isVisible ? 'block' : 'none',
            paddingLeft: '6px',
            paddingBottom: '6px',
          }}
        >
          {children}
        </div>
      }
    </>
  );
};
