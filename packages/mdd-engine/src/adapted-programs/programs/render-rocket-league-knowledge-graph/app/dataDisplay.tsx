import React, { FunctionComponent } from 'react';
import { useAppContext } from './appContext';
import { THEME } from './theme';
import { Note } from '../skill';

const NoteDisplay: FunctionComponent<{ note: Note }> = ({ note }) => {
  if (typeof note === 'string') {
    return note;
  }

  return (
    <a href={note.url} target="_blank">
      {note.text}
    </a>
  );
};

export const DataDisplay: FunctionComponent = () => {
  const { selectedSkill, skillState } = useAppContext();
  const isDone = skillState.byId[selectedSkill.data?.id] ?? false;

  if (!selectedSkill.data) {
    return null;
  }

  return (
    <div
      style={{
        padding: 8,
        color: THEME.metadata.text,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <input
          type="checkbox"
          style={{ width: 18, height: 18, marginRight: 10 }}
          checked={isDone}
          onChange={(event): void => {
            skillState.setIsChecked(
              selectedSkill.data.id,
              event.target.checked,
            );
          }}
        />
        <h2>{selectedSkill.data.title}</h2>
      </div>
      {selectedSkill.data.description !== undefined && (
        <p>{selectedSkill.data.description}</p>
      )}
      <ul
        style={{
          margin: 0,
        }}
      >
        {selectedSkill.data.notes.map((note, index) => {
          return (
            <li
              key={index}
              style={{
                marginBottom: 4,
              }}
            >
              <NoteDisplay note={note} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
