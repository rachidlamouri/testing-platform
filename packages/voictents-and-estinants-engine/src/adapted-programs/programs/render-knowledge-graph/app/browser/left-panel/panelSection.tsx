import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import React, { PropsWithChildren, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Stack } from '../stack';
import { THEME } from '../theme';

type PanelSectionProps = PropsWithChildren<{
  title: React.ReactElement;
  isInitiallyVisible?: boolean;
}>;

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
          {isVisible ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
          {title}
        </Stack>
      </div>
      {isVisible && (
        <div
          style={{
            paddingLeft: '6px',
            paddingBottom: '6px',
          }}
        >
          {children}
        </div>
      )}
    </>
  );
};
