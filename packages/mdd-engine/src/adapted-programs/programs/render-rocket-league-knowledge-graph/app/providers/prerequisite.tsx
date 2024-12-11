import React, { FunctionComponent } from 'react';
import { PresentationContext } from '../presentationContext';
import { THEME } from '../theme';
import { PrerequisiteProps } from '../props';
import { useAppContext } from '../appContext';

export const Prerequisite: FunctionComponent<PrerequisiteProps> = ({
  tailId,
  headId,
  children,
}) => {
  const { selectedSkill } = useAppContext();
  const isUpstream = selectedSkill.id === headId;
  const isDownstream = selectedSkill.id === tailId;

  let lineColor: string;
  let arrowBorderColor: string;
  let arrowColor: string;
  let borderThickness: string;

  if (isUpstream) {
    lineColor = THEME.prerequisite.upstream;
    arrowBorderColor = THEME.prerequisite.upstream;
    arrowColor = THEME.prerequisite.upstream;
    borderThickness = '2';
  } else if (isDownstream) {
    lineColor = THEME.prerequisite.downstream;
    arrowBorderColor = THEME.prerequisite.downstream;
    arrowColor = THEME.prerequisite.downstream;
    borderThickness = '2';
  } else {
    lineColor = THEME.prerequisite.deselected;
    arrowBorderColor = THEME.prerequisite.deselected;
    arrowColor = THEME.prerequisite.deselected;
    borderThickness = '.5';
  }

  return (
    <PresentationContext.Provider
      value={{
        onTextClicked: (): void => {},
        hasInteractiveText: false,
        styleByElement: {
          // line
          path: {
            stroke: lineColor,
            strokeWidth: borderThickness,
          },
          // arrowhead
          polygon: {
            fill: arrowColor,
            stroke: arrowBorderColor,
            strokeWidth: borderThickness,
          },
        },
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};
