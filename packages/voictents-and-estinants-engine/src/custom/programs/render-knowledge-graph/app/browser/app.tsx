import React, { useCallback, useEffect, useRef, useState } from 'react';
import svgPanZoom from 'svg-pan-zoom';
import { Main } from './example';
import { GeneratedCollection } from './generatedTypes';

const generatedPromise: Promise<any> = import('./generated');

export const App: React.FC = () => {
  const svgReference = useCallback((svg: SVGSVGElement) => {
    if (svg !== null) {
      svgPanZoom(svg, {
        minZoom: 0.3,
        maxZoom: 15,
        zoomScaleSensitivity: 0.2,
      });
    }
  }, []);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [generated, setGenerated] = useState<GeneratedCollection | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    generatedPromise.then(
      ({ default: value }: { default: GeneratedCollection }) => {
        setGenerated(value);
      },
    );
  });

  if (generated === null) {
    return null;
  }

  const { Component } = generated[selectedIndex];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '400px auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid black',
          padding: '8px',
          margin: '0px',
        }}
      >
        {generated.map(({ label }, index) => {
          return (
            <button
              key={label}
              style={{
                backgroundColor: index === selectedIndex ? '5e97ff' : undefined,
                marginBottom: '8px',
                outline: 'none',
              }}
              onClick={(): void => {
                setSelectedIndex(index);
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div>
        <Component ref={svgReference} />
      </div>
    </div>
  );

  // TODO: create ReactComponents for top level concepts like directory subgraph, file node ...etc
  // map the decoded svg elements to their react concepts by id
  // OPTIONAL: make an intermediate mapping between sets of svg elements and their corresponding React stuff

  console.log('FOO!');
  return <Main />;
};
