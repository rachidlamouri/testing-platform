import React, { useEffect, useState } from 'react';
import { GeneratedMetadataProvider } from './generatedMetadataContext';
import { LeftPanel } from './left-panel/leftPanel';
import { SelectedIdProvider } from './selectedIdContext';
import { ActiveContent } from './wrappers/activeContent';

export const App: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    document.body.style.fontFamily = 'Helvetica';
  });

  return (
    <GeneratedMetadataProvider>
      <SelectedIdProvider>
        <div
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
          }}
        >
          <LeftPanel
            selectedIndex={selectedIndex}
            onIndexSelected={setSelectedIndex}
          />
          <div
            style={{
              flexGrow: '1',
              height: '100%',
            }}
          >
            <ActiveContent selectedIndex={selectedIndex} />
          </div>
        </div>
      </SelectedIdProvider>
    </GeneratedMetadataProvider>
  );
};
