import React, { useEffect } from 'react';
import { GeneratedMetadataProvider } from './generatedMetadataContext';
import { LeftPanel } from './left-panel/leftPanel';
import { SelectedIdProvider } from './selectedIdContext';
import { ActiveContent } from './wrappers/activeContent';

export const App: React.FC = () => {
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
          <LeftPanel />
          <div
            style={{
              flexGrow: '1',
              height: '100%',
            }}
          >
            <ActiveContent />
          </div>
        </div>
      </SelectedIdProvider>
    </GeneratedMetadataProvider>
  );
};
