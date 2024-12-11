import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { Note } from '../skill';

type SkillDisplay = {
  id: string;
  title: string;
  notes: Note[];
};

type AppCtx = {
  selectedSkill: {
    data: SkillDisplay | null;
    setOrToggle: (skill: SkillDisplay | null) => void;
  };
};

const AppContext = createContext<AppCtx>({
  selectedSkill: {
    data: null,
    setOrToggle: () => {},
  },
});

export const AppContextProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [selectedSkill, setOrToggleSelectedSkill] =
    useState<SkillDisplay | null>();

  return (
    <AppContext.Provider
      value={{
        selectedSkill: {
          data: selectedSkill,
          setOrToggle: (skill: SkillDisplay): void => {
            if (skill.id !== selectedSkill?.id) {
              setOrToggleSelectedSkill(skill);
            } else {
              setOrToggleSelectedSkill(null);
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
