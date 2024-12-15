import fs from 'fs';
import * as cheerio from 'cheerio';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  HTML_FILE_COLLECTION_ID,
  HtmlFileStreamMetatype,
} from '../../programmable-units/html-file/htmlFile';
import { assertNotUndefined } from '../../../package-agnostic-utilities/nil/assertNotUndefined';
import { assertNotNull } from '../../../package-agnostic-utilities/nil/assertNotNull';
import rawOldMetadata from './oldmeta.json';
import {
  Skill,
  LinkConfig,
  Note,
} from '../render-rocket-league-knowledge-graph/skill';

const oldMetadata = Object.values(rawOldMetadata);

const toSentenceCase = (text: string): string => {
  return text
    .trim()
    .split(' ')
    .map((word) => {
      const firstLetter = word.at(0);
      assertNotUndefined(firstLetter);
      return firstLetter.toUpperCase() + word.substring(1);
    })
    .join(' ');
};

/**
 * Converts the input HTML into a more manageable object
 */
export const parseInput = buildProgrammedTransform({
  name: 'parseInput',
})
  .fromItem2<HtmlFileStreamMetatype>({
    collectionId: HTML_FILE_COLLECTION_ID,
  })
  .onTransform((file) => {
    if (
      file.filePath.serialized !==
      'packages/mdd-engine/src/adapted-programs/programs/parse-reddit/input.html'
    ) {
      return [];
    }

    const documentText = fs.readFileSync(file.filePath.serialized);

    const $ = cheerio.load(documentText);
    const root = $('div')[0];

    const flattenedNodes: { path: string; node: cheerio.Element }[] = [];
    const parseChildNodes = (path: string, node: cheerio.Element): void => {
      let count = 0;
      node.childNodes.forEach((subnode, index) => {
        if (!('tagName' in subnode)) {
          return;
        }

        count += 1;

        const newPath = `${path}/${index.toString().padStart(2, '0')}/${
          subnode.tagName
        }`;

        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        parseNode(newPath, subnode);
      });

      if (count === 0) {
        flattenedNodes.push({ path, node });
      }
    };

    let isParsing = false;
    const parseNode = (path: string, node: cheerio.Element): void => {
      if (!('tagName' in node)) {
        return;
      }

      const text = $(node).text().trim();

      if (text === '') {
        return;
      }

      if (node.tagName === 'h1' && $(node).text() === 'Core Skills') {
        isParsing = true;
      }

      if (!isParsing) {
        return;
      }

      parseChildNodes(path, node);
    };

    parseChildNodes('', root);

    type InputSkill = {
      id: string;
      title: string;
      isRecommended: boolean;
      description?: string;
      notes: Note[];
    };

    const inputSkills: InputSkill[] = [];

    flattenedNodes.forEach(({ node }) => {
      const text = $(node).text().trim();

      switch (node.tagName) {
        case 'h1':
          // section titles
          break;
        case 'strong': {
          const match = text.match(/(?<title>[^#]+)(?<recommended>#)?/i);
          assertNotNull(match);

          const { title = 'MISSING_TITLE', recommended = '' } =
            match.groups ?? {};

          const id = title;

          inputSkills.push({
            id,
            title,
            isRecommended: recommended === '#',
            notes: [],
          });
          break;
        }
        case 'p': {
          const skill = inputSkills.at(-1);
          assertNotUndefined(skill);

          if (skill.description) {
            skill.notes.push(text);
          } else {
            skill.description = text;
          }
          break;
        }
        case 'a': {
          const skill = inputSkills.at(-1);
          assertNotUndefined(skill);

          const url = node.attribs.href;
          assertNotUndefined(url);
          const link: LinkConfig = {
            text,
            url,
          };

          skill.notes.push(link);
          break;
        }
        default:
          throw new Error(`Unknown tagName: ${node.tagName}`);
      }
    });

    type ParameterizedSkillMeta<T = typeof oldMetadata[number]> = Partial<{
      [TKey in T extends infer TPropertyKey
        ? keyof TPropertyKey
        : never]: T extends infer TProperty
        ? TKey extends keyof TProperty
          ? TProperty[TKey]
          : never
        : never;
    }>;

    type SkillMeta = ParameterizedSkillMeta;

    type SkillData = {
      input?: InputSkill;
      meta?: SkillMeta;
    };

    const inputSKillById = new Map<string, SkillData>(
      inputSkills.map((skill: InputSkill) => {
        return [skill.id, { input: skill }];
      }),
    );

    [...oldMetadata.values()].forEach((skill) => {
      const skillData: SkillData = inputSKillById.get(skill.id) ?? {};
      skillData.meta = skill;
      inputSKillById.set(skill.id, skillData);
    });

    const skills = [...inputSKillById.values()]
      .map(({ input, meta }) => {
        const id = input?.id ?? meta?.id;
        const title = input?.title ?? meta?.id;

        assertNotUndefined(id);
        assertNotUndefined(title);

        return new Skill({
          id: toSentenceCase(id),
          rank: meta?.rank ?? '',
          title: toSentenceCase(title),
          description: input?.description ?? meta?.description ?? '',
          notes: input?.notes ?? [],
          prerequisites:
            meta?.prerequisites?.map((prerequisite) =>
              toSentenceCase(prerequisite),
            ) ?? [],
          isRecommended: input?.isRecommended ?? meta?.isRecommended ?? false,
          isSilly: meta?.isSilly ?? false,
          isUnnecessary: meta?.isUnnecessary ?? false,
        });
      })
      .sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }

        if (a.id === b.id) {
          return 0;
        }

        return 1;
      });

    const output: Record<string, unknown> = {};
    skills.forEach((skill) => {
      output[skill.id] = skill;
    });

    fs.writeFileSync(
      'packages/mdd-engine/src/adapted-programs/programs/render-rocket-league-knowledge-graph/skillMetadata.json',
      JSON.stringify(output, null, 2),
    );
  })
  .assemble();
