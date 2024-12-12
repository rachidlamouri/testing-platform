import fs from 'fs';
import * as cheerio from 'cheerio';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  HTML_FILE_COLLECTION_ID,
  HtmlFileStreamMetatype,
} from '../../programmable-units/html-file/htmlFile';
import {
  PARSED_INPUT_COLLECTION_ID,
  ParsedInput,
  ParsedInputStreamMetatype,
  Section,
} from './parsedInput';
import { assertNotUndefined } from '../../../package-agnostic-utilities/nil/assertNotUndefined';
import { assertNotNull } from '../../../package-agnostic-utilities/nil/assertNotNull';
import rawSkillMetadata from './skillMetadata.json';
import { Skill, LinkConfig } from './skill';

const skillMetadata = new Map(Object.entries(rawSkillMetadata));

/**
 * Converts the input HTML into a more manageable object
 */
export const parseInput = buildProgrammedTransform({
  name: 'parseInput',
})
  .fromItem2<HtmlFileStreamMetatype>({
    collectionId: HTML_FILE_COLLECTION_ID,
  })
  .toItemTuple2<ParsedInputStreamMetatype>({
    collectionId: PARSED_INPUT_COLLECTION_ID,
  })
  .onTransform((file) => {
    if (
      file.filePath.serialized !==
      'packages/mdd-engine/src/adapted-programs/programs/render-rocket-league-knowledge-graph/input.html'
    ) {
      return [];
    }

    const documentText = fs.readFileSync(file.filePath.serialized);

    const $ = cheerio.load(documentText);
    const root = $('div')[0];

    const sections: Section[] = [];

    let isParsing = false;

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

    const getSkill = (id: string, isRecommended: boolean): Skill => {
      const metadata = skillMetadata.get(id);

      if (!metadata) {
        throw new Error(`Missing metadata for "${id}"`);
      }

      return new Skill({
        title: id,
        notes: [],
        prerequisites: metadata.prerequisites,
        isRecommended,
        isUnnecessary:
          'isUnnecessary' in metadata ? metadata.isUnnecessary : false,
        isDisabled: 'isDisabled' in metadata && metadata.isDisabled,
      });
    };

    flattenedNodes.forEach(({ node }) => {
      const text = $(node).text().trim();

      switch (node.tagName) {
        case 'h1':
          sections.push({
            title: text,
            notes: [],
            skills: [],
          });
          break;
        case 'strong': {
          const match = text.match(/(?<title>[^#]+)(?<recommended>#)?/i);
          assertNotNull(match);

          const { title = 'MISSING_TITLE', recommended = '' } =
            match.groups ?? {};

          const section = sections.at(-1);
          assertNotUndefined(section);

          const id = title.trim();
          const skill = getSkill(id, recommended === '#');
          if (!skill.isDisabled) {
            section.skills.push(skill);
          }

          break;
        }
        case 'p': {
          const section = sections.at(-1);
          assertNotUndefined(section);
          const skill = section.skills.at(-1);

          if (skill === undefined) {
            section.notes.push(text);
          } else if (skill.description) {
            skill.notes.push(text);
          } else {
            skill.setDescription(text);
          }

          break;
        }
        case 'a': {
          const section = sections.at(-1);
          assertNotUndefined(section);
          const skill = section.skills.at(-1);

          const url = node.attribs.href;
          assertNotUndefined(url);
          const link: LinkConfig = {
            text,
            url,
          };

          if (skill === undefined) {
            section.notes.push(link);
          } else {
            skill.notes.push(link);
          }

          break;
        }
        default:
          throw new Error(`Unknown tagName: ${node.tagName}`);
      }
    });

    const sectionByTitle = new Map(
      sections.map((section) => {
        return [section.title, section];
      }),
    );

    [...skillMetadata.values()].forEach((skillMetadatum) => {
      const section = sectionByTitle.get(skillMetadatum.section);
      assertNotUndefined(section);
      if (
        section.skills.some((value) => {
          return value.id === skillMetadatum.id;
        })
      ) {
        return;
      }

      const skill = getSkill(
        skillMetadatum.id,
        'isRecommended' in skillMetadatum && skillMetadatum.isRecommended,
      );

      if (!skill.isDisabled) {
        section.skills.push(skill);
      }
    });

    return [new ParsedInput({ sections })];
  })
  .assemble();
