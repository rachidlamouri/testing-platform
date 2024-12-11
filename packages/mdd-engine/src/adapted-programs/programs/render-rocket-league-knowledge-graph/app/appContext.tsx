import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

type AppCtx = {
  selectedSkill: {
    id: string | null;
    setOrToggle: (id: string | null) => void;
  };
};

const AppContext = createContext<AppCtx>({
  selectedSkill: {
    id: null,
    setOrToggle: () => {},
  },
});

export const AppContextProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [selectedSkillId, setOrToggleSelectedSkillId] = useState<
    string | null
  >();

  return (
    <AppContext.Provider
      value={{
        selectedSkill: {
          id: selectedSkillId,
          setOrToggle: (id: string): void => {
            if (id !== selectedSkillId) {
              setOrToggleSelectedSkillId(id);
            } else {
              setOrToggleSelectedSkillId(null);
            }
          },
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppCtx => {
  const state = useContext(AppContext);
  return state;
};
