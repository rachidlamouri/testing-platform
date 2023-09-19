import React, {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

type SelectedIdCtx = {
  selectedBoundaryId: string | null;
  onSelectBoundaryId: (id: string) => void;
  selectedId: string | null;
  onToggleOrSelectId: (id: string) => void;
  onSelectId: (id: string) => void;
  onClearId: () => void;
};

export const SelectedIdContext = createContext<SelectedIdCtx>({
  selectedBoundaryId: null,
  onSelectBoundaryId: () => {},
  selectedId: null,
  onToggleOrSelectId: () => {},
  onSelectId: () => {},
  onClearId: () => {},
});

export const SelectedIdProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [selectedGraphId, setSelectedGraphId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return (
    <SelectedIdContext.Provider
      value={{
        selectedBoundaryId: selectedGraphId,
        onSelectBoundaryId: (id): void => {
          setSelectedGraphId(id);
        },
        selectedId,
        onToggleOrSelectId: (id): void => {
          if (id === selectedId) {
            setSelectedId(null);
          } else {
            setSelectedId(id);
          }
        },
        onSelectId: (id): void => {
          setSelectedId(id);
        },
        onClearId: (): void => {
          setSelectedId(null);
        },
      }}
    >
      {children}
    </SelectedIdContext.Provider>
  );
};

export const useSelectedIdContext = (): SelectedIdCtx => {
  return useContext(SelectedIdContext);
};
