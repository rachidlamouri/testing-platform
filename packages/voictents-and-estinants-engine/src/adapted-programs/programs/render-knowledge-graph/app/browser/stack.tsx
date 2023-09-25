import React, { PropsWithChildren } from 'react';

export type StackProps = PropsWithChildren<{
  style: Pick<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >['style'],
    'flexDirection' | 'justifyContent' | 'alignItems'
  >;
}>;

export const Stack: React.FunctionComponent<StackProps> = ({
  style,
  children,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '4px',
        padding: '4px',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
