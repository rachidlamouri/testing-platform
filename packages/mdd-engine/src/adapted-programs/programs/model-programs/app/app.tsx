import React, { useEffect } from 'react';
import { Layout } from '../../render-knowledge-graph/app/browser/layout';
import { useGeneratedData } from './contexts/generatedDataContext';
import { ActiveContent } from './activeContent';
import { useSelection } from './contexts/selectionContext';
import { NavigationButton } from './navigationButton';

/**
 * The Program Modeler React application
 */
export const App: React.FC = () => {
  const { programList } = useGeneratedData();
  const { onSelectProgram } = useSelection();

  useEffect(() => {
    document.body.style.fontFamily = 'Helvetica';
  });

  useEffect(() => {
    if (programList.length > 0) {
      onSelectProgram(programList[0].programName);
    }
  }, [programList]);

  return (
    <Layout
      headingContent={
        <h1
          style={{
            fontSize: '28px',
            margin: '0px',
          }}
        >
          Program Models
        </h1>
      }
      leftPanelContent={programList.map((programMetadata) => {
        return (
          <NavigationButton
            key={programMetadata.programName}
            programMetadata={programMetadata}
          />
        );
      })}
      mainContent={<ActiveContent />}
    />
  );
};
