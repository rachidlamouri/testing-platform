import React, { PropsWithChildren } from 'react';

export enum StackGap {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}

export type StackProps = PropsWithChildren<{
  gap?: StackGap;
  style?: Pick<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >['style'],
    'flexDirection' | 'justifyContent' | 'alignItems' | 'width' | 'height'
  >;
}>;

const sizeByStackGap: Record<StackGap, string> = {
  [StackGap.Small]: '2px',
  [StackGap.Medium]: '4px',
  [StackGap.Large]: '8px',
};

export const Stack: React.FunctionComponent<StackProps> = ({
  gap = StackGap.Medium,
  style = {},
  children,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: sizeByStackGap[gap],
        padding: '4px',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const StackSpacer: React.FunctionComponent = () => {
  return <span style={{ flex: 1 }}></span>;
};
