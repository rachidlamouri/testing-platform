import { PropsWithChildren } from 'react';
import { Note } from '../skill';

export type SkillProps = PropsWithChildren<{
  id: string;
  isRecommended: boolean;
  isUnnecessary: boolean;
  notes: Note[];
  title: string;
}>;

export type PrerequisiteProps = PropsWithChildren<{
  tailId: string;
  headId: string;
}>;
