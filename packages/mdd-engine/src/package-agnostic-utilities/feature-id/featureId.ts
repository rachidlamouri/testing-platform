import * as uuidUtils from 'uuid';
import { localIdCharacterEncodingList } from './localIdCharacterEncodingList';
import { GenericComplexIdTemplate, ComplexId } from '../data-structure/id';

const FEATURE_ID_TEMPLATE = [
  'localId',
] as const satisfies GenericComplexIdTemplate;
type FeatureIdTemplate = typeof FEATURE_ID_TEMPLATE;

type FeatureIdInput = {
  localId: string;
  globalId: string;
};

const UUID_HEX_LENGTH = 32;

const LOCAL_ID_LENGTH = 4;

const uuidChunkSize = Math.ceil(UUID_HEX_LENGTH / LOCAL_ID_LENGTH);

export const uuidToLocalId = (uuid: string): string => {
  if (!uuidUtils.validate(uuid)) {
    throw Error(`Value is not a uuid: ${uuid}`);
  }

  const uuidWithoutHyphens = uuid.replaceAll('-', '');
  const uuidCharacterList = uuidWithoutHyphens.split('');

  const chunkCount = Math.ceil(UUID_HEX_LENGTH / uuidChunkSize);
  const chunkList: string[] = Array.from({ length: chunkCount }).map(
    (unused, chunkIndex) => {
      const startIndex = chunkIndex * uuidChunkSize;
      const endIndex = startIndex + uuidChunkSize;

      const characterList = uuidCharacterList.slice(startIndex, endIndex);
      const chunk = characterList.join('');

      return chunk;
    },
  );

  const numericalValueList = chunkList.map((hexadecimalText) => {
    return parseInt(hexadecimalText, 16);
  });

  const codePointIndexList = numericalValueList.map(
    (numericalValue) => numericalValue % localIdCharacterEncodingList.length,
  );
  const characterList = codePointIndexList.map(
    (codePointIndex) => localIdCharacterEncodingList[codePointIndex],
  );

  const localId = characterList.join('');

  return localId;
};

export class LocalFeatureId extends ComplexId<FeatureIdTemplate> {
  get rawTemplate(): FeatureIdTemplate {
    return FEATURE_ID_TEMPLATE;
  }
}

/**
 * A uuid enumerating a feature along with a shorter readable hash that can be
 * used locally
 *
 * @example
 * { globalId: 'fea3f4c4-7d1e-41f4-bfac-bb9d7d719107', localId: 'KK5R' }
 *
 * @implements EGTE
 */
export class FeatureId extends LocalFeatureId {
  static create(): FeatureId {
    const globalId = uuidUtils.v4();
    const localId = uuidToLocalId(globalId);

    const featureId = new FeatureId({
      globalId,
      localId,
    });

    return featureId;
  }

  local: string;

  global: string;

  constructor({ localId, globalId }: FeatureIdInput) {
    const computedLocalId = uuidToLocalId(globalId);
    if (localId !== computedLocalId) {
      throw new Error(
        `Invalid local id "${localId}" for global id "${globalId}". Expected "${computedLocalId}"`,
      );
    }

    super({ localId });

    this.local = localId;
    this.global = globalId;
  }
}
