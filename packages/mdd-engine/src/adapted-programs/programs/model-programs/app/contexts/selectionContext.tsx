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
};

/**
 * React context to Keep track of the selected program
 */
const SelectionContext = createContext<SelectionCtx>({
  selectedProgramName: null,
  onSelectProgram: () => {},
});

export const SelectionProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
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
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = (): SelectionCtx => {
  return useContext(SelectionContext);
};
