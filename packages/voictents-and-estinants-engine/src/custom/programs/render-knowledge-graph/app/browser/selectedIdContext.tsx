import React, {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

type SelectedIdCtx = {
  selectedId: string | null;
  onToggleOrSelectId: (id: string) => void;
  onSelectId: (id: string) => void;
  onClearId: () => void;
};

export const SelectedIdContext = createContext<SelectedIdCtx>({
  selectedId: null,
  onToggleOrSelectId: () => {},
  onSelectId: () => {},
  onClearId: () => {},
});

export const SelectedIdProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return (
    <SelectedIdContext.Provider
      value={{
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
