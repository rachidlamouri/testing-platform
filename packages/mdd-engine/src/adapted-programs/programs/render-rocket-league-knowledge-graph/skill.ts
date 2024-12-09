import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';

const SKILL_ID_TEMPLATE = ['title'] as const satisfies GenericComplexIdTemplate;
type SkillIdTemplate = typeof SKILL_ID_TEMPLATE;
class SkillId extends ComplexId<SkillIdTemplate> {
  get rawTemplate(): SkillIdTemplate {
    return SKILL_ID_TEMPLATE;
  }
}

export type LinkConfig = {
  text: string;
  url: string;
};

export type Note = string | LinkConfig;

type SkillInput = {
  title: string;
  notes: Note[];
  prerequisites: string[];
  isRecommended: boolean;
  isUnnecessary: boolean;
  isDisabled?: boolean;
};

export class Skill implements SkillInput {
  id: SkillId;

  title: string;

  notes: Note[];

  prerequisites: string[];

  isRecommended: boolean;

  isUnnecessary: boolean;

  isDisabled?: boolean;

  constructor(input: SkillInput) {
    this.id = new SkillId({
      title: input.title,
    });

    this.title = input.title;
    this.notes = input.notes;
    this.prerequisites = input.prerequisites;
    this.isRecommended = input.isRecommended;
    this.isUnnecessary = input.isUnnecessary;
    this.isDisabled = input.isDisabled;
  }
}

export const SKILL_COLLECTION_ID = 'skill';

type SkillCollectionId = typeof SKILL_COLLECTION_ID;

export type SkillStreamMetatype = InMemoryIdentifiableItem3StreamMetatype<
  SkillCollectionId,
  Skill
>;
