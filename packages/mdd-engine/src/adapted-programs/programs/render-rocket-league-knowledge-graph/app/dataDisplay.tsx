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
  const { selectedSkill } = useAppContext();

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
      <h2>{selectedSkill.data.title}</h2>
      <ul>
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
