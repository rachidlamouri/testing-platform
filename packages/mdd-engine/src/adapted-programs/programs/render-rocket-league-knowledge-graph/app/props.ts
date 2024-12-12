import { PropsWithChildren } from 'react';
import { Note, Skill } from '../skill';

export type Metadata = {
  skillById: Record<string, Skill>;
};

export type SkillProps = PropsWithChildren<{
  id: string;
  isRecommended: boolean;
  isUnnecessary: boolean;
  notes: Note[];
  title: string;
  description?: string;
  upstreamSkills: string[];
  downstreamSkills: string[];
}>;

export type PrerequisiteProps = PropsWithChildren<{
  tailId: string;
  headId: string;
}>;
