import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { Note, Skill } from './skill';

export type Section = {
  title: string;
  notes: Note[];
  skills: Skill[];
};

type ParsedInputInput = {
  sections: Section[];
};

/**
 * Original input is the html from: https://www.reddit.com/r/RocketLeague/comments/adiu96/all_rocket_league_moves_skills_with_descriptions/
 * This is a data structure for the information in the html
 */
export class ParsedInput implements ParsedInputInput {
  id = 'input';

  sections: Section[];

  constructor(input: ParsedInputInput) {
    this.sections = input.sections;
  }
}

export const PARSED_INPUT_COLLECTION_ID = 'parsed-input';

type ParsedInputCollectionId = typeof PARSED_INPUT_COLLECTION_ID;

export type ParsedInputStreamMetatype = InMemoryIdentifiableItem3StreamMetatype<
  ParsedInputCollectionId,
  ParsedInput
>;
