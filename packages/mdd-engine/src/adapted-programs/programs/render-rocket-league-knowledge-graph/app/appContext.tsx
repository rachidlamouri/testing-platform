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
  description: string;
  notes: Note[];
};

type SkillStateById = Record<string, boolean>;

type AppCtx = {
  selectedSkill: {
    data: SkillDisplay | null;
    setOrToggle: (skill: SkillDisplay | null) => void;
  };
  skillState: {
    byId: SkillStateById;
    setIsChecked: (id: string, isChecked: boolean) => void;
  };
};

const AppContext = createContext<AppCtx>({
  selectedSkill: {
    data: null,
    setOrToggle: () => {},
  },
  skillState: {
    byId: {},
    setIsChecked: () => {},
  },
});

const isSkillState = (data: object): data is SkillStateById =>
  Object.entries(data).every(
    ([key, value]: [string, unknown]) =>
      typeof key === 'string' && typeof value === 'boolean',
  );

const storageKey = 'rocket-league-knowledge-graph';
const serializedInitialState = localStorage.getItem(storageKey);
let initialState: Record<string, boolean>;
try {
  const savedState: unknown = JSON.parse(serializedInitialState);
  if (
    typeof savedState === 'object' &&
    savedState !== null &&
    isSkillState(savedState)
  ) {
    initialState = savedState;
  } else {
    throw new Error(`Invalid persisted state: ${serializedInitialState}`);
  }
} catch {
  initialState = {};
}

export const AppContextProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [selectedSkill, setOrToggleSelectedSkill] =
    useState<SkillDisplay | null>();
  const [skillStateById, setSkillStateById] =
    useState<Record<string, boolean>>(initialState);

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
        skillState: {
          byId: skillStateById,
          setIsChecked: (id: string, isChecked: boolean): void => {
            setSkillStateById((previousState) => {
              const nextState: SkillStateById = {
                ...previousState,
                [id]: isChecked,
              };

              localStorage.setItem(
                storageKey,
                JSON.stringify(nextState, null, 2),
              );

              return nextState;
            });
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
