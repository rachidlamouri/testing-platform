import React, { useEffect, useState } from 'react';

export type LeftPanelEdgeProps = {
  onSizeChange: (delta: number) => void;
};

export const LeftPanelEdge: React.FunctionComponent<LeftPanelEdgeProps> = ({
  onSizeChange,
}) => {
  const [containsMouse, setContainsMouse] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouseX, setLastMouseX] = useState<number>(null);

  useEffect(() => {
    document.addEventListener('mouseup', () => {
      setIsDragging(false);
      setLastMouseX(null);
    });
  });

  useEffect(() => {
    const moveListener = (event: MouseEvent): void => {
      if (!isDragging) {
        return;
      }

      if (lastMouseX !== null) {
        const delta = event.clientX - lastMouseX;
        onSizeChange(delta);
      }

      setLastMouseX(event.clientX);
    };

    document.addEventListener('mousemove', moveListener);

    return () => {
      document.removeEventListener('mousemove', moveListener);
    };
  }, [isDragging, lastMouseX]);

  useEffect(() => {
    document.body.style.cursor =
      containsMouse || isDragging ? 'col-resize' : 'inherit';
  }, [containsMouse, isDragging]);

  return (
    <div
      style={{
        width: '2px',
        height: '100%',
        backgroundColor: '#333',
      }}
      onMouseDown={(): void => {
        setIsDragging(true);
      }}
      onMouseEnter={(): void => {
        setContainsMouse(true);
      }}
      onMouseLeave={(): void => {
        setContainsMouse(false);
      }}
    />
  );
};