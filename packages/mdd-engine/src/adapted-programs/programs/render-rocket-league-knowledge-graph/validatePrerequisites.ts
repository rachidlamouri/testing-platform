import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { assertNotUndefined } from '../../../package-agnostic-utilities/nil/assertNotUndefined';
import {
  GenericProgramErrorStreamMetatype,
  PROGRAM_ERROR_COLLECTION_ID,
} from '../../programmable-units/error/programError';
import { SKILL_COLLECTION_ID, SkillStreamMetatype } from './skill';

const rankIds = ['B', 'S', 'G', 'P', 'D', 'C', 'GC', 'SSL'];

const rankConfigById = new Map(
  rankIds.map((id, index) => {
    const rankConfig = {
      id,
      validPrerequisites: rankIds.filter(
        (_, otherIndex) => otherIndex <= index,
      ),
    };
    return [id, rankConfig];
  }),
);

/**
 * Validates prerequisites
 */
export const validatePrerequisites = buildProgrammedTransform({
  name: 'validatePrerequisites',
})
  .fromItem2<SkillStreamMetatype>({
    collectionId: SKILL_COLLECTION_ID,
  })
  .andFromCollection2<SkillStreamMetatype>({
    collectionId: SKILL_COLLECTION_ID,
  })
  .toItemTuple2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
  })
  .onTransform((skill, skills) => {
    const rankConfig = rankConfigById.get(skill.rank);
    assertNotUndefined(rankConfig);

    const invalidPrerequisites = skill.prerequisites
      .map((prerequisite) => {
        const otherSkill = skills.byId.get(prerequisite);
        assertNotUndefined(
          otherSkill,
          `Invalid prerequisite "${prerequisite}"`,
        );

        return otherSkill;
      })
      .filter((otherSkill) => {
        const isValid = rankConfig.validPrerequisites.includes(otherSkill.rank);

        return !isValid;
      });

    return invalidPrerequisites.map((prerequisiteSkill) => {
      return new Error(
        `"${skill.id}" has invalid prerequisite "${prerequisiteSkill.id}"`,
      );
    });
  })
  .assemble();
