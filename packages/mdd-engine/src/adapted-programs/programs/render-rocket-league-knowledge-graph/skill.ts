import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

export type LinkConfig = {
  text: string;
  url: string;
};

export type Note = string | LinkConfig;

type SkillInput = {
  title: string;
  notes: Note[];
  rank: string;
  prerequisites: string[];
  isRecommended: boolean;
  isUnnecessary: boolean;
  isSilly: boolean;
  isDisabled?: boolean;
};

export class Skill implements SkillInput {
  id: string;

  title: string;

  description?: string;

  notes: Note[];

  rank: string;

  prerequisites: string[];

  isRecommended: boolean;

  isUnnecessary: boolean;

  isSilly: boolean;

  isDisabled?: boolean;

  constructor(input: SkillInput) {
    this.id = input.title;

    this.title = input.title;
    this.notes = input.notes;
    this.rank = input.rank;
    this.prerequisites = input.prerequisites;
    this.isRecommended = input.isRecommended;
    this.isUnnecessary = input.isUnnecessary;
    this.isSilly = input.isSilly;
    this.isDisabled = input.isDisabled;
  }

  setDescription(description: string): void {
    this.description = description;
  }
}

export const SKILL_COLLECTION_ID = 'skill';

type SkillCollectionId = typeof SKILL_COLLECTION_ID;

export type SkillStreamMetatype = InMemoryIdentifiableItem3StreamMetatype<
  SkillCollectionId,
  Skill
>;
