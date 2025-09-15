import React, {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

type SelectionCtx = {
  selectedProgramName: string | null;
  onSelectProgram: (programName: string) => void;

  selectedPartId: string | null;
  onSelectPart: (partId: string) => void;
};

/**
 * React context to Keep track of the selected program
 */
const SelectionContext = createContext<SelectionCtx>({
  selectedProgramName: null,
  onSelectProgram: () => {},
  selectedPartId: null,
  onSelectPart: () => {},
});

export const SelectionProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const [selectedProgramName, setSelectedProgramName] = useState<string | null>(
    null,
  );

  return (
    <SelectionContext.Provider
      value={{
        selectedProgramName,
        onSelectProgram: (programName): void => {
          setSelectedProgramName(programName);
        },
        selectedPartId,
        onSelectPart: (partId): void => {
          if (selectedPartId === partId) {
            setSelectedPartId(null);
          } else {
            setSelectedPartId(partId);
          }
        },
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = (): SelectionCtx => {
  return useContext(SelectionContext);
};
